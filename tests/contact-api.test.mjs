import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/contact/route.ts";
import { resetLocalRateLimitForTests } from "../lib/rate-limit.ts";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  subject: "Proyecto web",
  message: "Quisiera conversar sobre una plataforma para nuestro equipo.",
};

function request(payload, ip = "203.0.113.20") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(payload),
  });
}

function withEnvironment(values, run) {
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  });
  return Promise.resolve(run()).finally(() => {
    Object.entries(previous).forEach(([key, value]) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    });
  });
}

test("honeypot avoids Turnstile and Resend", async () => {
  resetLocalRateLimitForTests();
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  };
  try {
    const response = await withEnvironment(
      {
        TURNSTILE_SECRET_KEY: "secret",
        RESEND_API_KEY: "key",
        CONTACT_EMAIL: "owner@example.com",
        CONTACT_FROM_EMAIL: "Sender <sender@example.com>",
      },
      () => POST(request({ ...validPayload, website: "https://bot.example" })),
    );
    assert.equal(response.status, 200);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("contact endpoint works without Turnstile keys", async () => {
  resetLocalRateLimitForTests();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
  try {
    const response = await withEnvironment(
      {
        TURNSTILE_SECRET_KEY: undefined,
        RESEND_API_KEY: "key",
        CONTACT_EMAIL: "owner@example.com",
        CONTACT_FROM_EMAIL: "Sender <sender@example.com>",
      },
      () => POST(request(validPayload, "203.0.113.21")),
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Turnstile rejects empty and invalid tokens and accepts a valid token", async () => {
  resetLocalRateLimitForTests();
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).includes("turnstile"))
      return new Response(JSON.stringify({ success: calls.length > 1 }), { status: 200 });
    return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
  };
  try {
    await withEnvironment(
      {
        TURNSTILE_SECRET_KEY: "secret",
        RESEND_API_KEY: "key",
        CONTACT_EMAIL: "owner@example.com",
        CONTACT_FROM_EMAIL: "Sender <sender@example.com>",
      },
      async () => {
        assert.equal((await POST(request(validPayload, "203.0.113.22"))).status, 400);
        assert.equal(
          (await POST(request({ ...validPayload, turnstileToken: "invalid" }, "203.0.113.23"))).status,
          400,
        );
        assert.equal(
          (await POST(request({ ...validPayload, turnstileToken: "valid" }, "203.0.113.24"))).status,
          200,
        );
      },
    );
    assert.equal(calls.filter((url) => url.includes("turnstile")).length, 2);
    assert.equal(calls.filter((url) => url.includes("resend")).length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rate limit returns 429 and Retry-After after five attempts", async () => {
  resetLocalRateLimitForTests();
  await withEnvironment(
    {
      TURNSTILE_SECRET_KEY: undefined,
      RESEND_API_KEY: undefined,
      CONTACT_EMAIL: undefined,
      CONTACT_FROM_EMAIL: undefined,
    },
    async () => {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        assert.equal((await POST(request(validPayload, "203.0.113.25"))).status, 200);
      }
      const blocked = await POST(request(validPayload, "203.0.113.25"));
      assert.equal(blocked.status, 429);
      assert.ok(Number(blocked.headers.get("Retry-After")) > 0);
    },
  );
});
