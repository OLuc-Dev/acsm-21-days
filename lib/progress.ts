import type { DailyCheckIn, JourneyLength, JourneyProgress } from "./types";

const clampJourneyDay = (day: number, journeyLength: JourneyLength) =>
  Math.min(Math.max(day, 1), journeyLength);

const getCompletedDays = (checkIns: DailyCheckIn[], journeyLength: JourneyLength) => {
  const completedDays = new Set<number>();

  checkIns.forEach((checkIn) => {
    if (checkIn.completed && checkIn.day >= 1 && checkIn.day <= journeyLength) {
      completedDays.add(checkIn.day);
    }
  });

  return completedDays;
};

export const getCurrentStreak = (checkIns: DailyCheckIn[]) => {
  const completedDays = new Set(
    checkIns
      .filter((checkIn) => checkIn.completed)
      .map((checkIn) => checkIn.day)
      .filter((day) => Number.isInteger(day) && day > 0),
  );

  if (completedDays.size === 0) {
    return 0;
  }

  let day = Math.max(...completedDays);
  let streak = 0;

  while (completedDays.has(day)) {
    streak += 1;
    day -= 1;
  }

  return streak;
};

export const getAverageEmotionalScore = (checkIns: DailyCheckIn[]) => {
  const scores = checkIns
    .map((checkIn) => checkIn.emotionalScore)
    .filter((score) => score >= 1 && score <= 5);

  if (scores.length === 0) {
    return null;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  return Math.round((total / scores.length) * 10) / 10;
};

export const getCurrentDay = (
  checkIns: DailyCheckIn[],
  journeyLength: JourneyLength,
) => {
  const completedDays = getCompletedDays(checkIns, journeyLength);
  const nextOpenDay = completedDays.size + 1;

  return clampJourneyDay(nextOpenDay, journeyLength);
};

export const calculateProgress = (
  checkIns: DailyCheckIn[],
  journeyLength: JourneyLength,
): JourneyProgress => {
  const completedDays = getCompletedDays(checkIns, journeyLength).size;
  const progressPercentage = Math.round((completedDays / journeyLength) * 100);

  return {
    journeyLength,
    completedDays,
    progressPercentage,
    currentStreak: getCurrentStreak(checkIns),
    averageEmotionalScore: getAverageEmotionalScore(checkIns),
    currentDay: getCurrentDay(checkIns, journeyLength),
    isCompleted: completedDays >= journeyLength,
  };
};
