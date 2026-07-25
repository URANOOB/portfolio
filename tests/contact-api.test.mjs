import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/contact/route.ts";
import { resetLocalRateLimitForTests } from "../lib/rate-limit.ts";
import { checkRateLimit, rateLimitConfig } from "../lib/rate-limit.ts";

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

test("Upstash uses the REST root endpoint and the EVAL command payload", async () => {
  resetLocalRateLimitForTests();
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), options });
    return new Response(JSON.stringify({ result: [3, 420] }), { status: 200 });
  };
  try {
    await withEnvironment(
      {
        UPSTASH_REDIS_REST_URL: "https://example.upstash.io/",
        UPSTASH_REDIS_REST_TOKEN: "test-token",
      },
      async () => {
        assert.deepEqual(await checkRateLimit("203.0.113.30"), { allowed: true, retryAfter: 420 });
      },
    );
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://example.upstash.io");
    assert.equal(calls[0].options.headers.Authorization, "Bearer test-token");
    const [command, script, keyCount, key, windowSeconds] = JSON.parse(calls[0].options.body);
    assert.equal(command, "EVAL");
    assert.match(script, /INCR/);
    assert.equal(keyCount, 1);
    assert.equal(key, "rcoon:contact:203.0.113.30");
    assert.equal(windowSeconds, rateLimitConfig.windowSeconds);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a distributed Upstash limit returns 429 with Retry-After", async () => {
  resetLocalRateLimitForTests();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ result: [6, 300] }), { status: 200 });
  try {
    const response = await withEnvironment(
      {
        UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
        UPSTASH_REDIS_REST_TOKEN: "test-token",
        TURNSTILE_SECRET_KEY: undefined,
        RESEND_API_KEY: undefined,
        CONTACT_EMAIL: undefined,
        CONTACT_FROM_EMAIL: undefined,
      },
      () => POST(request(validPayload, "203.0.113.31")),
    );
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("Retry-After"), "300");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("invalid Upstash payloads and transport failures keep the local fallback available", async () => {
  const originalFetch = globalThis.fetch;
  const responses = [
    () => new Response(JSON.stringify({ result: null }), { status: 200 }),
    () => new Response(JSON.stringify({ error: "invalid command" }), { status: 200 }),
    () => Promise.reject(new DOMException("Timeout", "TimeoutError")),
    () => new Response("unavailable", { status: 503 }),
  ];
  try {
    await withEnvironment(
      {
        UPSTASH_REDIS_REST_URL: "https://example.upstash.io",
        UPSTASH_REDIS_REST_TOKEN: "test-token",
      },
      async () => {
        for (const [index, response] of responses.entries()) {
          resetLocalRateLimitForTests();
          globalThis.fetch = response;
          assert.deepEqual(await checkRateLimit(`203.0.113.${40 + index}`), {
            allowed: true,
            retryAfter: rateLimitConfig.windowSeconds,
          });
        }
      },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
