"use client";

import { CheckCircle2, Globe2, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";

export function AboutApp() {
  return (
    <article className="app-scroll about-app">
      <header className="app-hero about-hero">
        <div className="profile-avatar" aria-label="Monograma de William Galeano">
          <span>{profile.initials}</span>
          <i aria-hidden="true" />
        </div>
        <div>
          <p className="section-kicker">PERFIL HÍBRIDO</p>
          <h2>{profile.name}</h2>
          <p className="about-headline">{profile.headline}</p>
          <div className="about-meta">
            <span>
              <MapPin size={14} /> {profile.location}
            </span>
            <span>
              <Globe2 size={14} /> {profile.languages.join(" · ")}
            </span>
          </div>
        </div>
      </header>

      <section className="about-grid">
        <div className="narrative-card">
          <Sparkles size={20} />
          <h3>Tecnología con contexto operativo</h3>
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="availability-card">
          <p>Disponibilidad</p>
          <h3>{profile.availability}</h3>
          <span>
            <CheckCircle2 size={16} /> Comunicación bilingüe
          </span>
          <span>
            <CheckCircle2 size={16} /> Liderazgo y seguimiento
          </span>
          <span>
            <CheckCircle2 size={16} /> Aprendizaje rápido
          </span>
        </aside>
      </section>

      <section className="principles">
        <div>
          <strong>01</strong>
          <h3>Entender</h3>
          <p>Contexto, restricciones y resultado esperado.</p>
        </div>
        <div>
          <strong>02</strong>
          <h3>Construir</h3>
          <p>Soluciones simples, visibles y mantenibles.</p>
        </div>
        <div>
          <strong>03</strong>
          <h3>Coordinar</h3>
          <p>Comunicación clara hasta cerrar el ciclo.</p>
        </div>
      </section>
      <figure className="brand-preview">
        <Image
          src="/og.png"
          alt="Urano OS: identidad visual de William Galeano, software y logística"
          fill
          sizes="(max-width: 600px) 90vw, 700px"
        />
        <figcaption>Una identidad original para conectar tecnología y operación.</figcaption>
      </figure>
      <p className="photo-note">
        La fotografía profesional se añadirá cuando el propietario proporcione el archivo original.
      </p>
    </article>
  );
}
