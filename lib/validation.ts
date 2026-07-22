export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export function validateContactPayload(payload: Partial<ContactPayload>) {
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
