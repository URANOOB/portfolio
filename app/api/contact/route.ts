import { NextResponse } from "next/server";
import { validateContactPayload, type ContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ message: "La solicitud no tiene un formato válido." }, { status: 400 });
  }

  const validation = validateContactPayload(payload);
  if (!validation.valid) {
    return NextResponse.json(
      { message: "Revisa los campos del formulario.", errors: validation.errors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

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
      reply_to: payload.email,
      subject: `[Portafolio] ${payload.subject}`,
      text: `Nombre: ${payload.name}\nCorreo: ${payload.email}\nEmpresa: ${payload.company || "No indicada"}\n\n${payload.message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "El proveedor de correo no pudo entregar el mensaje." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Mensaje enviado. Gracias por escribir." });
}
