import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { AboutApp } from "@/components/apps/AboutApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { MenuBar } from "@/components/desktop/MenuBar";
import { dockApps } from "@/data/navigation";
import { createInitialWindows } from "@/lib/window-state";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";

beforeEach(() => {
  usePreferencesStore.setState({ language: "es" });
  useWindowStore.setState({
    windows: createInitialWindows(),
    activeApp: null,
    topZ: 14,
    opener: null,
  });
});

describe("professional navigation", () => {
  it("keeps the dock ordered around the primary portfolio journey", () => {
    expect(dockApps).toEqual(["about", "experience", "projects", "skills", "resume", "contact", "terminal"]);
  });

  it("shows the role and primary actions before secondary contact links", () => {
    render(<AboutApp />);

    expect(screen.getByText("Desarrollador de Software Full Stack")).toBeVisible();
    expect(screen.getByRole("button", { name: "Ver proyectos" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Abrir currículum" })).toBeVisible();
    expect(screen.getByText(/Mi experiencia previa coordinando operaciones logísticas/i)).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Ver proyectos" }));
    expect(useWindowStore.getState().windows.projects.isOpen).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Abrir currículum" }));
    expect(useWindowStore.getState().windows.resume.isOpen).toBe(true);
  });

  it("pairs every listed technology with an identifying icon", () => {
    const { container } = render(<SkillsApp />);

    expect(container.querySelectorAll(".skill-card-icon svg")).toHaveLength(17);
    expect(screen.getByText("React")).toBeVisible();
    expect(screen.getByText("Docker")).toBeVisible();
  });

  it("keeps search and help reachable from the top bar", () => {
    render(<MenuBar />);

    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(useWindowStore.getState().windows.search.isOpen).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Ayuda" }));
    expect(useWindowStore.getState().windows.help.isOpen).toBe(true);
  });
});

describe("window recovery", () => {
  it("moves persisted windows back into the viewport and maximizes open windows on mobile", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 844 });
    useWindowStore.setState((state) => ({
      windows: {
        ...state.windows,
        about: { ...state.windows.about, position: { x: 4000, y: 4000 }, isOpen: true },
      },
    }));

    useWindowStore.getState().constrainToViewport();
    const about = useWindowStore.getState().windows.about;
    expect(about.isMaximized).toBe(true);
    expect(about.position.x).toBeLessThanOrEqual(22);
    expect(about.position.y).toBeLessThanOrEqual(192);
  });
});
