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

test("server-renders the R/COON desktop with portfolio content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /William Galeano/);
  assert.match(html, /Software Developer/);
  assert.match(html, /R\/COON OS/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/william-eduardo-galeano-ramirez-861549368\//);
  assert.match(html, /Arrastra para mover/);
  assert.doesNotMatch(html, /Explorador/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
  assert.doesNotMatch(html, /Porfolio/);
  assert.doesNotMatch(html, /Captura pendiente/);
  assert.doesNotMatch(html, /Missing capture/);
  assert.doesNotMatch(html, /Fechas por confirmar/);
  assert.doesNotMatch(html, /La información académica detallada/);
  assert.doesNotMatch(html, /Las certificaciones se publicarán/);
});

test("server-renders shareable project pages", async () => {
  const response = await render("/projects/atlas-splitter");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Atlas Splitter/);
  assert.match(html, /Retos técnicos/);
  assert.match(html, /Volver a R\/COON OS/);
  assert.match(html, /https:\/\/github\.com\/URANOOB\/atlas-splitter/);
});

test("shareable project pages render their English copy consistently", async () => {
  const response = await render("/projects/atlas-splitter?lang=en");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Back to R\/COON OS/);
  assert.match(html, /Technical challenges/);
  assert.match(html, /Open repository/);
  assert.doesNotMatch(html, /Abrir repositorio/);
});
