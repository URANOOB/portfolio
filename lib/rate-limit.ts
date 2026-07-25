const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 10 * 60;
const MAX_LOCAL_ENTRIES = 10_000;

type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

type UpstashResponse = {
  result?: unknown;
  error?: string;
};

type LocalEntry = { count: number; resetAt: number };

const localAttempts = new Map<string, LocalEntry>();

function localRateLimit(key: string, now = Date.now()): RateLimitResult {
  for (const [entryKey, entry] of localAttempts) {
    if (entry.resetAt <= now) localAttempts.delete(entryKey);
  }

  while (localAttempts.size >= MAX_LOCAL_ENTRIES) {
    const oldestKey = localAttempts.keys().next().value;
    if (!oldestKey) break;
    localAttempts.delete(oldestKey);
  }

  const current = localAttempts.get(key);
  const entry =
    current && current.resetAt > now
      ? { ...current, count: current.count + 1 }
      : { count: 1, resetAt: now + RATE_WINDOW_SECONDS * 1_000 };
  localAttempts.set(key, entry);

  return {
    allowed: entry.count <= RATE_LIMIT,
    retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
  };
}

function upstashIsConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function upstashRateLimit(key: string): Promise<RateLimitResult | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const script =
    "local count = redis.call('INCR', KEYS[1]); if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return {count, redis.call('TTL', KEYS[1])}";

  try {
    const endpoint = url.replace(/\/$/, "");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", script, 1, key, RATE_WINDOW_SECONDS]),
      signal: AbortSignal.timeout(2_500),
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as UpstashResponse;
    if (
      payload.error ||
      !Array.isArray(payload.result) ||
      typeof payload.result[0] !== "number" ||
      typeof payload.result[1] !== "number" ||
      !Number.isFinite(payload.result[0]) ||
      !Number.isFinite(payload.result[1]) ||
      payload.result[0] < 0 ||
      payload.result[1] <= 0
    ) {
      return null;
    }

    const [count, ttl] = payload.result;
    return {
      allowed: count <= RATE_LIMIT,
      retryAfter: Math.ceil(ttl),
    };
  } catch {
    return null;
  }
}

/** Uses Upstash Redis when configured; local memory keeps development usable. */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const key = `rcoon:contact:${ip}`;
  if (upstashIsConfigured()) {
    const distributedResult = await upstashRateLimit(key);
    if (distributedResult) return distributedResult;
  }
  return localRateLimit(key);
}

export const rateLimitConfig = { limit: RATE_LIMIT, windowSeconds: RATE_WINDOW_SECONDS } as const;

export function resetLocalRateLimitForTests() {
  localAttempts.clear();
}
