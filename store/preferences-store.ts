"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";
export type Language = "es" | "en";
export type Accent = "orange" | "green" | "blue" | "purple";
export type TextSize = "small" | "medium" | "large";
export type Wallpaper = "landscape";

interface PreferencesStore {
  theme: Theme;
  language: Language;
  accent: Accent;
  textSize: TextSize;
  wallpaper: Wallpaper;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setAccent: (accent: Accent) => void;
  setTextSize: (textSize: TextSize) => void;
  setWallpaper: (wallpaper: Wallpaper) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: "dark",
      language: "es",
      accent: "orange",
      textSize: "medium",
      wallpaper: "landscape",
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setAccent: (accent) => set({ accent }),
      setTextSize: (textSize) => set({ textSize }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: "urano-preferences",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
