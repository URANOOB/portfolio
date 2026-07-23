"use client";

import dynamic from "next/dynamic";
import type { AppId } from "@/types/portfolio";

const apps = {
  about: dynamic(() => import("@/components/apps/AboutApp").then((module) => module.AboutApp), {
    loading: AppLoading,
  }),
  experience: dynamic(
    () => import("@/components/apps/ExperienceApp").then((module) => module.ExperienceApp),
    { loading: AppLoading },
  ),
  logistics: dynamic(() => import("@/components/apps/LogisticsApp").then((module) => module.LogisticsApp), {
    loading: AppLoading,
  }),
  help: dynamic(() => import("@/components/apps/HelpApp").then((module) => module.HelpApp), {
    loading: AppLoading,
  }),
  search: dynamic(() => import("@/components/apps/SearchApp").then((module) => module.SearchApp), {
    loading: AppLoading,
  }),
  settings: dynamic(() => import("@/components/apps/SettingsApp").then((module) => module.SettingsApp), {
    loading: AppLoading,
  }),
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
