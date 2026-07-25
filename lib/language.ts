export const languageCookieName = "rcoon-language";

export type SiteLanguage = "es" | "en";

export function getLanguage(value?: string): SiteLanguage {
  return value === "en" ? "en" : "es";
}
