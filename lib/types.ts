export type JourneyLength = 7 | 14 | 21;

export type FearType =
  | "judgment"
  | "failure"
  | "starting"
  | "visibility"
  | "discipline"
  | "rejection"
  | "uncertainty";

export type EmotionalScore = 1 | 2 | 3 | 4 | 5;

export type UserJourney = {
  id: string;
  userName?: string;
  goal: string;
  fearType: FearType;
  length: JourneyLength;
  startedAt: string;
  completedAt?: string;
};

export type DailyChallenge = {
  day: number;
  title: string;
  diagnosis: string;
  action: string;
  reflectionPrompt: string;
  closingPhrase: string;
};

export type DailyCheckIn = {
  id: string;
  journeyId: string;
  day: number;
  completed: boolean;
  emotionalScore: EmotionalScore;
  reflection: string;
  createdAt: string;
};

export type JourneyProgress = {
  journeyLength: JourneyLength;
  completedDays: number;
  progressPercentage: number;
  currentStreak: number;
  averageEmotionalScore: number | null;
  currentDay: number;
  isCompleted: boolean;
};
