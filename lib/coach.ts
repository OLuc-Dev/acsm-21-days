import type { DailyChallenge, DailyCheckIn, UserJourney } from "./types";

export type CoachResult = {
  action: string;
  insight: string;
};

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const cacheKey = (journeyId: string, day: number) => `acsm:ai:${journeyId}:${day}`;

const readCache = (journeyId: string, day: number): CoachResult | null => {
  if (!canUseLocalStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(cacheKey(journeyId, day));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.action === "string" &&
      typeof parsed.insight === "string"
    ) {
      return parsed as CoachResult;
    }
  } catch {
    return null;
  }

  return null;
};

const writeCache = (journeyId: string, day: number, result: CoachResult) => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(cacheKey(journeyId, day), JSON.stringify(result));
};

// Busca a personalização do dia. Retorna null em qualquer falha (sem chave de
// API, erro de rede, resposta inválida), permitindo o fallback para o desafio
// fixo. O resultado é cacheado por dia no localStorage para não repetir chamadas.
export async function getPersonalizedCoaching(
  journey: UserJourney,
  fearTitle: string,
  challenge: DailyChallenge,
  recentCheckIns: DailyCheckIn[],
): Promise<CoachResult | null> {
  const cached = readCache(journey.id, challenge.day);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        goal: journey.goal,
        fearTitle,
        day: challenge.day,
        journeyLength: journey.length,
        dayTheme: {
          title: challenge.title,
          diagnosis: challenge.diagnosis,
          action: challenge.action,
          reflectionPrompt: challenge.reflectionPrompt,
        },
        recentCheckIns: recentCheckIns.slice(-5).map((checkIn) => ({
          day: checkIn.day,
          emotionalScore: checkIn.emotionalScore,
          reflection: checkIn.reflection,
        })),
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data && typeof data.action === "string" && data.action.trim()) {
      const result: CoachResult = {
        action: data.action.trim(),
        insight: typeof data.insight === "string" ? data.insight.trim() : "",
      };
      writeCache(journey.id, challenge.day, result);
      return result;
    }

    return null;
  } catch {
    return null;
  }
}
