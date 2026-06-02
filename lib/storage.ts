import type { DailyCheckIn, FearType, JourneyLength, UserJourney } from "./types";

const JOURNEY_STORAGE_KEY = "acsm:journey";
const CHECK_INS_STORAGE_KEY = "acsm:check-ins";

const JOURNEY_LENGTHS: readonly JourneyLength[] = [7, 14, 21];
const FEAR_TYPES: readonly FearType[] = [
  "judgment",
  "failure",
  "starting",
  "visibility",
  "discipline",
  "rejection",
  "uncertainty",
];

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readRaw = (key: string): unknown => {
  if (!canUseLocalStorage()) {
    return undefined;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return undefined;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return undefined;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const isJourneyLength = (value: unknown): value is JourneyLength =>
  typeof value === "number" && JOURNEY_LENGTHS.includes(value as JourneyLength);

const isUserJourney = (value: unknown): value is UserJourney => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const journey = value as Record<string, unknown>;

  return (
    typeof journey.id === "string" &&
    typeof journey.goal === "string" &&
    typeof journey.fearType === "string" &&
    FEAR_TYPES.includes(journey.fearType as FearType) &&
    isJourneyLength(journey.length) &&
    typeof journey.startedAt === "string"
  );
};

const isDailyCheckIn = (value: unknown): value is DailyCheckIn => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const checkIn = value as Record<string, unknown>;

  return (
    typeof checkIn.id === "string" &&
    typeof checkIn.journeyId === "string" &&
    typeof checkIn.day === "number" &&
    typeof checkIn.completed === "boolean" &&
    typeof checkIn.emotionalScore === "number" &&
    typeof checkIn.reflection === "string" &&
    typeof checkIn.createdAt === "string"
  );
};

export const saveJourney = (journey: UserJourney) => {
  writeJson(JOURNEY_STORAGE_KEY, journey);
};

export const getJourney = (): UserJourney | null => {
  const value = readRaw(JOURNEY_STORAGE_KEY);
  return isUserJourney(value) ? value : null;
};

export const saveCheckIn = (checkIn: DailyCheckIn) => {
  const checkIns = getCheckIns();
  const existingIndex = checkIns.findIndex(
    (storedCheckIn) =>
      storedCheckIn.journeyId === checkIn.journeyId && storedCheckIn.day === checkIn.day,
  );

  if (existingIndex >= 0) {
    checkIns[existingIndex] = checkIn;
  } else {
    checkIns.push(checkIn);
  }

  writeJson(CHECK_INS_STORAGE_KEY, checkIns);
};

export const getCheckIns = (): DailyCheckIn[] => {
  const value = readRaw(CHECK_INS_STORAGE_KEY);

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isDailyCheckIn).sort((a, b) => a.day - b.day);
};

export const clearJourney = () => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(JOURNEY_STORAGE_KEY);
  window.localStorage.removeItem(CHECK_INS_STORAGE_KEY);
};
