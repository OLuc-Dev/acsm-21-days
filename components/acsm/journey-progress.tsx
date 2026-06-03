"use client";

import { useEffect, useState } from "react";
import type { JourneyLength } from "@/lib/types";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function JourneyProgressCard({
  completedDays,
  totalDays,
}: {
  completedDays: number;
  totalDays: JourneyLength;
}) {
  const safeCompletedDays = Math.min(Math.max(completedDays, 0), totalDays);
  const progress = Math.round((safeCompletedDays / totalDays) * 100);

  // Preenche o anel a partir do vazio no primeiro render (payoff visual).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const dashOffset = mounted ? CIRCUMFERENCE * (1 - progress / 100) : CIRCUMFERENCE;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-[#d6a15d]">Progresso</p>
      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-[120px] w-[120px] shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              stroke="#f0b76a"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold tracking-[-0.04em]">{progress}%</span>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold tracking-[-0.05em]">
            {safeCompletedDays}
            <span className="text-[#77716a]"> / {totalDays}</span>
          </p>
          <p className="mt-1 text-sm text-[#a7a29a]">dias concluídos</p>
        </div>
      </div>
    </div>
  );
}
