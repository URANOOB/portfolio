"use client";

import { CheckCircle2, LoaderCircle, Mail, Phone, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialLinks } from "@/data/profile";
import {
  contactFieldLimits,
  serializeContactPayload,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/validation";
import { usePreferencesStore } from "@/store/preferences-store";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string | number;
  reset: (widgetId?: string | number) => void;
  remove?: (widgetId?: string | number) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const turnstileScriptId = "cloudflare-turnstile-script";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const emptyForm: ContactPayload = { name: "", email: "", company: "", subject: "", message: "" };

const formErrors = {
  es: {
    name: "Escribe tu nombre.",
    email: "Escribe un correo válido.",
    subject: "Cuéntame brevemente el motivo.",
    message: "El mensaje debe tener al menos 20 caracteres.",
  },
  en: {
    name: "Enter your name.",
    email: "Enter a valid email address.",
    subject: "Briefly tell me what this is about.",
    message: "Your message must contain at least 20 characters.",
  },
} as const;

export function ContactApp() {
  const language = usePreferencesStore((state) => state.language);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetRef = useRef<string | number | undefined>(undefined);
  const turnstileEnabled = Boolean(turnstileSiteKey);

  const resetTurnstile = useCallback(() => {
    const widgetId = turnstileWidgetRef.current;
    if (widgetId !== undefined) window.turnstile?.reset(widgetId);
    setTurnstileToken("");
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return;

    let cancelled = false;
    let script: HTMLScriptElement | null = null;
    const renderWidget = () => {
      const container = turnstileContainerRef.current;
      if (cancelled || !container || !window.turnstile || turnstileWidgetRef.current !== undefined) return;
      turnstileWidgetRef.current = window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": resetTurnstile,
        "error-callback": resetTurnstile,
        "timeout-callback": resetTurnstile,
      });
    };

    const existingScript = document.getElementById(turnstileScriptId) as HTMLScriptElement | null;
    if (existingScript) {
      script = existingScript;
      if (window.turnstile) renderWidget();
      else script.addEventListener("load", renderWidget);
    } else {
      script = document.createElement("script");
      script.id = turnstileScriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", renderWidget);
      if (turnstileWidgetRef.current !== undefined) {
        window.turnstile?.remove?.(turnstileWidgetRef.current);
        turnstileWidgetRef.current = undefined;
      }
      if (
        script &&
        script.id === turnstileScriptId &&
        document.querySelectorAll(".cf-turnstile").length === 0
      ) {
        script.remove();
      }
    };
  }, [resetTurnstile]);

  const contactMethods = [
    socialLinks.github
      ? { label: "GitHub", value: "@URANOOB", href: socialLinks.github, Icon: FaGithub }
      : null,
    socialLinks.linkedin
      ? { label: "LinkedIn", value: "LinkedIn", href: socialLinks.linkedin, Icon: FaLinkedin }
      : null,
    socialLinks.email
      ? {
          label: language === "es" ? "Correo" : "Email",
          value: socialLinks.email.replace("mailto:", ""),
          href: socialLinks.email,
          Icon: Mail,
        }
      : null,
    socialLinks.phone
      ? {
          label: language === "es" ? "Teléfono" : "Phone",
          value: socialLinks.phone,
          href: `tel:${socialLinks.phone}`,
          Icon: Phone,
        }
      : null,
  ];

  const update = (field: keyof ContactPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const validation = validateContactPayload(form);
    if (!validation.valid) {
      const translatedErrors = Object.fromEntries(
        Object.keys(validation.errors).map((field) => [
          field,
          formErrors[language][field as keyof typeof formErrors.es],
        ]),
      ) as Partial<Record<keyof ContactPayload, string>>;
      setErrors(translatedErrors);
      return;
    }
    if (turnstileEnabled && !turnstileToken) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serializeContactPayload(form, turnstileToken, turnstileEnabled)),
      });
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? language === "es"
              ? "Inténtalo de nuevo más tarde."
              : "Please try again later."
            : language === "es"
              ? "No fue posible enviar el mensaje."
              : "Your message could not be sent.",
        );
      }
      setStatus("success");
      setStatusMessage(
        language === "es" ? "Mensaje enviado. Gracias por escribir." : "Message sent. Thanks for writing.",
      );
      setForm(emptyForm);
      if (turnstileEnabled) resetTurnstile();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Your message could not be sent.");
      if (turnstileEnabled) resetTurnstile();
    }
  };

  return (
    <div className="contact-app app-scroll">
      <section className="contact-intro">
        <p className="section-kicker">{language === "es" ? "NUEVO MENSAJE" : "NEW MESSAGE"}</p>
        <h2>{language === "es" ? "Construyamos algo útil." : "Let's build something useful."}</h2>
        <p>
          {language === "es"
            ? "Cuéntame el contexto, el reto y qué resultado buscas. Responderé con próximos pasos claros."
            : "Tell me the context, the challenge, and what outcome you are looking for. I will reply with clear next steps."}
        </p>
        <div>
          <ShieldCheck size={18} />
          <span>
            {language === "es"
              ? "El formulario valida tus datos y solo los utiliza para responder este mensaje."
              : "The form validates your data and only uses it to reply to this message."}
          </span>
        </div>
        <nav
          className="contact-methods"
          aria-label={language === "es" ? "Canales de contacto" : "Contact channels"}
        >
          {contactMethods.map((method) => {
            if (!method) return null;
            const { label, value, href, Icon } = method;
            return (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <Icon size={16} aria-hidden="true" />
                <span>
                  <strong>{label}</strong>
                  {value}
                </span>
              </a>
            );
          })}
        </nav>
      </section>
      <form onSubmit={submit} noValidate className="contact-form">
        <div className="form-grid">
          <Field label={language === "es" ? "Nombre" : "Name"} id="contact-name" error={errors.name}>
            <input
              id="contact-name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              autoComplete="name"
              maxLength={contactFieldLimits.name}
            />
          </Field>
          <Field label={language === "es" ? "Correo" : "Email"} id="contact-email" error={errors.email}>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              autoComplete="email"
              maxLength={contactFieldLimits.email}
            />
          </Field>
        </div>
        <Field label={language === "es" ? "Empresa (opcional)" : "Company (optional)"} id="contact-company">
          <input
            id="contact-company"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
            maxLength={contactFieldLimits.company}
          />
        </Field>
        <Field label={language === "es" ? "Asunto" : "Subject"} id="contact-subject" error={errors.subject}>
          <input
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
            maxLength={contactFieldLimits.subject}
          />
        </Field>
        <Field label={language === "es" ? "Mensaje" : "Message"} id="contact-message" error={errors.message}>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            maxLength={contactFieldLimits.message}
          />
        </Field>
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website ?? ""}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
        {turnstileEnabled ? (
          <div
            ref={turnstileContainerRef}
            aria-label={language === "es" ? "Verificación anti-bots" : "Bot verification"}
          />
        ) : null}
        <div className="form-submit-row">
          <p aria-live="polite" className={`form-status ${status}`}>
            {status === "success" ? <CheckCircle2 size={16} /> : null}
            {statusMessage}
          </p>
          <button
            className="primary-action"
            disabled={status === "loading" || (turnstileEnabled && !turnstileToken)}
          >
            {status === "loading" ? <LoaderCircle className="spin" size={17} /> : <Send size={17} />}{" "}
            {status === "loading"
              ? language === "es"
                ? "Enviando"
                : "Sending"
              : language === "es"
                ? "Enviar mensaje"
                : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field" htmlFor={id}>
      <span>{label}</span>
      {children}
      {error ? <small role="alert">{error}</small> : null}
    </label>
  );
}
