"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShareCard } from "@/components/acsm/share-card";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { fearProfiles } from "@/lib/acsm-method";
import { calculateProgress } from "@/lib/progress";
import { clearJourney, getCheckIns, getJourney } from "@/lib/storage";
import type { DailyCheckIn, UserJourney } from "@/lib/types";

export default function ResultPage() {
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
        <section className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a7a29a]">
            Carregando seu resultado...
          </p>
        </section>
      </AppShell>
    );
  }

  const fearTitle = fearProfiles.find((fear) => fear.id === journey.fearType)?.title ?? "—";
  const emotional =
    progress.averageEmotionalScore === null ? "—" : `${progress.averageEmotionalScore}/5`;

  const handleRestart = () => {
    clearJourney();
    router.push("/onboarding");
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Resultado final</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Você não eliminou o medo. Você provou que ele não precisa decidir sozinho.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#a7a29a]">
          Este card é seu. Baixe e compartilhe a prova de que você agiu contra a fuga.
        </p>

        <div className="mt-10">
          <FadeIn>
            <ShareCard
              userName={journey.userName}
              goal={journey.goal}
              fearTitle={fearTitle}
              completedDays={progress.completedDays}
              totalDays={journey.length}
              emotional={emotional}
            />
          </FadeIn>
        </div>

        <div className="mt-8 flex justify-center">
          <Button type="button" variant="ghost" onClick={handleRestart}>
            Iniciar nova jornada
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
