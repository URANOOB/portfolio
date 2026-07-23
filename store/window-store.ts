"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { AppId, WindowState } from "@/types/portfolio";
import { createInitialWindows } from "@/lib/window-state";

const initialWindows = createInitialWindows();

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
      topZ: 14,
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
                isMaximized: window.innerWidth <= 700 ? true : state.windows[id].isMaximized,
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
      name: "rcoon-window-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ windows: state.windows, topZ: state.topZ }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<WindowStore> | undefined;
        return {
          ...currentState,
          ...persisted,
          windows: {
            ...initialWindows,
            ...persisted?.windows,
          },
        };
      },
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
