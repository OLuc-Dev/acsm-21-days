"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { saveCheckIn } from "@/lib/storage";
import type { DailyCheckIn, EmotionalScore } from "@/lib/types";

type EmotionalCheckInProps = {
  day?: number;
  journeyId?: string;
  existingCheckIn?: DailyCheckIn;
  onSaved?: () => void;
};

const emotionalScores: EmotionalScore[] = [1, 2, 3, 4, 5];

const createCheckInId = (journeyId: string, day: number) =>
  `checkin-${journeyId}-${day}-${Date.now().toString(36)}`;

export function EmotionalCheckIn({ day, journeyId, existingCheckIn, onSaved }: EmotionalCheckInProps) {
  const [emotionalScore, setEmotionalScore] = useState<EmotionalScore>(existingCheckIn?.emotionalScore ?? 3);
  const [reflection, setReflection] = useState(existingCheckIn?.reflection ?? "");
  const [completed, setCompleted] = useState(existingCheckIn?.completed ?? true);
  const [error, setError] = useState("");

  useEffect(() => {
    setEmotionalScore(existingCheckIn?.emotionalScore ?? 3);
    setReflection(existingCheckIn?.reflection ?? "");
    setCompleted(existingCheckIn?.completed ?? true);
    setError("");
  }, [day, existingCheckIn]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!day || !journeyId) {
      setError("Crie uma jornada antes de salvar o check-in.");
      return;
    }

    const trimmedReflection = reflection.trim();

    if (!trimmedReflection) {
      setError("Escreva uma reflexão curta. O medo perde força quando deixa de ficar invisível.");
      return;
    }

    saveCheckIn({
      id: existingCheckIn?.id ?? createCheckInId(journeyId, day),
      journeyId,
      day,
      completed,
      emotionalScore,
      reflection: trimmedReflection,
      createdAt: existingCheckIn?.createdAt ?? new Date().toISOString(),
    });

    onSaved?.();
  };

  return (
    <form className="rounded-3xl border border-dashed border-white/15 bg-black/20 p-6" onSubmit={handleSubmit}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Check-in emocional</p>
      <p className="mt-3 text-sm leading-6 text-[#a7a29a]">
        {day
          ? `Registre o que aconteceu quando você parou de negociar com a fuga no dia ${day}.`
          : "Registre o que aconteceu quando você parou de negociar com a fuga."}
      </p>

      <div className="mt-5 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Nota emocional">
        {emotionalScores.map((score) => {
          const isSelected = score === emotionalScore;

          return (
            <button
              aria-checked={isSelected}
              className={`rounded-2xl border py-3 text-sm transition ${
                isSelected
                  ? "border-[#d6a15d]/70 bg-[#d6a15d]/15 text-[#f0b76a]"
                  : "border-white/10 bg-white/[0.04] text-[#f5f2ea] hover:border-[#d6a15d]/50 hover:bg-[#d6a15d]/10"
              }`}
              key={score}
              onClick={() => setEmotionalScore(score)}
              role="radio"
              type="button"
            >
              {score}
            </button>
          );
        })}
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-semibold text-[#f5f2ea]">Reflexão curta</span>
        <textarea
          className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-[#f5f2ea] outline-none transition placeholder:text-[#77716a] focus:border-[#d6a15d]/60 focus:ring-2 focus:ring-[#d6a15d]/20"
          maxLength={260}
          onChange={(event) => {
            setReflection(event.target.value);
            setError("");
          }}
          placeholder="Qual medo tentou negociar com você antes ou durante a ação?"
          value={reflection}
        />
      </label>

      <label className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-[#c7c0b6]">
        <input
          checked={completed}
          className="mt-1 h-4 w-4 accent-[#d6a15d]"
          onChange={(event) => setCompleted(event.target.checked)}
          type="checkbox"
        />
        <span>Marcar desafio como concluído. Não precisa ter sido perfeito. Precisa ter sido enfrentado.</span>
      </label>

      {error ? <p className="mt-4 text-sm leading-6 text-[#f5c7c7]">{error}</p> : null}

      <Button className="mt-5 w-full" type="submit" variant={existingCheckIn ? "secondary" : "primary"}>
        {existingCheckIn ? "Atualizar check-in" : "Salvar check-in"}
      </Button>
    </form>
  );
}
