import assert from "node:assert/strict";
import { access, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../gh-pages-dist/", import.meta.url);

test("builds a repository-subpath-safe GitHub Pages edition", async () => {
  await rm(output, { recursive: true, force: true });

  const result = spawnSync(
    process.execPath,
    [fileURLToPath(new URL("../scripts/build-github-pages.mjs", import.meta.url))],
    { cwd: fileURLToPath(root), encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);

  await Promise.all([
    access(new URL("index.html", output)),
    access(new URL("sfbt/index.html", output)),
    access(new URL("wealth-brain/index.html", output)),
    access(new URL("course/index.html", output)),
    access(new URL("course/images/Q1.webp", output)),
  ]);

  const [home, sfbt, wealth, courseApp] = await Promise.all([
    readFile(new URL("index.html", output), "utf8"),
    readFile(new URL("sfbt/index.html", output), "utf8"),
    readFile(new URL("wealth-brain/index.html", output), "utf8"),
    readFile(new URL("course/app.js", output), "utf8"),
  ]);

  assert.match(home, /href="\.\/wealth-brain\/"/);
  assert.match(home, /href="\.\/sfbt\/"/);
  assert.match(sfbt, /href="\.\.\/course\/"/);
  assert.match(sfbt, /href="\.\.\/"/);
  assert.match(wealth, /href="\.\.\/"[^>]*aria-label="返回学习训练中心"/);
  assert.match(courseApp, /location\.hostname\.endsWith\('\.github\.io'\)/);
  assert.match(courseApp, /localStorage\.setItem\(key/);
  assert.doesNotMatch(home + sfbt, /(?:href|src)="\/(?!\/)/);
});

