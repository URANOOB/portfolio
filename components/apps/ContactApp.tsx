"use client";

import { CheckCircle2, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { validateContactPayload, type ContactPayload } from "@/lib/validation";

const emptyForm: ContactPayload = { name: "", email: "", company: "", subject: "", message: "" };

export function ContactApp() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

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
        <p className="section-kicker">NUEVO MENSAJE</p>
        <h2>Construyamos algo útil.</h2>
        <p>Cuéntame el contexto, el reto y qué resultado buscas. Responderé con próximos pasos claros.</p>
        <div>
          <ShieldCheck size={18} />
          <span>El formulario valida tus datos y solo los utiliza para responder este mensaje.</span>
        </div>
      </section>
      <form onSubmit={submit} noValidate className="contact-form">
        <div className="form-grid">
          <Field label="Nombre" id="contact-name" error={errors.name}>
            <input
              id="contact-name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              autoComplete="name"
            />
          </Field>
          <Field label="Correo" id="contact-email" error={errors.email}>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              autoComplete="email"
            />
          </Field>
        </div>
        <Field label="Empresa (opcional)" id="contact-company">
          <input
            id="contact-company"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
          />
        </Field>
        <Field label="Asunto" id="contact-subject" error={errors.subject}>
          <input
            id="contact-subject"
            value={form.subject}
            onChange={(event) => update("subject", event.target.value)}
          />
        </Field>
        <Field label="Mensaje" id="contact-message" error={errors.message}>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
          />
        </Field>
        <div className="form-submit-row">
          <p aria-live="polite" className={`form-status ${status}`}>
            {status === "success" ? <CheckCircle2 size={16} /> : null}
            {statusMessage}
          </p>
          <button className="primary-action" disabled={status === "loading"}>
            {status === "loading" ? <LoaderCircle className="spin" size={17} /> : <Send size={17} />}{" "}
            {status === "loading" ? "Enviando" : "Enviar mensaje"}
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
