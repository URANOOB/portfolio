import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (name) document.cookie = `${name}=; max-age=0; path=/`;
  });
  Reflect.deleteProperty(window, "turnstile");
});
