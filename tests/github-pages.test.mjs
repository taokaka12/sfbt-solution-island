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
    access(new URL("game-theory/index.html", output)),
    access(new URL("game-theory/js/app.js", output)),
    access(new URL("game-theory/css/style.css", output)),
    access(new URL("tiny-habits/index.html", output)),
    access(new URL("tiny-habits/js/app.js", output)),
    access(new URL("tiny-habits/css/style.css", output)),
    access(new URL("behavior-modification/index.html", output)),
    access(new URL("behavior-modification/js/app.js", output)),
    access(new URL("behavior-modification/css/style.css", output)),
    access(new URL("behavior-modification/images/lessons/U01-S00.jpg", output)),
    access(new URL("systems-thinking/index.html", output)),
    access(new URL("systems-thinking/js/app.js", output)),
    access(new URL("systems-thinking/css/style.css", output)),
    access(new URL("systems-thinking/images/lessons/U01-S00.jpg", output)),
  ]);

  const [home, sfbt, wealth, courseApp] = await Promise.all([
    readFile(new URL("index.html", output), "utf8"),
    readFile(new URL("sfbt/index.html", output), "utf8"),
    readFile(new URL("wealth-brain/index.html", output), "utf8"),
    readFile(new URL("course/app.js", output), "utf8"),
  ]);

  assert.match(home, /href="\.\/wealth-brain\/"/);
  assert.match(home, /href="\.\/sfbt\/"/);
  assert.match(home, /href="\.\/game-theory\/"/);
  assert.match(home, /href="\.\/tiny-habits\/"/);
  assert.match(home, /href="\.\/behavior-modification\/"/);
  assert.match(home, /href="\.\/systems-thinking\/"/);
  assert.match(sfbt, /href="\.\.\/course\/"/);
  assert.match(sfbt, /href="\.\.\/"/);
  assert.match(wealth, /href="\.\.\/"[^>]*aria-label="返回学习训练中心"/);
  assert.match(courseApp, /location\.hostname\.endsWith\('\.github\.io'\)/);
  assert.match(courseApp, /localStorage\.setItem\(key/);
  assert.doesNotMatch(home + sfbt, /(?:href|src)="\/(?!\/)/);
});

