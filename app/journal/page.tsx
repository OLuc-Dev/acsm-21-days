"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCheckIns, getJourney } from "@/lib/storage";
import type { DailyCheckIn, UserJourney } from "@/lib/types";

export default function JournalPage() {
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

  if (isLoading || !journey) {
    return (
      <AppShell>
        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="text-sm uppercase tracking-[0.32em] text-[#a7a29a]">
            Carregando seu diário...
          </p>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Diário emocional</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
          O diário não é para se explicar. É para perceber a negociação da fuga.
        </h1>

        {checkIns.length === 0 ? (
          <Card className="mt-10">
            <CardHeader>
              <p className="text-sm font-semibold text-[#f5f2ea]">Ainda sem registros</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-[#a7a29a]">
                Conclua um check-in no dashboard para registrar a primeira reflexão da sua jornada.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 space-y-4">
            {checkIns.map((checkIn) => (
              <Card key={checkIn.id}>
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">
                    Dia {checkIn.day} · medo {checkIn.emotionalScore}/5
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-[#c7c0b6]">
                    {checkIn.reflection
                      ? checkIn.reflection
                      : "Você concluiu este dia sem escrever uma reflexão."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
