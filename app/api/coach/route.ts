import { NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Modelo gratuito padrão no OpenRouter. Troque via OPENROUTER_MODEL se quiser
// outro modelo sem custo (a disponibilidade dos modelos free muda com o tempo).
const MODEL = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";

const SYSTEM_PROMPT = `Você é o motor de linguagem do método ACSM (Acabe Com Seus Medos). Sua função NÃO é motivar. É diagnosticar um padrão de fuga e propor UMA ação pequena, concreta e desconfortável que contradiga esse medo, conectada ao objetivo real da pessoa.

Tom obrigatório: escuro, psicológico, direto, minimalista, emocionalmente inteligente. Português do Brasil. Sem coaching raso, sem promessa mágica, sem clichê de autoajuda, sem emoji, sem exclamação fácil.

NUNCA use frases como "você consegue", "acredite em si", "seja sua melhor versão", "pense positivo", "basta querer".

Você recebe: o objetivo da pessoa, o medo dominante, o dia atual da jornada, o tema do dia e os check-ins recentes (nota de medo de 1 a 5 e reflexões).

Gere dois campos:
- action: uma única ação para HOJE, específica ao objetivo da pessoa, executável em minutos, que contraria a fuga. Concreta e no imperativo. Nada genérico como "faça uma microação". No máximo 240 caracteres.
- insight: UMA observação curta e afiada sobre o padrão emocional da pessoa, baseada SOMENTE nos check-ins fornecidos. Se não houver check-ins suficientes para um insight honesto, retorne string vazia "". Nunca invente dados. No máximo 200 caracteres.

Responda APENAS com um objeto JSON válido, sem nenhum texto antes ou depois, exatamente neste formato:
{"action": "...", "insight": "..."}`;

type CoachRequestBody = {
  goal?: string;
  fearTitle?: string;
  day?: number;
  journeyLength?: number;
  dayTheme?: {
    title?: string;
    diagnosis?: string;
    action?: string;
    reflectionPrompt?: string;
  };
  recentCheckIns?: { day: number; emotionalScore: number; reflection: string }[];
};

function extractJson(raw: string): { action?: unknown; insight?: unknown } | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: CoachRequestBody;

  try {
    body = (await request.json()) as CoachRequestBody;
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (!body.goal || !body.fearTitle || typeof body.day !== "number") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const checkInsText =
    body.recentCheckIns && body.recentCheckIns.length > 0
      ? body.recentCheckIns
          .map(
            (checkIn) =>
              `Dia ${checkIn.day}: medo ${checkIn.emotionalScore}/5. Reflexão: ${
                checkIn.reflection || "(sem reflexão escrita)"
              }`,
          )
          .join("\n")
      : "Nenhum check-in registrado ainda.";

  const userContent = `Objetivo da pessoa: ${body.goal}
Medo dominante: ${body.fearTitle}
Dia ${body.day} de ${body.journeyLength ?? "?"}
Tema do dia: ${body.dayTheme?.title ?? "-"} — ${body.dayTheme?.diagnosis ?? ""}
Check-ins recentes:
${checkInsText}`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "ACSM 21 Days",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 600,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "api_error", status: response.status },
        { status: 502 },
      );
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;

    if (typeof raw !== "string") {
      return NextResponse.json({ error: "parse_error" }, { status: 502 });
    }

    const parsed = extractJson(raw);

    if (!parsed || typeof parsed.action !== "string") {
      return NextResponse.json({ error: "parse_error" }, { status: 502 });
    }

    return NextResponse.json({
      action: parsed.action.trim(),
      insight: typeof parsed.insight === "string" ? parsed.insight.trim() : "",
    });
  } catch {
    return NextResponse.json({ error: "unknown" }, { status: 500 });
  }
}
