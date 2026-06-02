"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DailyChallengeCard } from "@/components/acsm/daily-challenge-card";
import { EmotionalCheckIn } from "@/components/acsm/emotional-check-in";
import { JourneyProgress } from "@/components/acsm/journey-progress";
import { AppShell } from "@/components/layout/app-shell";
import { fearProfiles } from "@/lib/acsm-method";
import { sevenDayChallenges } from "@/lib/challenges";
import { calculateProgress } from "@/lib/progress";
import { getCheckIns, getJourney } from "@/lib/storage";
import type { DailyChallenge, DailyCheckIn, UserJourney } from "@/lib/types";

const getFearTitle = (fearType: UserJourney["fearType"]) =>
  fearProfiles.find((fear) => fear.id === fearType)?.title ?? "Medo nomeado";

const getJourneyCheckIns = (checkIns: DailyCheckIn[], journeyId: string) =>
  checkIns.filter((checkIn) => checkIn.journeyId === journeyId);

const getChallengeForDay = (currentDay: number): DailyChallenge => {
  const safeDay = Math.max(currentDay, 1);
  const challengeIndex = (safeDay - 1) % sevenDayChallenges.length;

  return {
    ...sevenDayChallenges[challengeIndex],
    day: safeDay,
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardState = useCallback(() => {
    const storedJourney = getJourney();

    if (!storedJourney) {
      router.replace("/onboarding");
      return;
    }

    const journeyCheckIns = getJourneyCheckIns(getCheckIns(), storedJourney.id);
    const progress = calculateProgress(journeyCheckIns, storedJourney.length);

    setJourney(storedJourney);
    setCheckIns(journeyCheckIns);
    setIsLoading(false);

    if (progress.isCompleted) {
      router.replace("/result");
    }
  }, [router]);

  useEffect(() => {
    loadDashboardState();
  }, [loadDashboardState]);

  const progress = useMemo(
    () => (journey ? calculateProgress(checkIns, journey.length) : null),
    [checkIns, journey],
  );

  const currentChallenge = useMemo(
    () => (progress ? getChallengeForDay(progress.currentDay) : null),
    [progress],
  );

  const existingCheckIn = useMemo(
    () =>
      progress
        ? checkIns.find((checkIn) => checkIn.day === progress.currentDay)
        : undefined,
    [checkIns, progress],
  );

  if (isLoading || !journey || !progress || !currentChallenge) {
    return (
      <AppShell>
        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Dashboard diário</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            Recuperando sua jornada local.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#a7a29a]">
            Se nenhuma jornada existir neste navegador, você será levado de volta para o onboarding.
          </p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 lg:grid-cols-[1fr_0.42fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Dashboard diário</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            Hoje você pratica uma desobediência pequena.
          </h1>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Objetivo</p>
              <p className="mt-3 text-sm leading-7 text-[#f5f2ea]">{journey.goal}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Medo dominante</p>
              <p className="mt-3 text-sm leading-7 text-[#f5f2ea]">{getFearTitle(journey.fearType)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Dia atual</p>
              <p className="mt-3 text-sm leading-7 text-[#f5f2ea]">
                Dia {progress.currentDay} de {journey.length}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <DailyChallengeCard challenge={currentChallenge} />
          </div>
        </div>
        <aside className="space-y-5 lg:pt-28">
          <JourneyProgress progress={progress} />
          <EmotionalCheckIn
            day={progress.currentDay}
            existingCheckIn={existingCheckIn}
            journeyId={journey.id}
            onSaved={loadDashboardState}
          />
        </aside>
      </section>
    </AppShell>
  );
}
