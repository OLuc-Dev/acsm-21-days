import type { JourneyLength } from "@/lib/types";

export function JourneyProgressCard({
  completedDays,
  totalDays,
}: {
  completedDays: number;
  totalDays: JourneyLength;
}) {
  const safeCompletedDays = Math.min(Math.max(completedDays, 0), totalDays);
  const progress = Math.round((safeCompletedDays / totalDays) * 100);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#d6a15d]">Progresso</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{progress}%</p>
        </div>
        <p className="text-sm text-[#a7a29a]">
          {safeCompletedDays} de {totalDays} dias
        </p>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#f0b76a]" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
