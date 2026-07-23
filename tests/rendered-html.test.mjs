import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Urano desktop with portfolio content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /William Galeano/);
  assert.match(html, /Software Developer/);
  assert.match(html, /Urano/);
  assert.match(html, /Arrastra para mover/);
  assert.doesNotMatch(html, /Explorador/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});

test("server-renders shareable project pages", async () => {
  const response = await render("/projects/atlas-splitter");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Atlas Splitter/);
  assert.match(html, /Retos técnicos/);
});
