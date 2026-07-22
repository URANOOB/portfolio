"use client";

import dynamic from "next/dynamic";
import type { AppId } from "@/types/portfolio";

const apps = {
  finder: dynamic(() => import("@/components/apps/FinderApp").then((module) => module.FinderApp), {
    loading: AppLoading,
  }),
  about: dynamic(() => import("@/components/apps/AboutApp").then((module) => module.AboutApp), {
    loading: AppLoading,
  }),
  experience: dynamic(
    () => import("@/components/apps/LogisticsApp").then((module) => module.LogisticsApp),
    { loading: AppLoading },
  ),
  projects: dynamic(() => import("@/components/apps/ProjectsApp").then((module) => module.ProjectsApp), {
    loading: AppLoading,
  }),
  skills: dynamic(() => import("@/components/apps/SkillsApp").then((module) => module.SkillsApp), {
    loading: AppLoading,
  }),
  terminal: dynamic(() => import("@/components/apps/TerminalApp").then((module) => module.TerminalApp), {
    loading: AppLoading,
  }),
  resume: dynamic(() => import("@/components/apps/ResumeApp").then((module) => module.ResumeApp), {
    loading: AppLoading,
  }),
  contact: dynamic(() => import("@/components/apps/ContactApp").then((module) => module.ContactApp), {
    loading: AppLoading,
  }),
} satisfies Record<AppId, React.ComponentType>;

function AppLoading() {
  return (
    <div className="app-loading" role="status">
      <span /> Preparando aplicación…
    </div>
  );
}

export function AppContent({ id }: { id: AppId }) {
  const Component = apps[id];
  return <Component />;
}
