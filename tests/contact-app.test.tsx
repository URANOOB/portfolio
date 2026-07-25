import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { TurnstileRenderOptions } from "@/components/apps/ContactApp";

type TurnstileMock = {
  render: ReturnType<typeof vi.fn>;
  reset: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
};

async function renderContact(turnstileSiteKey?: string, language: "es" | "en" = "es") {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", turnstileSiteKey ?? "");
  const { usePreferencesStore } = await import("@/store/preferences-store");
  usePreferencesStore.setState({ language });
  const { ContactApp } = await import("@/components/apps/ContactApp");
  return render(<ContactApp />);
}

function installTurnstile(): TurnstileMock {
  const api: TurnstileMock = {
    render: vi.fn(() => "widget-1"),
    reset: vi.fn(),
    remove: vi.fn(),
  };
  Object.defineProperty(window, "turnstile", { configurable: true, value: api, writable: true });
  return api;
}

function getScript() {
  const script = document.getElementById("cloudflare-turnstile-script");
  if (!(script instanceof HTMLScriptElement)) throw new Error("Turnstile script was not added.");
  return script;
}

function renderOptions(api: TurnstileMock): TurnstileRenderOptions {
  const options = api.render.mock.calls.at(-1)?.[1];
  if (!options) throw new Error("Turnstile widget was not rendered.");
  return options as TurnstileRenderOptions;
}

async function fillValidForm(language: "es" | "en" = "es") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(language === "es" ? "Nombre" : "Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText(language === "es" ? "Correo" : "Email"), "ada@example.com");
  await user.type(screen.getByLabelText(language === "es" ? "Asunto" : "Subject"), "Proyecto web");
  await user.type(
    screen.getByLabelText(language === "es" ? "Mensaje" : "Message"),
    "Quisiera conversar sobre una plataforma para nuestro equipo.",
  );
  return user;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactApp without Turnstile", () => {
  it("submits a localized Spanish form without external scripts or tokens", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    await renderContact();

    expect(document.getElementById("cloudflare-turnstile-script")).toBeNull();
    expect(screen.getByRole("heading", { name: "Construyamos algo útil." })).toBeVisible();
    expect(screen.getByLabelText("Nombre")).toHaveAttribute("maxlength", "100");
    expect(screen.getByLabelText("Mensaje")).toHaveAttribute("maxlength", "4000");
    expect(screen.getByLabelText("Website")).toHaveAttribute("tabindex", "-1");

    const user = await fillValidForm();
    const submit = screen.getByRole("button", { name: "Enviar mensaje" });
    expect(submit).toBeEnabled();
    await user.click(submit);

    await waitFor(() => expect(screen.getByText("Mensaje enviado. Gracias por escribir.")).toBeVisible());
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        body: expect.not.stringContaining("turnstileToken"),
        method: "POST",
      }),
    );
    expect(screen.getByLabelText("Nombre")).toHaveValue("");
    expect(screen.getByLabelText("Mensaje")).toHaveValue("");
  });

  it("uses English labels when the language preference is English", async () => {
    await renderContact(undefined, "en");
    expect(screen.getByRole("heading", { name: "Let's build something useful." })).toBeVisible();
    expect(screen.getByLabelText("Name")).toBeVisible();
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });
});

