import type { JourneyLength, JourneyProgress as JourneyProgressData } from "@/lib/types";

type JourneyProgressProps =
  | {
      progress: JourneyProgressData;
      completedDays?: never;
      totalDays?: never;
    }
  | {
      progress?: never;
      completedDays: number;
      totalDays: JourneyLength;
    };

const getProgressData = (props: JourneyProgressProps): JourneyProgressData => {
  if (props.progress) {
    return props.progress;
  }

  const completedDays = Math.min(Math.max(props.completedDays, 0), props.totalDays);

  return {
    journeyLength: props.totalDays,
    completedDays,
    progressPercentage: Math.round((completedDays / props.totalDays) * 100),
    currentStreak: completedDays,
    averageEmotionalScore: null,
    currentDay: Math.min(completedDays + 1, props.totalDays),
    isCompleted: completedDays >= props.totalDays,
  };
};

export function JourneyProgress(props: JourneyProgressProps) {
  const progress = getProgressData(props);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#d6a15d]">Progresso</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{progress.progressPercentage}%</p>
        </div>
        <p className="text-sm text-[#a7a29a]">
          {progress.completedDays} de {progress.journeyLength} dias
        </p>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#f0b76a]" style={{ width: `${progress.progressPercentage}%` }} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-black/20 p-3">
          <p className="text-[#77716a]">Streak</p>
          <p className="mt-1 font-semibold text-[#f5f2ea]">{progress.currentStreak} dias</p>
        </div>
        <div className="rounded-2xl bg-black/20 p-3">
          <p className="text-[#77716a]">Média emocional</p>
          <p className="mt-1 font-semibold text-[#f5f2ea]">
            {progress.averageEmotionalScore ? `${progress.averageEmotionalScore}/5` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
