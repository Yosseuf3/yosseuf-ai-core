import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the YOSSEUF AI Core dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /YOSSEUF AI Core/);
  assert.match(html, /Creative command center/);
  assert.match(html, /Identity Engine/);
  assert.match(html, /Prompt Composer/);
  assert.match(html, /Production Pipeline/);
  assert.match(html, /Brand System/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("ships product metadata and no starter dependency", async () => {
  const [layout, packageJson] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.match(layout, /YOSSEUF AI Core/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
