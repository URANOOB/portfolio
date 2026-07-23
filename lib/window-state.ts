import type { AppId, WindowState } from "../types/portfolio";

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
    isOpen: id === "about",
    isMinimized: false,
    isMaximized: false,
    position: { x, y },
    size: { width, height },
    zIndex,
  };
}

export function createInitialWindows(): Record<AppId, WindowState> {
  return {
    about: windowState("about", 152, 108, 820, 570, 3),
    experience: windowState("experience", 210, 76, 880, 620, 4),
    logistics: windowState("logistics", 210, 76, 880, 620, 5),
    help: windowState("help", 250, 100, 720, 520, 6),
    search: windowState("search", 180, 88, 820, 560, 7),
    settings: windowState("settings", 280, 110, 680, 480, 8),
    projects: windowState("projects", 120, 72, 980, 640, 9),
    skills: windowState("skills", 230, 92, 860, 590, 10),
    terminal: windowState("terminal", 190, 122, 780, 500, 11),
    resume: windowState("resume", 170, 64, 900, 660, 12),
    contact: windowState("contact", 240, 92, 820, 600, 13),
  };
}
