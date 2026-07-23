import assert from "node:assert/strict";
import test from "node:test";
import { runPortfolioCommand } from "../lib/terminal.ts";
import { contactFieldLimits, serializeContactPayload, validateContactPayload } from "../lib/validation.ts";
import { bootDelayMs, getBootDelay, isBootDismissalKey } from "../lib/boot.ts";
import { createInitialWindows } from "../lib/window-state.ts";

test("terminal accepts only known portfolio commands", () => {
  assert.equal(runPortfolioCommand("open atlas-splitter").action?.appId, "projects");
  assert.equal(runPortfolioCommand("education").action?.appId, "resume");
  assert.equal(runPortfolioCommand("github").action?.href, "https://github.com/URANOOB");
  assert.match(runPortfolioCommand("rm -rf /").lines.join(" "), /no reconocido/i);
  assert.equal(runPortfolioCommand("clear").action?.type, "clear");
});

test("contact validation rejects malformed payloads", () => {
  const invalid = validateContactPayload({
    name: "W",
    email: "not-an-email",
    subject: "Hi",
    message: "short",
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);
});

test("contact validation accepts a complete message", () => {
  const valid = validateContactPayload({
    name: "Ada Lovelace",
    email: "ada@example.com",
    company: "Analytical Engines",
    subject: "Proyecto web",
    message: "Quisiera conversar sobre una plataforma para nuestro equipo.",
  });
  assert.equal(valid.valid, true);
});

test("contact validation enforces maximum field lengths", () => {
  const invalid = validateContactPayload({
    name: "A".repeat(contactFieldLimits.name + 1),
    email: "ada@example.com",
    subject: "Proyecto web",
    message: "Quisiera conversar sobre una plataforma para nuestro equipo.",
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
});

test("contact payload includes a Turnstile token only when enabled", () => {
  const form = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    subject: "Proyecto",
    message: "Quisiera conversar sobre una plataforma para nuestro equipo.",
  };
  assert.deepEqual(serializeContactPayload(form, "token", false), form);
  assert.equal(serializeContactPayload(form, "token", true).turnstileToken, "token");
});

test("boot timing and dismissal keys respect session and motion preferences", () => {
  assert.equal(getBootDelay(false, false), bootDelayMs);
  assert.equal(getBootDelay(true, false), 0);
  assert.equal(getBootDelay(false, true), 0);
  assert.equal(isBootDismissalKey("Enter"), true);
  assert.equal(isBootDismissalKey("Escape"), true);
  assert.equal(isBootDismissalKey("x"), false);
});

test("only the about window starts open", () => {
  const windows = createInitialWindows();
  assert.deepEqual(
    Object.values(windows)
      .filter((window) => window.isOpen)
      .map((window) => window.id),
    ["about"],
  );
  assert.equal(windows.experience.isOpen, false);
  assert.equal(windows.help.isOpen, false);
  windows.about.isOpen = false;
  assert.equal(windows.about.isOpen, false);
});
