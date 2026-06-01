"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fearProfiles, journeyOptions } from "@/lib/acsm-method";
import { saveJourney } from "@/lib/storage";
import type { FearType, JourneyLength, UserJourney } from "@/lib/types";

const defaultFearType: FearType = "starting";
const defaultJourneyLength: JourneyLength = 7;

function createJourneyId() {
  return `journey-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [fearType, setFearType] = useState<FearType>(defaultFearType);
  const [journeyLength, setJourneyLength] = useState<JourneyLength>(defaultJourneyLength);
  const [formError, setFormError] = useState("");

  const selectedFear = useMemo(
    () => fearProfiles.find((fear) => fear.id === fearType) ?? fearProfiles[0],
    [fearType],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedGoal = goal.trim();
    const trimmedName = name.trim();

    if (!trimmedGoal) {
      setFormError("Escreva um objetivo real antes de começar. Sem fantasia perfeita. Só direção.");
      return;
    }

    const journey: UserJourney = {
      id: createJourneyId(),
      ...(trimmedName ? { name: trimmedName } : {}),
      goal: trimmedGoal,
      fearType,
      length: journeyLength,
      currentDay: 1,
      startedAt: new Date().toISOString(),
    };

    saveJourney(journey);
    router.push("/dashboard");
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6a15d]">Onboarding</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] md:text-6xl">
              Antes de montar a jornada, nomeie o que vem decidindo por você.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#a7a29a]">
              Crie uma jornada local, sem login e sem banco de dados. O primeiro passo não é provar força.
              É escolher uma ação pequena contra uma fuga específica.
            </p>

            <Card className="mt-8 border-[#d6a15d]/20 bg-[#d6a15d]/[0.045]">
              <CardHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6a15d]">Medo selecionado</p>
                <CardTitle>{selectedFear.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-[#c7c0b6]">{selectedFear.diagnostic}</p>
              </CardContent>
            </Card>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>1. Identificação mínima</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-[#f5f2ea]">Nome opcional</span>
                  <input
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-[#f5f2ea] outline-none transition placeholder:text-[#77716a] focus:border-[#d6a15d]/60 focus:ring-2 focus:ring-[#d6a15d]/20"
                    maxLength={80}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Como você quer ser chamado?"
                    type="text"
                    value={name}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#f5f2ea]">Objetivo principal</span>
                  <textarea
                    className="mt-3 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-[#f5f2ea] outline-none transition placeholder:text-[#77716a] focus:border-[#d6a15d]/60 focus:ring-2 focus:ring-[#d6a15d]/20"
                    maxLength={220}
                    onChange={(event) => {
                      setGoal(event.target.value);
                      setFormError("");
                    }}
                    placeholder="Exemplo: voltar a estudar, publicar conteúdo, cuidar do corpo ou iniciar um projeto."
                    required
                    value={goal}
                  />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Medo dominante</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {fearProfiles.map((fear) => {
                    const isSelected = fear.id === fearType;

                    return (
                      <button
                        className={`rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? "border-[#d6a15d]/70 bg-[#d6a15d]/15 shadow-[0_0_30px_rgba(214,161,93,0.12)]"
                            : "border-white/10 bg-white/[0.035] hover:border-[#d6a15d]/35 hover:bg-[#d6a15d]/[0.06]"
                        }`}
                        key={fear.id}
                        onClick={() => setFearType(fear.id)}
                        type="button"
                      >
                        <span className="text-sm font-semibold text-[#f5f2ea]">{fear.title}</span>
                        <span className="mt-2 block text-sm leading-6 text-[#a7a29a]">{fear.diagnostic}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Duração da jornada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {journeyOptions.map((days) => {
                    const isSelected = days === journeyLength;

                    return (
                      <button
                        className={`rounded-2xl border px-3 py-5 text-center text-sm font-semibold transition ${
                          isSelected
                            ? "border-[#d6a15d]/70 bg-[#d6a15d]/15 text-[#f0b76a]"
                            : "border-white/10 bg-white/[0.04] text-[#f5f2ea] hover:border-[#d6a15d]/50 hover:bg-[#d6a15d]/10"
                        }`}
                        key={days}
                        onClick={() => setJourneyLength(days)}
                        type="button"
                      >
                        {days} dias
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm leading-6 text-[#a7a29a]">
                  Comece pequeno se o medo transforma tudo em cobrança. A jornada pode crescer depois.
                </p>
              </CardContent>
            </Card>

            {formError ? (
              <p className="rounded-2xl border border-[#7f1d1d]/40 bg-[#7f1d1d]/15 px-5 py-4 text-sm text-[#f5c7c7]">
                {formError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button className="w-full sm:w-auto" size="lg" type="submit">
                Criar jornada local
              </Button>
              <p className="text-sm leading-6 text-[#77716a]">
                Seus dados ficam neste navegador. Sem login, sem promessa mágica, sem distração.
              </p>
            </div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
