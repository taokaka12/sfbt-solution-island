import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the finished Solution Island landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Solution Island · SFBT 100 Key Points<\/title>/i);
  assert.match(html, /100 key points through six-part explanations/i);
  assert.match(html, /Prof\.Tao, Huzhou Normal University/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("course includes instant retry, ten-point walker, and celebration feedback", async () => {
  const [app, css, index, files] = await Promise.all([
    readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
    readFile(new URL("../public/course/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/course/index.html", import.meta.url), "utf8"),
    readdir(new URL("../public/course/", import.meta.url)),
  ]);
  assert.match(app, /Array\.from\(\{length:10\}/);
  assert.match(app, /instantAnswer=function/);
  assert.match(app, /setTimeout\(finishOrAdvance,700\)/);
  assert.match(app, /Choose another answer/);
  assert.match(app, /celebrateLesson/);
  assert.match(app, /playVictory/);
  assert.match(css, /\.journey-dots/);
  assert.match(css, /@keyframes confetti/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(index, /6 LEARNING STEPS/);
  assert.ok(files.includes("chapter-content-91-100.js"));
});

test("hosted course records privacy-limited learning sessions", async () => {
  const [app, route, admin] = await Promise.all([
    readFile(new URL("../public/course/app.js", import.meta.url), "utf8"),
    readFile(new URL("../app/api/session/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(app, /sfbtUsageSessionV1/);
  assert.match(app, /document\.hidden/);
  assert.match(app, /\/api\/session/);
  assert.match(route, /getChatGPTUser/);
  assert.match(route, /sessionPattern/);
  assert.doesNotMatch(route, /candidate\.(userId|email)/);
  assert.match(admin, /Login count/);
  assert.match(admin, /Total active time/);
  assert.match(admin, /Recent login sessions/);
  assert.match(admin, /does not record IP addresses/);
});
