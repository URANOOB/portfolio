export const bootDelayMs = 1_000;

export function getBootDelay(seenInSession: boolean, prefersReducedMotion: boolean) {
  return seenInSession || prefersReducedMotion ? 0 : bootDelayMs;
}

export function isBootDismissalKey(key: string) {
  return ["Enter", "Escape", " ", "Spacebar"].includes(key);
}
