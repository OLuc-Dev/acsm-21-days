export function calculateProgress(completedDays: number, totalDays: number) {
  if (totalDays <= 0) return 0;
  return Math.min(100, Math.round((completedDays / totalDays) * 100));
}
