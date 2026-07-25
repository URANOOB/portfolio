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
  opener: HTMLElement | null;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  moveWindow: (id: AppId, x: number, y: number) => void;
  resizeWindow: (id: AppId, width: number, height: number) => void;
  constrainToViewport: () => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: initialWindows,
      activeApp: null,
      topZ: 14,
      opener: null,
      openWindow: (id) =>
        set((state) => {
          const nextZ = state.topZ + 1;
          return {
            topZ: nextZ,
            activeApp: id,
            opener: document.activeElement instanceof HTMLElement ? document.activeElement : null,
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
      closeWindow: (id) => {
        const opener = get().opener;
        set((state) => {
          const windows = {
            ...state.windows,
            [id]: { ...state.windows[id], isOpen: false, isMinimized: false },
          };
          return { windows, activeApp: nextActive(windows, id) };
        });
        window.setTimeout(() => opener?.focus(), 0);
      },
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
      constrainToViewport: () =>
        set((state) => {
          const isMobile = window.innerWidth <= 700;
          const maxWindowHeight = Math.max(280, window.innerHeight - 92);
          const windows = Object.fromEntries(
            Object.entries(state.windows).map(([id, windowState]) => {
              const visibleWidth = Math.min(windowState.size.width, Math.max(360, window.innerWidth - 16));
              const visibleHeight = Math.min(windowState.size.height, maxWindowHeight);
              const maxX = Math.max(8, window.innerWidth - visibleWidth - 8);
              const maxY = Math.max(52, window.innerHeight - visibleHeight - 82);
              return [
                id,
                {
                  ...windowState,
                  isMaximized: isMobile && windowState.isOpen ? true : windowState.isMaximized,
                  position: {
                    x: Math.min(Math.max(8, windowState.position.x), maxX),
                    y: Math.min(Math.max(52, windowState.position.y), maxY),
                  },
                },
              ];
            }),
          ) as Record<AppId, WindowState>;
          return { windows };
        }),
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