describe("ContactApp with Turnstile", () => {
  it("loads one explicit script, renders the widget, and submits its token", async () => {
    const api = installTurnstile();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    await renderContact("test-site-key");

    expect(screen.getByText("Cargando verificación de seguridad…")).toBeVisible();
    const script = getScript();
    expect(script.src).toBe("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit");
    fireEvent.load(script);
    const options = renderOptions(api);
    expect(options.sitekey).toBe("test-site-key");

    const user = await fillValidForm();
    const submit = screen.getByRole("button", { name: "Enviar mensaje" });
    expect(submit).toBeDisabled();
    options.callback("valid-token");
    await waitFor(() => expect(submit).toBeEnabled());
    await user.click(submit);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock.mock.calls[0]?.[1]?.body).toContain("valid-token");
    expect(api.reset).toHaveBeenCalledWith("widget-1");
    expect(submit).toBeDisabled();
    options.callback("new-token");
    await waitFor(() => expect(submit).toBeEnabled());
    expect(document.querySelectorAll("#cloudflare-turnstile-script")).toHaveLength(1);
  });

  it("resets to ready after a contact delivery error", async () => {
    const api = installTurnstile();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal("fetch", fetchMock);
    await renderContact("test-site-key");
    fireEvent.load(getScript());
    const options = renderOptions(api);
    const user = await fillValidForm();
    options.callback("valid-token");
    const submit = screen.getByRole("button", { name: "Enviar mensaje" });
    await waitFor(() => expect(submit).toBeEnabled());
    await user.click(submit);

    await waitFor(() => expect(screen.getByText("No fue posible enviar el mensaje.")).toBeVisible());
    expect(api.reset).toHaveBeenCalledWith("widget-1");
    expect(submit).toBeDisabled();
    options.callback("new-token");
    await waitFor(() => expect(submit).toBeEnabled());
  });

  it("shows an accessible recovery state when the script fails", async () => {
    await renderContact("test-site-key");
    fireEvent.error(getScript());
    expect(await screen.findByRole("alert")).toHaveTextContent("No fue posible cargar la verificación");
    expect(screen.getByRole("button", { name: "Reintentar verificación" })).toBeVisible();
    expect(screen.getByRole("link", { name: /Correo/i })).toBeVisible();
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeDisabled();
  });

  it("leaves loading after ten seconds when the script never becomes ready", async () => {
    vi.useFakeTimers();
    await renderContact("test-site-key");
    await act(async () => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByRole("alert")).toHaveTextContent("No fue posible cargar la verificación");
  });

  it("handles widget errors and timeouts without allowing submission", async () => {
    const api = installTurnstile();
    await renderContact("test-site-key");
    fireEvent.load(getScript());
    const options = renderOptions(api);

    expect(options["error-callback"]?.()).toBe(true);
    expect(await screen.findByRole("alert")).toBeVisible();
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeDisabled();
    expect(options["timeout-callback"]?.()).toBe(true);
  });

  it("resets an expired widget and requires a new token", async () => {
    const api = installTurnstile();
    await renderContact("test-site-key");
    fireEvent.load(getScript());
    const options = renderOptions(api);
    const user = await fillValidForm();
    options.callback("valid-token");
    const submit = screen.getByRole("button", { name: "Enviar mensaje" });
    await waitFor(() => expect(submit).toBeEnabled());

    options["expired-callback"]?.();
    expect(api.reset).toHaveBeenCalledWith("widget-1");
    await waitFor(() => expect(submit).toBeDisabled());
    options.callback("new-token");
    await waitFor(() => expect(submit).toBeEnabled());
    await user.tab();
    expect(document.activeElement).not.toHaveAttribute("id", "contact-website");
  });

  it("retries with one fresh widget and no duplicate script", async () => {
    const api = installTurnstile();
    await renderContact("test-site-key");
    fireEvent.load(getScript());
    const firstOptions = renderOptions(api);
    firstOptions["error-callback"]?.();
    const user = userEvent.setup();
    await user.click(await screen.findByRole("button", { name: "Reintentar verificación" }));

    fireEvent.load(getScript());
    await waitFor(() => expect(api.render).toHaveBeenCalledTimes(2));
    expect(api.remove).toHaveBeenCalled();
    expect(document.querySelectorAll("#cloudflare-turnstile-script")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Enviar mensaje" })).toBeDisabled();
  });

  it("cleans listeners, timers, widgets, and scripts when unmounted", async () => {
    vi.useFakeTimers();
    const api = installTurnstile();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const view = await renderContact("test-site-key");
    const script = getScript();
    const removeListener = vi.spyOn(script, "removeEventListener");
    fireEvent.load(script);
    view.unmount();
    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(consoleError).not.toHaveBeenCalled();
    expect(removeListener).toHaveBeenCalledWith("load", expect.any(Function));
    expect(removeListener).toHaveBeenCalledWith("error", expect.any(Function));
    expect(api.remove).toHaveBeenCalledWith("widget-1");
    expect(document.getElementById("cloudflare-turnstile-script")).toBeNull();
  });
});
