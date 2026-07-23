import { NextResponse } from "next/server";
import { normalizeContactPayload, validateContactPayload, type ContactPayload } from "@/lib/validation";

const attempts = new Map<string, number[]>();
const rateWindowMs = 10 * 60 * 1_000;
const rateLimit = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < rateWindowMs);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > rateLimit;
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ message: "La solicitud no tiene un formato válido." }, { status: 400 });
  }

  const normalized = normalizeContactPayload(payload);
  const validation = validateContactPayload(normalized);
  if (!validation.valid) {
    return NextResponse.json(
      { message: "Revisa los campos del formulario.", errors: validation.errors },
      { status: 422 },
    );
  }
  if (validation.valid && normalized.website) {
    return NextResponse.json({ message: "Mensaje enviado. Gracias por escribir." });
  }
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(ip))
    return NextResponse.json({ message: "Inténtalo de nuevo más tarde." }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    const token = normalized.turnstileToken;
    if (!token) return NextResponse.json({ message: "No fue posible validar el envío." }, { status: 400 });
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8_000),
    }).catch(() => null);
    if (!verification?.ok || !((await verification.json()) as { success?: boolean }).success) {
      return NextResponse.json({ message: "No fue posible validar el envío." }, { status: 400 });
    }
  }

  if (!apiKey || !contactEmail || !fromEmail) {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        message: "Mensaje validado en modo local. Configura Resend para realizar la entrega.",
      });
    }
    return NextResponse.json(
      { message: "El canal de correo está temporalmente sin configurar." },
      { status: 503 },
    );
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

  if (!response?.ok) {
    return NextResponse.json(
      { message: "El proveedor de correo no pudo entregar el mensaje." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Mensaje enviado. Gracias por escribir." });
}
