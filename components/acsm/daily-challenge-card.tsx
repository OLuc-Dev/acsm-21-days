import type { DailyChallenge } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DailyChallengeCard({ challenge }: { challenge: DailyChallenge }) {
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d6a15d]">Ação</p>
          <p>{challenge.action}</p>
        </div>
        <p className="text-[#f5f2ea]">{challenge.reflectionPrompt}</p>
        <p className="text-[#a7a29a]">{challenge.closingPhrase}</p>
      </CardContent>
    </Card>
  );
}
