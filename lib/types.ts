export type JourneyLength = 7 | 14 | 21;

export type FearType =
  | "judgment"
  | "failure"
  | "starting"
  | "visibility"
  | "discipline"
  | "rejection"
  | "uncertainty";

export type UserJourney = {
  id: string;
  name?: string;
  goal: string;
  fearType: FearType;
  length: JourneyLength;
  currentDay: number;
  startedAt: string;
  completedAt?: string;
};

export type DailyCheckIn = {
  id: string;
  journeyId: string;
  day: number;
  completed: boolean;
  emotionalScore: 1 | 2 | 3 | 4 | 5;
  reflection: string;
  createdAt: string;
};

export type DailyChallenge = {
  day: number;
  title: string;
  diagnosis: string;
  action: string;
  reflectionPrompt: string;
  closing: string;
};
