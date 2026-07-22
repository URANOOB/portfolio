"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppId, WindowState } from "@/types/portfolio";

const initialWindows: Record<AppId, WindowState> = {
  finder: windowState("finder", 86, 94, 920, 590, 2),
  about: windowState("about", 152, 108, 820, 570, 3),
  experience: windowState("experience", 210, 76, 880, 620, 4),
  projects: windowState("projects", 120, 72, 980, 640, 5),
  skills: windowState("skills", 230, 92, 860, 590, 6),
  terminal: windowState("terminal", 190, 122, 780, 500, 7),
  resume: windowState("resume", 170, 64, 900, 660, 8),
  contact: windowState("contact", 240, 92, 820, 600, 9),
};

function windowState(
  id: AppId,
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex: number,
): WindowState {
  return {
    id,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x, y },
    size: { width, height },
    zIndex,
  };
}

interface WindowStore {
  windows: Record<AppId, WindowState>;
  activeApp: AppId | null;
  topZ: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (id: AppId, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set) => ({
      windows: initialWindows,
      activeApp: null,
      topZ: 10,
      openWindow: (id) =>
        set((state) => {
          const nextZ = state.topZ + 1;
          return {
            topZ: nextZ,
            activeApp: id,
            windows: {
              ...state.windows,
              [id]: {
                ...state.windows[id],
                isOpen: true,
                isMinimized: false,
                zIndex: nextZ,
              },
            },
          };
        }),
      closeWindow: (id) =>
        set((state) => {
          const windows = {
            ...state.windows,
            [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
          };
          return { windows, activeApp: nextActive(windows, id) };
        }),
      minimizeWindow: (id) =>
        set((state) => {
          const windows = {
            ...state.windows,
            [id]: { ...state.windows[id], isMinimized: true },
          };
          return { windows, activeApp: nextActive(windows, id) };
        }),
      toggleMaximize: (id) =>
        set((state) => ({
          activeApp: id,
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              isMaximized: !state.windows[id].isMaximized,
              isMinimized: false,
            },
          },
        })),
      focusWindow: (id) =>
        set((state) => {
          const nextZ = state.topZ + 1;
          return {
            topZ: nextZ,
            activeApp: id,
            windows: {
              ...state.windows,
              [id]: { ...state.windows[id], zIndex: nextZ, isMinimized: false },
            },
          };
        }),
      moveWindow: (id, x, y) =>
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              position: { x: Math.max(8, x), y: Math.max(52, y) },
            },
          },
        })),
      resizeWindow: (id, width, height) =>
        set((state) => ({
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              size: { width: Math.max(360, width), height: Math.max(280, height) },
            },
          },
        })),
    }),
    {
      name: "urano-window-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ windows: state.windows, topZ: state.topZ }),
    },
  ),
);

function nextActive(windows: Record<AppId, WindowState>, excluded: AppId) {
  return (
    Object.values(windows)
      .filter((item) => item.id !== excluded && item.isOpen && !item.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
  );
}
