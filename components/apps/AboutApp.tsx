"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { socialLinks } from "@/data/profile";
import { useWindowStore } from "@/store/window-store";

export function AboutApp() {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <article className="app-scroll about-editorial">
      <header className="about-editorial-title">
        <h2>
          <span>William</span>
          <i aria-hidden="true" />
          <span>Galeano</span>
        </h2>
      </header>

      <section className="about-editorial-copy">
        <p>
          Colombian, <strong>“Rolo”</strong>—meaning from the capital—and Latin American. I am a
          full-stack software engineer who enjoys building thoughtful, high-quality digital products.
          I love translating complex ideas into interfaces that feel clear, reliable, and fast.
        </p>
        <p>
          Outside of code, I enjoy playing videogames and exploring new technologies. You can connect
          with me on{" "}
          {socialLinks.linkedin ? (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          ) : (
            <span className="about-inline-link">LinkedIn</span>
          )}
          .
        </p>
      </section>

      <section className="about-focus">
        <h3>Current Focus</h3>
        <ul>
          <li>
            Growing{" "}
            <button onClick={() => openWindow("projects")}>Inglés Pa&apos; La Paz</button> while
            validating ideas and helping to build free education.
          </li>
          <li>Building part-time Ingenio Empresarial tech solutions.</li>
          <li>Continuing my software engineering studies at Politécnico Grancolombiano.</li>
        </ul>
      </section>

      <div className="about-editorial-footer">
        <section className="about-timeline-cta">
          <p>Full Timeline</p>
          <h3>View my complete experience timeline in a dedicated window with full role context.</h3>
          <button onClick={() => openWindow("experience")}>Open Experience <ArrowUpRight size={16} /></button>
        </section>
        <figure className="about-raccoon">
          <Image
            src="/about-raccoon.gif"
            alt="Mapache animado en pixel art"
            width={970}
            height={610}
            unoptimized
            draggable={false}
          />
        </figure>
      </div>
    </article>
  );
}
