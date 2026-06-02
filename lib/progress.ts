import type { DailyCheckIn } from "@/lib/types";

export type JourneyProgressSummary = {
  completedDays: number;
  totalDays: number;
  percentage: number;
  currentDay: number;
  isComplete: boolean;
  streak: number;
  averageEmotionalScore: number | null;
};

function getUniqueCompletedDays(checkIns: DailyCheckIn[]) {
  return new Set(checkIns.filter((checkIn) => checkIn.completed).map((checkIn) => checkIn.day));
}

function calculateCurrentStreak(completedDays: Set<number>) {
  let streak = 0;

  for (let day = 1; completedDays.has(day); day += 1) {
    streak += 1;
  }

  return streak;
}

function calculateAverageEmotionalScore(checkIns: DailyCheckIn[]) {
  if (checkIns.length === 0) {
    return null;
  }

  const totalScore = checkIns.reduce((sum, checkIn) => sum + checkIn.emotionalScore, 0);
  return Number((totalScore / checkIns.length).toFixed(1));
}

export function calculateProgress(checkIns: DailyCheckIn[], totalDays: number): JourneyProgressSummary {
  const safeTotalDays = Math.max(totalDays, 1);
  const completedDays = getUniqueCompletedDays(checkIns);
  const completedCount = Math.min(completedDays.size, safeTotalDays);
  const isComplete = completedCount >= safeTotalDays;

  return {
    completedDays: completedCount,
    totalDays: safeTotalDays,
    percentage: Math.min(100, Math.round((completedCount / safeTotalDays) * 100)),
    currentDay: isComplete ? safeTotalDays : completedCount + 1,
    isComplete,
    streak: calculateCurrentStreak(completedDays),
    averageEmotionalScore: calculateAverageEmotionalScore(checkIns),
  };
}
