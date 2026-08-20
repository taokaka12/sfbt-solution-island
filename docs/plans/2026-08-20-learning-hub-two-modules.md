# Learning Hub Two Modules Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the Game Theory and Tiny Habits static applications to the existing learning hub and publish both through the current GitHub Pages site.

**Architecture:** Copy only browser runtime assets into isolated `public/` subdirectories. Extend the static hub template with two relative links and reuse the existing Pages builder, adding tests that verify the new output and repository-subpath safety.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js test runner, GitHub Actions, GitHub Pages.

---

### Task 1: Add failing integration assertions

**Files:**
- Modify: `tests/github-pages.test.mjs`

1. Assert that the built home page links to `./game-theory/` and `./tiny-habits/`.
2. Assert that both module entry pages and representative JavaScript/CSS files exist.
3. Run `node --test tests/github-pages.test.mjs` and expect failure because the modules are absent.

### Task 2: Copy browser runtime assets

**Files:**
- Create: `public/game-theory/index.html`, `public/game-theory/css/`, `public/game-theory/js/`, `public/game-theory/images/`
- Create: `public/tiny-habits/index.html`, `public/tiny-habits/css/`, `public/tiny-habits/js/`

1. Copy the two sites without modifying the download sources.
2. Exclude deployment notes, QA scripts, raw chapter text and book source text that the browser does not load.
3. Run each source QA script and confirm success.

### Task 3: Add two homepage cards

**Files:**
- Modify: `static-pages/index.html`
- Modify: `app/hub.css`

1. Add Game Theory and Tiny Habits cards with relative links.
2. Add distinct but cohesive card color accents and responsive behavior.
3. Run the GitHub Pages test and expect it to pass.

### Task 4: Verify the static build

**Files:**
- Verify: `gh-pages-dist/`

1. Run `node scripts/build-github-pages.mjs`.
2. Run `node --test tests/github-pages.test.mjs`.
3. Serve the output locally and request `/`, `/game-theory/`, `/tiny-habits/`, and representative assets; expect HTTP 200.

### Task 5: Publish and verify GitHub Pages

**Files:**
- Publish only confirmed module, homepage, test and design files.

1. Create a feature branch from `main`.
2. Upload the tested files and fast-forward `main` after confirming the branch is only ahead.
3. Wait for the Pages workflow to succeed.
4. Request all three public URLs and expect HTTP 200 with the expected page titles.

