import type { DailyChallenge } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DailyChallengeCardProps = {
  challenge: DailyChallenge;
  personalizedAction?: string;
  insight?: string;
  isPersonalizing?: boolean;
};

export function DailyChallengeCard({
  challenge,
  personalizedAction,
  insight,
  isPersonalizing = false,
}: DailyChallengeCardProps) {
  const action = personalizedAction || challenge.action;

  return (
    <Card className="border-[#d6a15d]/20 bg-[#d6a15d]/[0.045]">
      <CardHeader>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d6a15d]">
          Dia {challenge.day}
        </p>
        <CardTitle className="text-2xl">{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm leading-7 text-[#c7c0b6]">
        <p>{challenge.diagnosis}</p>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6a15d]">Ação</p>
            {personalizedAction ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f0b76a]/80">
                Personalizado
              </span>
            ) : isPersonalizing ? (
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#77716a]">
                Personalizando…
              </span>
            ) : null}
          </div>
          <p className={isPersonalizing && !personalizedAction ? "text-[#8a847b]" : undefined}>
            {action}
          </p>
        </div>
        {insight ? (
          <div className="rounded-2xl border border-[#d6a15d]/20 bg-[#d6a15d]/[0.04] p-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d6a15d]">
              Padrão observado
            </p>
            <p className="text-[#c7c0b6]">{insight}</p>
          </div>
        ) : null}
        <p className="text-[#f5f2ea]">{challenge.reflectionPrompt}</p>
        <p className="text-[#a7a29a]">{challenge.closingPhrase}</p>
      </CardContent>
    </Card>
  );
}
