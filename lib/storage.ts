import type { DailyCheckIn, UserJourney } from "@/lib/types";

export const storageKeys = {
  journey: "acsm:journey",
  checkIns: "acsm:check-ins",
} as const;

function canUseStorage() {
  return typeof window !== "undefined";
}

export function saveJourney(journey: UserJourney) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(storageKeys.journey, JSON.stringify(journey));
}

export function getJourney(): UserJourney | null {
  if (!canUseStorage()) {
    return null;
  }

  const storedJourney = window.localStorage.getItem(storageKeys.journey);

  if (!storedJourney) {
    return null;
  }

  return JSON.parse(storedJourney) as UserJourney;
}

export function getCheckIns(): DailyCheckIn[] {
  if (!canUseStorage()) {
    return [];
  }

  const storedCheckIns = window.localStorage.getItem(storageKeys.checkIns);

  if (!storedCheckIns) {
    return [];
  }

  return JSON.parse(storedCheckIns) as DailyCheckIn[];
}

export function saveCheckIn(checkIn: DailyCheckIn) {
  if (!canUseStorage()) {
    return;
  }

  const checkIns = getCheckIns();
  const checkInsWithoutCurrentDay = checkIns.filter(
    (storedCheckIn) =>
      storedCheckIn.journeyId !== checkIn.journeyId || storedCheckIn.day !== checkIn.day,
  );

  window.localStorage.setItem(
    storageKeys.checkIns,
    JSON.stringify([...checkInsWithoutCurrentDay, checkIn]),
  );
}
