import { readFile } from "node:fs/promises";

const files = {
  page: await readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  brand: await readFile(new URL("../app/brand.css", import.meta.url), "utf8"),
  layout: await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
};

const failures = [];

if (/#[0-9a-f]{3,8}\b/gi.test(files.page)) {
  failures.push("app/page.tsx contains raw hexadecimal colors; consume semantic CSS roles instead.");
}

const rootEnd = files.brand.indexOf("}\n\nbody");
const brandRules = rootEnd >= 0 ? files.brand.slice(rootEnd + 2) : files.brand;
if (/#[0-9a-f]{3,8}\b/gi.test(brandRules)) {
  failures.push("app/brand.css contains raw hexadecimal colors outside the token adapter.");
}

for (const required of [
  "--surface-canvas",
  "--surface-panel",
  "--text-primary",
  "--text-secondary",
  "--border-subtle",
  "--accent-primary",
  "--focus-ring",
  "--motion-fast",
]) {
  if (!files.brand.includes(required)) failures.push(`Missing required semantic role: ${required}`);
}

if (!files.brand.includes("@media (prefers-reduced-motion: reduce)")) {
  failures.push("Reduced-motion handling is missing.");
}

if (!files.brand.includes(":focus-visible")) {
  failures.push("Visible keyboard focus styling is missing.");
}

if (!files.brand.includes("margin-inline") && !files.brand.includes("inset-inline")) {
  failures.push("No RTL-safe logical property was found in the product adapter.");
}

if (!files.layout.includes('import "./brand.css"')) {
  failures.push("The Foundation adapter is not imported by app/layout.tsx.");
}

if (failures.length) {
  console.error("YOSSEUF Foundation validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("YOSSEUF Foundation migration guard passed.");
