# Learning Hub Six Modules Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish Behavior Modification and Systems Thinking as two new modules in the existing GitHub Pages learning hub.

**Architecture:** Copy only browser runtime assets into isolated `public/` subdirectories and preserve their relative paths. Extend the static hub template and shared hub CSS, then verify the output with Node tests and HTTP checks before one GitHub commit.

**Tech Stack:** Static HTML/CSS/JavaScript, JPEG assets, Node.js test runner, GitHub Actions, GitHub Pages.

---

### Task 1: Add failing integration assertions

**Files:**
- Modify: `tests/github-pages.test.mjs`

1. Assert that the home page links to `./behavior-modification/` and `./systems-thinking/`.
2. Assert that both entry pages, CSS, JavaScript and representative images exist.
3. Run the Pages test and confirm it fails while the modules are absent.

### Task 2: Copy runtime assets

**Files:**
- Create: `public/behavior-modification/`
- Create: `public/systems-thinking/`

1. Copy each root `index.html`, `css/`, `js/` and `images/` directory.
2. Exclude source documents, scripts, chapter text, caches and the duplicate `systems_site/bmlearn/` directory.
3. Run the Systems source QA and a BehaviorMod data/content loading check.

### Task 3: Extend the learning hub

**Files:**
- Modify: `static-pages/index.html`
- Modify: `app/hub.css`

1. Change the introduction from four to six interactive modules.
2. Add numbered cards 05 and 06 using relative links.
3. Add distinct card accent colors that remain coherent with the current design.

### Task 4: Verify locally

1. Run `node --test tests/github-pages.test.mjs` and expect success.
2. Serve `gh-pages-dist` locally and request both pages plus CSS, JavaScript and representative images.
3. Scan runtime files for root-relative paths, secrets and unexpected remote endpoints.

### Task 5: Publish and verify

1. Create a feature branch from the current `main` commit.
2. Create one tree and commit containing only the confirmed module, homepage, test and design files.
3. Fast-forward `main`, wait for the Pages workflow, and verify both public URLs return HTTP 200.

