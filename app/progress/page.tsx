"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { JourneyProgress } from "@/components/acsm/journey-progress";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { fearProfiles } from "@/lib/acsm-method";
import { calculateProgress } from "@/lib/progress";
import { getCheckIns, getJourney } from "@/lib/storage";
import type { DailyCheckIn, UserJourney } from "@/lib/types";

export default function ProgressPage() {
  const router = useRouter();
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedJourney = getJourney();

    if (!storedJourney) {
      router.replace("/onboarding");
      return;
    }

    setJourney(storedJourney);
    setCheckIns(getCheckIns());
    setIsLoading(false);
  }, [router]);

  const progress = useMemo(
    () => (journey ? calculateProgress(checkIns, journey.length) : null),
    [journey, checkIns],
  );

  if (isLoading || !journey || !progress) {
    return (
      <AppShell>
        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a7a29a]">
            Carregando seu progresso...
          </p>
        </section>
      </AppShell>
    );
  }

  const fearTitle = fearProfiles.find((fear) => fear.id === journey.fearType)?.title ?? "—";

  const stats: [string, string][] = [
    [
      "Streak atual",
      `${progress.currentStreak} ${progress.currentStreak === 1 ? "dia" : "dias"}`,
    ],
    [
      "Média emocional",
      progress.averageEmotionalScore === null
        ? "Sem registro"
        : `${progress.averageEmotionalScore}/5`,
    ],
    ["Medo trabalhado", fearTitle],
  ];

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Progresso</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Progresso é ver onde você parou de obedecer automaticamente.
        </h1>
        <div className="mt-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <JourneyProgress completedDays={progress.completedDays} totalDays={journey.length} />
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(([label, value]) => (
              <Card key={label}>
                <CardHeader>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#d6a15d]">{label}</p>
                  <CardTitle>{value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
