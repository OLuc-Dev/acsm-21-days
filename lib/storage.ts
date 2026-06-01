import type { DailyCheckIn, UserJourney } from "./types";

const JOURNEY_STORAGE_KEY = "acsm:journey";
const CHECK_INS_STORAGE_KEY = "acsm:check-ins";

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseLocalStorage()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const saveJourney = (journey: UserJourney) => {
  writeJson(JOURNEY_STORAGE_KEY, journey);
};

export const getJourney = () => readJson<UserJourney | null>(JOURNEY_STORAGE_KEY, null);

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

export const getCheckIns = () =>
  readJson<DailyCheckIn[]>(CHECK_INS_STORAGE_KEY, []).sort((a, b) => a.day - b.day);

export const clearJourney = () => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(JOURNEY_STORAGE_KEY);
  window.localStorage.removeItem(CHECK_INS_STORAGE_KEY);
};
