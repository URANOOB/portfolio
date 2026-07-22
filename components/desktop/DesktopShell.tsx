"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CirclePlus,
  Code2,
  Folder,
  Globe2,
  Heart,
  LockKeyhole,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Share2,
  SkipBack,
  SkipForward,
  Truck,
  UserRound,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { BootScreen } from "@/components/desktop/BootScreen";
import { SceneWallpaper } from "@/components/desktop/SceneWallpaper";
import { WindowLayer } from "@/components/windows/WindowLayer";
import { appDefinitions } from "@/data/navigation";
import { usePreferencesStore } from "@/store/preferences-store";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/types/portfolio";

const applicationIds: AppId[] = [
  "finder",
  "about",
  "experience",
  "projects",
  "skills",
  "terminal",
  "resume",
  "contact",
];

const initialTasks = ["Actualizar el portafolio", "Revisar nuevos proyectos", "Responder mensajes"];

const galleryItems: Array<{ icon: typeof Code2; label: string; app: AppId }> = [
  { icon: Code2, label: "Código", app: "projects" },
  { icon: BriefcaseBusiness, label: "Experiencia", app: "experience" },
  { icon: Truck, label: "Logística", app: "about" },
  { icon: UserRound, label: "Perfil", app: "about" },
];

const folders: Array<{ label: string; app: AppId }> = [
  { label: "Work files", app: "finder" },
  { label: "Projects", app: "projects" },
  { label: "Profile", app: "about" },
  { label: "Contact", app: "contact" },
];

export function DesktopShell() {
  const theme = usePreferencesStore((state) => state.theme);
  const language = usePreferencesStore((state) => state.language);
  const openWindow = useWindowStore((state) => state.openWindow);
  const reduceMotion = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const updateClock = () => setNow(new Date());
    updateClock();
    const clock = window.setInterval(updateClock, 30_000);

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openWindow("finder");
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearInterval(clock);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openWindow]);

  const hour = now ? now.getHours() : 10;
  const minute = now ? now.getMinutes() : 10;
  const clockStyle = {
    "--hour-angle": `${(hour % 12) * 30 + minute * 0.5}deg`,
    "--minute-angle": `${minute * 6}deg`,
  } as CSSProperties;
  const locale = language === "es" ? "es-CO" : "en-US";

  const sharePage = async () => {
    const shareData = { title: "William Galeano — Portfolio", url: window.location.href };
    if (navigator.share) await navigator.share(shareData);
    else await navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <main className="desktop dashboard-desktop" data-theme={theme}>
      <a className="skip-link" href="#dashboard-content">
        Saltar al contenido
      </a>
      <SceneWallpaper />

      <motion.section
        className="dashboard-shell"
        id="dashboard-content"
        aria-label="Escritorio personal"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.9, duration: 0.45 }}
      >
        <header className="browser-toolbar" aria-label="Navegación principal">
          <div className="browser-nav-actions">
            <button type="button" onClick={() => window.history.back()} aria-label="Atrás">
              <ArrowLeft />
            </button>
            <button type="button" onClick={() => window.history.forward()} aria-label="Adelante">
              <ArrowRight />
            </button>
          </div>

          <div className="browser-address">
            <span aria-hidden="true">aA</span>
            <LockKeyhole size={14} aria-hidden="true" />
            <strong>williamgaleano.dev</strong>
            <button type="button" onClick={() => window.location.reload()} aria-label="Recargar">
              <RefreshCw />
            </button>
          </div>

          <div className="browser-tools">
            <button type="button" onClick={() => openWindow("finder")} aria-label="Buscar">
              <Search />
            </button>
            <button type="button" onClick={sharePage} aria-label="Compartir">
              <Share2 />
            </button>
            <button type="button" onClick={() => openWindow("contact")} aria-label="Nuevo contacto">
              <Plus />
            </button>
            <button className="browser-avatar" type="button" onClick={() => openWindow("about")} aria-label="Abrir perfil">
              WG
            </button>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="dashboard-card time-widget" aria-label="Fecha y hora">
            <div className="analog-clock" style={clockStyle} aria-hidden="true">
              <i className="clock-center" />
              <i className="clock-hour" />
              <i className="clock-minute" />
              {Array.from({ length: 12 }, (_, index) => (
                <span key={index} style={{ "--tick": index } as CSSProperties} />
              ))}
            </div>
            <time dateTime={now?.toISOString()}>
              {now
                ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false }).format(now)
                : "--:--"}
            </time>
            <p>{now ? new Intl.DateTimeFormat(locale, { weekday: "long" }).format(now) : "—"}</p>
            <strong>
              {now ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(now) : "—"}
            </strong>
          </section>

          <div className="dashboard-center-stack">
            <section className="dashboard-card todo-widget">
              <h2>TO-DO LIST</h2>
              <div className="todo-list">
                {initialTasks.map((task, index) => (
                  <label key={task} className={completedTasks[index] ? "is-complete" : ""}>
                    <input
                      type="checkbox"
                      checked={completedTasks[index]}
                      onChange={() =>
                        setCompletedTasks((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)))
                      }
                    />
                    <span aria-hidden="true">✓</span>
                    <em>{task}</em>
                  </label>
                ))}
              </div>
            </section>

            <div className="dashboard-feature-row">
              <section className="dashboard-card quote-widget">
                <h2>TODAY&apos;S QUOTE</h2>
                <blockquote>“La claridad convierte una idea en un sistema que sí funciona.”</blockquote>
                <span>— William Galeano</span>
              </section>

              <section className="dashboard-card music-widget">
                <div>
                  <p>NOW PLAYING</p>
                  <h2>MUSIC PLAYLIST</h2>
                </div>
                <div className="music-controls" aria-label="Controles de música">
                  <button type="button" aria-label="Favorito"><Heart /></button>
                  <button type="button" aria-label="Anterior"><SkipBack /></button>
                  <button className="music-play" type="button" onClick={() => setIsPlaying((value) => !value)} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
                    {isPlaying ? <Pause /> : <Play />}
                  </button>
                  <button type="button" aria-label="Siguiente"><SkipForward /></button>
                  <button type="button" aria-label="Agregar"><CirclePlus /></button>
                </div>
              </section>
            </div>
          </div>

          <section className="dashboard-card applications-widget">
            <h2>APPLICATION</h2>
            <div className="application-grid">
              {applicationIds.map((id) => {
                const app = appDefinitions[id];
                const Icon = app.icon;
                return (
                  <button key={id} type="button" onClick={() => openWindow(id)} aria-label={`Abrir ${app.title}`}>
                    <Icon />
                    <span>{app.title}</span>
                  </button>
                );
              })}
              <button className="world-application" type="button" aria-label="Mundo, función próximamente" title="Mundo — próximamente">
                <Globe2 />
                <span>Mundo</span>
              </button>
            </div>
          </section>

          <section className="dashboard-card gallery-strip" aria-label="Accesos destacados">
            {galleryItems.map(({ icon: Icon, label, app }) => (
              <button key={label} type="button" onClick={() => openWindow(app)} aria-label={label}>
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </section>

          <section className="dashboard-card folders-widget">
            <h2>FOLDERS</h2>
            <div>
              {folders.map((folder) => (
                <button key={folder.label} type="button" onClick={() => openWindow(folder.app)}>
                  <Folder fill="currentColor" />
                  <span>{folder.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </motion.section>

      <WindowLayer />
      <BootScreen />
    </main>
  );
}
