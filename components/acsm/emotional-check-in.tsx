"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveCheckIn } from "@/lib/storage";
import type { DailyCheckIn, EmotionalScore } from "@/lib/types";

const scoreOptions: EmotionalScore[] = [1, 2, 3, 4, 5];

function createCheckInId() {
  return `checkin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

type EmotionalCheckInProps = {
  journeyId: string;
  day: number;
  existingCheckIn?: DailyCheckIn | null;
  onSave?: (checkIn: DailyCheckIn) => void;
};

export function EmotionalCheckIn({
  journeyId,
  day,
  existingCheckIn,
  onSave,
}: EmotionalCheckInProps) {
  const [score, setScore] = useState<EmotionalScore | null>(
    existingCheckIn?.emotionalScore ?? null,
  );
  const [reflection, setReflection] = useState(existingCheckIn?.reflection ?? "");

  const isSaved = Boolean(existingCheckIn);

  function handleSubmit() {
    if (score === null) {
      return;
    }

    const checkIn: DailyCheckIn = {
      id: existingCheckIn?.id ?? createCheckInId(),
      journeyId,
      day,
      completed: true,
      emotionalScore: score,
      reflection: reflection.trim(),
      createdAt: existingCheckIn?.createdAt ?? new Date().toISOString(),
    };

    saveCheckIn(checkIn);
    onSave?.(checkIn);
  }

  return (
    <div className="rounded-3xl border border-dashed border-white/15 bg-black/20 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d6a15d]">Check-in emocional</p>
      <p className="mt-3 text-sm leading-6 text-[#a7a29a]">
        De 1 a 5, quanto o medo pesou hoje antes de você agir?
      </p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {scoreOptions.map((option) => {
          const isSelected = option === score;

          return (
            <button
              key={option}
              className={`rounded-2xl border py-3 text-sm transition ${
                isSelected
                  ? "border-[#d6a15d]/70 bg-[#d6a15d]/15 text-[#f0b76a]"
                  : "border-white/10 bg-white/[0.04] text-[#f5f2ea] hover:border-[#d6a15d]/50 hover:bg-[#d6a15d]/10"
              }`}
              onClick={() => setScore(option)}
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
      <textarea
        className="mt-4 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-[#f5f2ea] outline-none transition placeholder:text-[#77716a] focus:border-[#d6a15d]/60 focus:ring-2 focus:ring-[#d6a15d]/20"
        maxLength={280}
        onChange={(event) => setReflection(event.target.value)}
        placeholder="O que o medo tentou negociar com você antes da ação?"
        value={reflection}
      />
      <Button
        className="mt-4 w-full"
        disabled={score === null}
        onClick={handleSubmit}
        type="button"
      >
        {isSaved ? "Atualizar check-in do dia" : "Concluir check-in do dia"}
      </Button>
    </div>
  );
}
