import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("ships the YOSSEUF AI Core dashboard structure", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /YOSSEUF AI CORE/);
  assert.match(page, /Creative command center/);
  assert.match(page, /Identity Engine/);
  assert.match(page, /Prompt Composer/);
  assert.match(page, /Production Pipeline/);
  assert.match(page, /Brand System/);
  assert.doesNotMatch(page, /codex-preview/);
});

test("ships product metadata and Vercel-native Next.js commands", async () => {
  const [layout, packageJsonText] = await Promise.all([
    read("app/layout.tsx"),
    read("package.json"),
  ]);
  const packageJson = JSON.parse(packageJsonText);

  assert.match(layout, /YOSSEUF AI Core/);
  assert.equal(packageJson.scripts.build, "next build");
  assert.equal(packageJson.scripts.start, "next start");
  assert.doesNotMatch(packageJsonText, /react-loading-skeleton/);
});
