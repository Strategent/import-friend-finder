# Frontend Testing And Tooling

Phase 8 adds repeatable checks around the frontend architecture work:

- `npm run test:unit` runs Vitest coverage for pure URL-state helpers and feature model behavior.
- `npm run test:e2e` runs Playwright smoke, route-state, interaction, accessibility, visual, and design-system catalog checks.
- `npm run test:a11y` runs only axe-backed Playwright checks.
- `npm run test:visual` runs only the visual regression snapshots.

## Fast Refresh Warnings

The existing `react-refresh/only-export-components` warnings are documented exceptions for now. They come from mixed component/helper exports in generated or shadcn-style modules:

- `src/app/providers/theme-provider.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/form.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/sidebar.tsx`
- `src/components/ui/toggle.tsx`
- `src/features/dashboard/components/hero/daily-brief-hero.tsx`
- `src/router.tsx`

Decision: keep them as warnings until the component catalog and route layout work settle. Splitting these files is low-risk but noisy, so it should happen in a dedicated cleanup pass.

## Bundle Warning

The production build currently warns about chunks larger than 500 kB. The main contributors are the app shell/router path, Gridstack, Supabase, and motion-related libraries.

Decision: track the warning, but defer code-splitting until the route/component architecture stabilizes. The likely follow-up is route-level lazy loading for heavy workflow pages and isolating dashboard-only libraries from the default shell path.

## Running On CI

- **Visual snapshots are OS-specific.** The committed baselines are tagged `*-chromium-win32.png` because font rendering and anti-aliasing differ per platform. A Linux CI runner will not match these and the visual specs will fail on first run. Regenerate platform baselines once per CI OS with `npx playwright test tests/e2e/visual.spec.ts --update-snapshots` and commit the resulting `*-linux.png` files alongside the Windows ones. Do not raise `maxDiffPixelRatio` to paper over a genuine OS mismatch.
- **Set `CI=true`** in the test environment. The Playwright config keys off `process.env.CI` to enable `forbidOnly` (fails the build if a `test.only` is committed) and one retry (absorbs dev-server first-paint timing flake). Locally, both stay off so failures surface immediately.
- **Browser install.** CI must run `npx playwright install chrome` (or `--with-deps` on Linux) before the suite; the config uses the system Chrome channel, not a bundled browser.
