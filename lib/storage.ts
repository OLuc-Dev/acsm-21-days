import type { UserJourney } from "@/lib/types";

export const storageKeys = {
  journey: "acsm:journey",
  checkIns: "acsm:check-ins",
} as const;

export function saveJourney(journey: UserJourney) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKeys.journey, JSON.stringify(journey));
}

export function getJourney(): UserJourney | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedJourney = window.localStorage.getItem(storageKeys.journey);

  if (!storedJourney) {
    return null;
  }

  return JSON.parse(storedJourney) as UserJourney;
}
