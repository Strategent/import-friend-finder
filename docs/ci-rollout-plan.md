# CI Rollout Plan

Status: **not yet implemented — planned for the collaboration handoff.**

This project currently has a full local test suite (see `docs/frontend-testing-and-tooling.md`): 8 Vitest unit tests, 24 Playwright e2e tests (smoke, URL-state, interactions, axe accessibility, visual regression), and a clean lint. Today it's a solo project, so the author is effectively the CI gate. In a couple of weeks other people will start interacting with the code, which is the trigger that makes automated CI worth setting up.

The groundwork is already done — the Playwright config is CI-aware (`forbidOnly`, `retries`, `reuseExistingServer` all key off `process.env.CI`) and prerequisites are documented. What remains is a provider workflow file and a one-time decision on cross-OS visual snapshots. Deferring the workflow itself costs nothing.

## Is CI recommended here?

**Yes — timed to the handoff, not before.** Reasoning:

- A good test suite decays without enforcement. Tests that only run when someone remembers to run them locally drift to broken within weeks — exactly the state Phase 8 was built to escape.
- CI's highest-value moment is "block the merge if the suite is red." That only matters once more than one person merges, or the app deploys on a cadence.
- While solo, `npm test` before a merge already covers you. The marginal protection from CI is low until collaboration starts.

**The caveat that decides timing:** the visual snapshots are a liability in CI until cross-OS baselines exist (see below). Wiring CI naively on a Linux runner makes the visual job go red on day one for a non-bug, which trains a team to ignore CI — worse than no CI. So the visual job ships *after* its baselines are sorted, or as a separate non-blocking job.

## What a CI workflow for this project entails

### Core sequence (reproduces what passes locally, in order)

```
1. Checkout + setup Node (match the local Node version)
2. npm ci                          → clean install from package-lock
3. npm run lint                    → 0 errors (9 known Fast Refresh warnings are acceptable)
4. npm run test:unit               → Vitest, ~0.5s, no browser
5. npx playwright install chrome   → REQUIRED; the config uses the system Chrome channel,
                                       not a bundled browser (--with-deps on Linux)
6. npm run test:e2e                → spawns the dev server, runs 24 tests
```

With `CI=true` set, steps 5–6 get the `forbidOnly` + `retries: 1` behavior already wired into `playwright.config.ts`.

### The three things that make *this* project non-trivial

1. **Visual snapshots are OS-specific.** Committed baselines are tagged `*-chromium-win32.png` because font rendering and anti-aliasing differ per platform. A Linux CI runner will not match them; the visual specs fail on first run. Options:
   - Generate Linux baselines once (`npx playwright test tests/e2e/visual.spec.ts --update-snapshots` on a Linux box) and commit the resulting `*-linux.png` files alongside the Windows ones — Playwright auto-selects by platform.
   - Or run CI on a Windows runner (slower, costlier, but matches existing baselines).
   - Or split visual tests into a separate job that's informational-only until baselines exist.
   - Do **not** raise `maxDiffPixelRatio` to paper over a genuine OS mismatch.

2. **The dev-server spawn.** The e2e config launches `npm run dev` itself (`webServer` block, 120s boot timeout). On CI each e2e job builds and serves the full app, so the run is dominated by server boot + first-paint, not the assertions. Budget ~1–2 min just for that.

3. **Browser caching.** `playwright install chrome` downloads a browser each run unless cached. Cache `~/.cache/ms-playwright` (Linux) keyed on the Playwright version to avoid a ~150MB download per run. The official `mcr.microsoft.com/playwright` Docker image pre-bundles browsers and sidesteps step 5 entirely.

### Provider shape

- **GitHub Actions** — a `.github/workflows/*.yml` with a Node setup action (npm cache built in) and either `microsoft/playwright-github-action` or a manual install + cache step. ~40 lines.
- **GitLab CI / CircleCI / others** — same logic, different YAML dialect; the Playwright Docker image removes the browser-install step.

### What it does NOT require

No code changes. The test setup is already CI-ready. It's purely a config/YAML file plus the one-time Linux-snapshot decision.

## Recommended rollout (tiered)

Don't turn on all six steps at once. Tier them so ~90% of the protective value lands immediately with zero flake risk:

| Step | Turn on at launch? | Why |
|------|--------------------|-----|
| lint + unit + smoke + url-state + interactions + axe | **Yes** | Deterministic, OS-independent, high signal, fast. 19 of 24 tests. |
| visual regression (5 tests) | **Not until Linux baselines exist** | Otherwise it's red-for-no-reason noise. Add as a separate job once baselines are committed. |

## Timeline (≈2 weeks to handoff)

**Now — the only task with a lead time:**
- Sort the **Linux visual baselines**. This needs a Linux environment to produce `*-linux.png` files. Until they exist, the visual job is deferred. If easy Linux access isn't available, plan to ship CI with visual tests as a separate non-blocking job and add them later.

**~3–4 days before others join:**
- Write the actual workflow (tiered as above).
- **Run it on a throwaway PR first** to shake out environment quirks (browser caching, Node version, dev-server boot timing) while it's still just you — not while someone is waiting on a review.

**At handoff:**
- Add **branch protection** on `main` requiring the checks to pass. This is the step that actually enforces anything — the workflow without branch protection is only advisory.

## The point that matters most

**Debug CI while you're still solo.** The failure mode to avoid is CI going red for an environment reason (snapshot OS mismatch, missing browser cache, timing flake) on someone else's first PR. That one bad first impression trains a team to ignore the checks, and then you have CI theater instead of CI. Getting it green-and-trusted before anyone arrives is the whole game.

## When ready

Tell the assistant the provider (GitHub Actions vs. other) and the snapshot approach (commit Linux baselines vs. Windows runner vs. defer visual job), and it can write the workflow file directly — no code changes needed.
