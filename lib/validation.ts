export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}

export const contactFieldLimits = {
  name: 100,
  email: 254,
  company: 120,
  subject: 160,
  message: 4_000,
} as const;

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
    name: clean(payload.name, contactFieldLimits.name),
    email: clean(payload.email, contactFieldLimits.email).toLowerCase(),
    company: clean(payload.company, contactFieldLimits.company),
    subject: clean(payload.subject, contactFieldLimits.subject),
    message: clean(payload.message, contactFieldLimits.message),
    website: clean(payload.website, 200),
    turnstileToken: clean(payload.turnstileToken, 2_048),
  };
}

export function validateContactPayload(payload: Partial<ContactPayload>) {
  const normalized = normalizeContactPayload(payload);
  const errors: Partial<Record<keyof ContactPayload, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const exceeds = (value: unknown, limit: number) => typeof value === "string" && value.length > limit;

  if (exceeds(payload.name, contactFieldLimits.name) || !normalized.name || normalized.name.length < 2) {
    errors.name = "Escribe tu nombre.";
  }
  if (exceeds(payload.email, contactFieldLimits.email) || !emailPattern.test(normalized.email)) {
    errors.email = "Escribe un correo válido.";
  }
  if (
    exceeds(payload.subject, contactFieldLimits.subject) ||
    !normalized.subject ||
    normalized.subject.length < 3
  ) {
    errors.subject = "Cuéntame brevemente el motivo.";
  }
  if (
    exceeds(payload.message, contactFieldLimits.message) ||
    !normalized.message ||
    normalized.message.length < 20
  ) {
    errors.message = "El mensaje debe tener al menos 20 caracteres.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function serializeContactPayload(
  form: ContactPayload,
  turnstileToken: string,
  turnstileEnabled: boolean,
) {
  return { ...form, ...(turnstileEnabled ? { turnstileToken } : {}) };
}
