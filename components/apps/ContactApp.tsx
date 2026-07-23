"use client";

import { CheckCircle2, LoaderCircle, Mail, Phone, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { validateContactPayload, type ContactPayload } from "@/lib/validation";
import { socialLinks } from "@/data/profile";
import { usePreferencesStore } from "@/store/preferences-store";

const emptyForm: ContactPayload = { name: "", email: "", company: "", subject: "", message: "" };

export function ContactApp() {
  const language = usePreferencesStore((state) => state.language);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
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
      setErrors(validation.errors);
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "No fue posible enviar el mensaje.");
      setStatus("success");
      setStatusMessage(data.message ?? "Mensaje enviado correctamente.");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "No fue posible enviar el mensaje.");
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
            />
          </Field>
          <Field label={language === "es" ? "Correo" : "Email"} id="contact-email" error={errors.email}>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              autoComplete="email"
            />
          </Field>
        </div>
        <Field label={language === "es" ? "Empresa (opcional)" : "Company (optional)"} id="contact-company">
          <input
            id="contact-company"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label={language === "es" ? "Asunto" : "Subject"} id="contact-subject" error={errors.subject}>
          <input
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
          />
        </Field>
        <Field label={language === "es" ? "Mensaje" : "Message"} id="contact-message" error={errors.message}>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
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
        <div className="form-submit-row">
          <p aria-live="polite" className={`form-status ${status}`}>
            {status === "success" ? <CheckCircle2 size={16} /> : null}
            {statusMessage}
          </p>
          <button className="primary-action" disabled={status === "loading"}>
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
