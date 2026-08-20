import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputRoot = join(projectRoot, "gh-pages-dist");

await rm(outputRoot, { recursive: true, force: true });
await mkdir(join(outputRoot, "assets"), { recursive: true });
await mkdir(join(outputRoot, "sfbt"), { recursive: true });

await cp(join(projectRoot, "public"), outputRoot, { recursive: true });
await Promise.all([
  cp(join(projectRoot, "static-pages", "index.html"), join(outputRoot, "index.html")),
  cp(join(projectRoot, "static-pages", "sfbt", "index.html"), join(outputRoot, "sfbt", "index.html")),
  cp(join(projectRoot, "app", "globals.css"), join(outputRoot, "assets", "globals.css")),
  cp(join(projectRoot, "app", "hub.css"), join(outputRoot, "assets", "hub.css")),
  writeFile(join(outputRoot, ".nojekyll"), "", "utf8"),
]);

const wealthPath = join(outputRoot, "wealth-brain", "index.html");
const wealthHtml = await readFile(wealthPath, "utf8");
const rewrittenWealthHtml = wealthHtml.replace(
  'href="/" aria-label="返回学习训练中心"',
  'href="../" aria-label="返回学习训练中心"',
);
if (rewrittenWealthHtml === wealthHtml) {
  throw new Error("Could not rewrite the wealth-brain home link.");
}
await writeFile(wealthPath, rewrittenWealthHtml, "utf8");

const courseAppPath = join(outputRoot, "course", "app.js");
const courseApp = await readFile(courseAppPath, "utf8");
const hostedStartup = "if(location.protocol.startsWith('http'))startHosted().then(startUsageTracking);";
const staticSafeStartup = "const runsOnGitHubPages=location.hostname.endsWith('.github.io');if(location.protocol.startsWith('http')&&!runsOnGitHubPages)startHosted().then(startUsageTracking);";
if (!courseApp.includes(hostedStartup)) {
  throw new Error("Could not find the hosted SFBT startup hook.");
}
await writeFile(courseAppPath, courseApp.replace(hostedStartup, staticSafeStartup), "utf8");

console.log(`GitHub Pages output generated at ${outputRoot}`);

