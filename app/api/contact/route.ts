import { checkRateLimit } from "../../../lib/rate-limit.ts";
import {
  normalizeContactPayload,
  validateContactPayload,
  type ContactPayload,
} from "../../../lib/validation.ts";

type TurnstileVerification = { success?: boolean };

function contactResponse(message: string, status = 200, headers?: HeadersInit) {
  return Response.json({ message }, { status, headers });
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return contactResponse("La solicitud no tiene un formato válido.", 400);
  }

  const validation = validateContactPayload(payload);
  if (!validation.valid) {
    return Response.json(
      { message: "Revisa los campos del formulario.", errors: validation.errors },
      { status: 422 },
    );
  }
  const normalized = normalizeContactPayload(payload);

  // Bots filling this hidden field get a successful response without using any external service.
  if (normalized.website) return contactResponse("Mensaje enviado. Gracias por escribir.");

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const rateLimit = await checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return contactResponse("Inténtalo de nuevo más tarde.", 429, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    const token = normalized.turnstileToken;
    if (!token) return contactResponse("No fue posible validar el envío.", 400);

    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: token,
        ...(ip !== "unknown" ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    }).catch(() => null);

    let turnstile: TurnstileVerification | null = null;
    try {
      turnstile = verification?.ok ? ((await verification.json()) as TurnstileVerification) : null;
    } catch {
      turnstile = null;
    }
    if (!turnstile?.success) return contactResponse("No fue posible validar el envío.", 400);
  }

  if (!apiKey || !contactEmail || !fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      return contactResponse("Mensaje validado en modo local. Configura Resend para realizar la entrega.");
    }
    return contactResponse("El canal de correo está temporalmente sin configurar.", 503);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromEmail,
      to: [contactEmail],
      reply_to: normalized.email,
      subject: `[R/COON OS] ${normalized.subject}`,
      text: `Nombre: ${normalized.name}\nCorreo: ${normalized.email}\nEmpresa: ${normalized.company || "No indicada"}\n\n${normalized.message}`,
    }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!response?.ok) return contactResponse("El proveedor de correo no pudo entregar el mensaje.", 502);

  return contactResponse("Mensaje enviado. Gracias por escribir.");
}
