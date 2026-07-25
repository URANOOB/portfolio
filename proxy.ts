import { NextResponse, type NextRequest } from "next/server";
import { languageCookieName, getLanguage } from "@/lib/language";

function withLanguageCookie(cookieHeader: string | null, language: string) {
  const cookie = `${languageCookieName}=${language}`;
  if (!cookieHeader) return cookie;

  const filtered = cookieHeader
    .split(";")
    .map((entry) => entry.trim())
    .filter((entry) => !entry.startsWith(`${languageCookieName}=`));
  return [...filtered, cookie].join("; ");
}

export function proxy(request: NextRequest) {
  const languageParameter = request.nextUrl.searchParams.get("lang");
  if (languageParameter !== "es" && languageParameter !== "en") return NextResponse.next();

  const language = getLanguage(languageParameter);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("cookie", withLanguageCookie(requestHeaders.get("cookie"), language));

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.cookies.set(languageCookieName, language, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
