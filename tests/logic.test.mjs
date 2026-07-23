import assert from "node:assert/strict";
import test from "node:test";
import { runPortfolioCommand } from "../lib/terminal.ts";
import { validateContactPayload } from "../lib/validation.ts";

test("terminal accepts only known portfolio commands", () => {
  assert.equal(runPortfolioCommand("open atlas-splitter").action?.appId, "projects");
  assert.equal(runPortfolioCommand("education").action?.appId, "resume");
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
