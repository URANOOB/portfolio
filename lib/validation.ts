export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}

const limits = { name: 100, email: 254, company: 120, subject: 160, message: 4_000 };

export function normalizeContactPayload(payload: Partial<ContactPayload>): ContactPayload {
  const clean = (value: unknown, max: number) =>
    typeof value === "string"
      ? value
          .replace(/[\u0000-\u001F\u007F]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, max)
      : "";
  return {
    name: clean(payload.name, limits.name),
    email: clean(payload.email, limits.email).toLowerCase(),
    company: clean(payload.company, limits.company),
    subject: clean(payload.subject, limits.subject),
    message: clean(payload.message, limits.message),
    website: clean(payload.website, 200),
    turnstileToken: clean(payload.turnstileToken, 2_048),
  };
}

export function validateContactPayload(payload: Partial<ContactPayload>) {
  payload = normalizeContactPayload(payload);
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.name?.trim() || payload.name.trim().length < 2) {
    errors.name = "Escribe tu nombre.";
  }
  if (!payload.email?.trim() || !emailPattern.test(payload.email)) {
    errors.email = "Escribe un correo válido.";
  }
  if (!payload.subject?.trim() || payload.subject.trim().length < 3) {
    errors.subject = "Cuéntame brevemente el motivo.";
  }
  if (!payload.message?.trim() || payload.message.trim().length < 20) {
    errors.message = "El mensaje debe tener al menos 20 caracteres.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
