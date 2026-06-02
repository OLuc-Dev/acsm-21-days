"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const emotionalEvolution =
    progress.averageEmotionalScore === null
      ? "Sem registro emocional"
      : `${progress.averageEmotionalScore}/5 de intensidade média do medo`;

  const handleRestart = () => {
    clearJourney();
    router.push("/onboarding");
  };

  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Resultado final</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          Você não eliminou o medo. Você provou que ele não precisa decidir sozinho.
        </h1>
        <Card className="mx-auto mt-10 max-w-2xl border-[#d6a15d]/25 bg-[#0c0b09] text-left">
          <CardHeader>
            <CardTitle>
              {journey.userName ? `${journey.userName}, sua reconstrução` : "Sua reconstrução"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[#c7c0b6]">
            <p>Objetivo inicial: {journey.goal}</p>
            <p>Medo dominante: {fearTitle}.</p>
            <p>
              Dias concluídos: {progress.completedDays} de {journey.length}.
            </p>
            <p>Evolução emocional: {emotionalEvolution}.</p>
            <p className="text-xl font-semibold tracking-[-0.03em] text-[#f5f2ea]">
              O primeiro passo não mudou sua vida inteira. Mas quebrou a autoridade do medo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" variant="secondary">
                Compartilhar em breve
              </Button>
              <Button type="button" variant="ghost" onClick={handleRestart}>
                Iniciar nova jornada
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
