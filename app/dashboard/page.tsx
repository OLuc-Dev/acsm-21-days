"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DailyChallengeCard } from "@/components/acsm/daily-challenge-card";
import { EmotionalCheckIn } from "@/components/acsm/emotional-check-in";
import { JourneyProgressCard } from "@/components/acsm/journey-progress";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { fearProfiles } from "@/lib/acsm-method";
import { getChallengeForDay } from "@/lib/challenges";
import { getPersonalizedCoaching, type CoachResult } from "@/lib/coach";
import { calculateProgress } from "@/lib/progress";
import { getCheckIns, getJourney } from "@/lib/storage";
import type { DailyCheckIn, UserJourney } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coaching, setCoaching] = useState<CoachResult | null>(null);
  const [isPersonalizing, setIsPersonalizing] = useState(false);

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

  const challenge = useMemo(
    () => (journey && progress ? getChallengeForDay(journey.length, progress.currentDay) : null),
    [journey, progress],
  );

  const fearTitle = useMemo(
    () => (journey ? fearProfiles.find((fear) => fear.id === journey.fearType)?.title ?? "" : ""),
    [journey],
  );

  useEffect(() => {
    if (progress?.isCompleted) {
      router.replace("/result");
    }
  }, [progress, router]);

  useEffect(() => {
    if (!journey || !challenge || progress?.isCompleted) {
      return;
    }

    let cancelled = false;
    setCoaching(null);
    setIsPersonalizing(true);

    getPersonalizedCoaching(journey, fearTitle, challenge, checkIns).then((result) => {
      if (!cancelled) {
        setCoaching(result);
        setIsPersonalizing(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [journey, challenge, fearTitle, checkIns, progress?.isCompleted]);

  if (isLoading || !journey || !progress) {
    return (
      <AppShell>
        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a7a29a]">
            Carregando sua jornada...
          </p>
        </section>
      </AppShell>
    );
  }

  if (progress.isCompleted) {
    return (
      <AppShell>
        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">
            Jornada concluída
          </p>
          <h1 className="mt-5 text-3xl font-semibold tracking-[-0.05em] md:text-5xl">
            Você chegou ao fim da jornada. Veja o que mudou.
          </h1>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/result">Ver resultado</Link>
            </Button>
          </div>
        </section>
      </AppShell>
    );
  }

  const currentCheckIn =
    checkIns.find((checkIn) => checkIn.day === progress.currentDay) ?? null;

  const handleCheckInSaved = () => {
    setCheckIns(getCheckIns());
  };

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 lg:grid-cols-[1fr_0.42fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">
            Dia {progress.currentDay} de {journey.length}
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
            Hoje você pratica uma desobediência pequena.
          </h1>
          <div className="mt-10">
            {challenge ? (
              <DailyChallengeCard
                challenge={challenge}
                personalizedAction={coaching?.action}
                insight={coaching?.insight}
                isPersonalizing={isPersonalizing}
              />
            ) : (
              <p className="text-sm leading-7 text-[#a7a29a]">
                O conteúdo deste dia ainda não está disponível.
              </p>
            )}
          </div>
        </div>
        <aside className="space-y-5 lg:pt-28">
          <JourneyProgressCard completedDays={progress.completedDays} totalDays={journey.length} />
          <EmotionalCheckIn
            key={progress.currentDay}
            journeyId={journey.id}
            day={progress.currentDay}
            existingCheckIn={currentCheckIn}
            onSave={handleCheckInSaved}
          />
        </aside>
      </section>
    </AppShell>
  );
}
