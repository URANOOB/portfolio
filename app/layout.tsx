import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./bento.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
async function getRequestOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getRequestOrigin();
  const socialImage = `${origin}/og.png`;
  return {
    metadataBase: new URL(origin),
    title: { default: "William Galeano — R/COON Porfolio", template: "%s · William Galeano" },
    description:
      "Portafolio de William Galeano, Software Developer y Senior Logistics Coordinator en Bogotá.",
    keywords: ["William Galeano", "Software Developer", "Logística", "Next.js", "Bogotá"],
    authors: [{ name: "William Galeano" }],
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: "William Galeano — R/COON Porfolio",
      title: "William Galeano — R/COON Porfolio",
      description:
        "Tecnología, logística internacional y productos digitales en una experiencia interactiva.",
      images: [{ url: socialImage, width: 1734, height: 908, alt: "William Galeano — Software y logística" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "William Galeano — R/COON Porfolio",
      description:
        "Tecnología, logística internacional y productos digitales en una experiencia interactiva.",
      images: [socialImage],
    },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070a12" },
    { media: "(prefers-color-scheme: light)", color: "#e9edf4" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = await getRequestOrigin();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "William Galeano",
    jobTitle: ["Software Developer", "Senior Logistics Coordinator"],
    address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
    knowsLanguage: ["Spanish", "English"],
    url: siteUrl,
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
