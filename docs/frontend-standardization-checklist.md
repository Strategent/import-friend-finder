# Frontend Standardization Checklist

Use this checklist to track the frontend cleanup and design-system work. The intended direction is a restrained enterprise SaaS/admin interface with consistent layout surfaces, semantic tokens, accessible shared components, and thin feature routes.

## 0. Baseline

- [x] Confirm current app routes and primary user workflows.
- [x] Decide the target product feel: restrained enterprise SaaS/admin, not marketing-style UI.
- [x] Choose CRM as the pilot screen for the new frontend architecture.
- [x] Update `docs/frontend-architecture.md` so it matches the current Vite/TanStack setup.
- [x] Document "no raw hex colors in route files" as a design-system rule.
- [x] Document the approved folder ownership model: `app`, `features`, `components/ui`, `components/app`, `lib`.

## 1. Design Tokens

- [x] Define primitive tokens: color, spacing, radius, shadow, typography, motion, z-index.
- [x] Define semantic tokens: background, foreground, muted, border, panel, sidebar, table, toolbar.
- [x] Define component tokens: button, badge, input, card, table row, nav item, dialog, popover.
- [x] Define interaction tokens: hover, active, selected, disabled, focus, error.
- [x] Define status tokens: lead, qualified, proposal, negotiation, closed, success, warning, danger, info.
- [x] Normalize dark-mode tokens.
- [x] Add high-contrast-friendly token choices where practical.
- [x] Remove or scope the global negative letter-spacing.
- [x] Replace scattered `#hex`, `rgba`, and one-off color classes with tokens. Route/component sweep completed; remaining scan hits are Recharts selector literals and token-channel gradient syntax.
- [x] Decide which branded tokens belong to Strategent/Syra and which are generic app tokens.

## 2. Layout System

- [x] Create canonical page surface primitives. `PageSurface` in `src/app/shell/layout` with two variants: `padded` and `flush`.
- [x] Standardize default app background behavior. `PageSurface` owns `bg-background`; `PageShell` now wraps `PageSurface variant="padded"`.
- [x] Create a standard `PageHeader` pattern. Padded pages use `PageHeader`; flush pages use `PageBandHeader` (same eyebrow/title/description/actions model).
- [x] Create a standard stat/metric strip pattern. `StatStrip` (divided columns, no cards).
- [x] Create a standard toolbar/search/filter row pattern. `PageToolbar` band.
- [x] Create a standard data-table page pattern. Flush surface + header/stat/toolbar bands + `PageBody`; reusable table extraction is Phase 3 (`DataTable`).
- [x] Create a standard split-pane workflow pattern. `SplitPane` (fixed rail + fluid detail) for list/detail workflows; proportional multi-column splits (e.g. Channels) stay on a CSS grid by design. Inbox/Channels keep their current markup until their Phase-4 migration.
- [x] Create a standard full-bleed workflow pattern for special surfaces. `PageSurface variant="flush"` fills the viewport below the Topbar via the new `--topbar-h` token.
- [~] Make every route explicitly use one approved layout variant. CRM uses `flush`; the 9 `PageShell` routes are `padded` via the shared surface. Inbox/Channels/Calendar/Syra still use bespoke full-height containers (now on `--topbar-h`) pending their own migration.
- [~] Remove route-specific background styling where a shared surface should handle it. Done for CRM and all `PageShell` routes. Remaining full-bleed routes still set their own `bg-*`/height; replaced the hardcoded `53px` with `var(--topbar-h)` as an interim step.
- [x] Apply the layout system to CRM first. CRM refactored to `PageSurface`/`PageBandHeader`/`StatStrip`/`PageToolbar`/`PageBody`; no visual change.

## 3. Shared Components

- [x] Audit `src/components/ui` and separate primitives from product-specific visuals. See `docs/frontend-shared-components-audit.md`.
- [x] Keep Radix/shadcn-style primitives in `components/ui`. Transitional re-export shims remain for moved app components.
- [x] Move branded or decorative components out of generic UI. Moved product-facing components into `src/components/app`.
- [x] Add `components/app` for composed reusable app patterns.
- [x] Create `SearchField`.
- [x] Create `FilterBar`.
- [x] Create `StatusBadge`.
- [x] Create `MetricTile` or `MetricStrip`.
- [x] Create `DataTable`.
- [x] Create `ActionMenu`.
- [x] Create `EmptyState`.
- [x] Create `LoadingState`.
- [x] Create `ErrorState`.
- [x] Standardize icon-only button behavior and labels. Added `IconButton`; CRM uses it as the pilot.
- [x] Standardize compact buttons, segmented controls, tabs, and badges. Added `SegmentedControl`, `FilterBar`, and `StatusBadge`; full route migration can continue during feature refactors.

## 4. Feature Refactor

- [x] Refactor `crm.tsx` into a thin route plus `features/crm`.
- [x] Move CRM mock data into feature-local fixtures.
- [x] Move CRM types into feature-local `types.ts`.
- [x] Move CRM table, filters, stats, and actions into feature components.
- [x] Refactor `inbox.tsx` into `features/inbox`.
- [x] Refactor `channels.tsx` into `features/channels`.
- [x] Refactor `calendar.tsx` into `features/calendar`.
- [x] Refactor `syra.tsx` into `features/syra` where still needed.
- [x] Keep route files responsible only for route setup and rendering the feature screen.

## 5. Accessibility

- [x] Audit all icon-only buttons for `aria-label`. Added missing labels in Topbar, Channels, Inbox, and dashboard widgets; `IconButton` remains the preferred shared interface.
- [x] Audit all inputs for visible labels or accessible names. Added names to Topbar, Inbox, Channels, Syra, Connectors, and Support inputs; DataTable row checkboxes now accept row-specific labels.
- [x] Audit custom tab/filter controls for keyboard support. `SegmentedControl` and `FilterBar` now support arrow keys plus Home/End with roving focus.
- [x] Audit menus, popovers, dialogs, and sheets for focus behavior. Radix-owned overlays remain on primitives; Inbox mailbox picker now exposes menu semantics, and Syra's custom model picker was replaced with a native select.
- [x] Ensure visible focus states across all interactive components. Added focus-visible rings to shared filter/search controls and patched route-specific controls that previously suppressed or lacked focus feedback.
- [x] Remove `outline-none` usages without a real replacement. Remaining `outline-none` scan hits are either paired with focus/data-state styling or are non-interactive Recharts selector overrides.
- [x] Check color contrast for text, borders, icons, badges, and states. Manual token-level pass completed; automated axe coverage remains tracked in Phase 8.
- [x] Add reduced-motion handling for animated components. Added a global `prefers-reduced-motion` fallback and reduced-motion handling for CardSpotlight/DailyBriefStack.
- [x] Ensure heading hierarchy is logical per page. Added page-level headings for Inbox/Channels and confirmed core route heading structure.
- [x] Prefer native controls before custom ARIA patterns. Syra model selection now uses a native `select`; custom radio-style filters are reserved for compact filter controls with keyboard support.

## 6. State And Data Patterns

- [x] Standardize URL search params for filters, tabs, sorting, and pagination. Added `src/lib/url-search-params.ts` with typed string, enum, integer, and date readers.
- [x] Apply URL state to CRM search/filter/stage selection. CRM validates and drives `q` and `stage` from route search state.
- [x] Apply URL state to Inbox views where useful. Inbox validates and drives `folder` (label only — no per-folder fixture data yet), `thread`, and `q` from route search state.
- [x] Apply URL state to Calendar mode/date selection where useful. Calendar now validates and drives `date` and `mode` from route search state.
- [x] Create a shared pattern for persisted user preferences. Added `usePersistentPreference` in `src/lib/preferences.ts`.
- [x] Formalize dashboard layout persistence. Added dashboard preference/layout keys plus layout read/write/clear helpers in `features/dashboard/layout/persistence.ts`.
- [x] Centralize date, currency, number, and relative-time formatting helpers. Added `src/lib/formatters.ts`; CRM AUM and calendar date labels now use it.
- [x] Separate mock data from render components. CRM, Inbox, Calendar, Channels, Syra, and Dashboard data now live in feature-local fixture/data modules where practical.

## 7. Visual Consistency

- [x] Remove one-off route palettes. Replaced ordinary route action/avatar gradient fills with `bg-primary`, aligned Inbox to `bg-background`, and left only approved brand/special-purpose gradients.
- [x] Normalize table row height, density, borders, hover states, and selected states. `DataTable` and the shadcn table primitive now share table tokens, row height, hover, and selected-state treatment.
- [x] Normalize page spacing and section rhythm. Topbar, Inbox, Connectors, Support, and full-height workflow surfaces now use the shared background/control rhythm established by the page shell.
- [x] Normalize card/panel radius. Reduced radius primitives and patched oversized app cards/popovers/widgets to the shared radius scale.
- [x] Normalize shadows and elevation. Replaced ad hoc popover/card shadows with `shadow-popover`, `shadow-panel`, or semantic elevation tokens.
- [x] Normalize form field sizing. Shared `Input`, topbar search, Inbox search, Connectors request input, Support input, and Support textarea now use the same compact control height/focus treatment.
- [x] Normalize badge shapes and colors. `StatusBadge`, `FilterBar`, and base `Badge` now use rectangular app/admin badge geometry and semantic focus/color tokens.
- [x] Reduce decorative gradients/orbs where they conflict with admin-tool clarity. Removed generic primary gradients from admin routes; retained only dashboard feature/score visuals and Syra's scoped brand surface.
- [x] Keep Syra visually distinct only through approved brand tokens. Syra page/widget styling now uses `--brand-syra`, `--syra-*`, and semantic surfaces instead of generic decorative gradients for normal controls.

## 8. Testing And Tooling

- [ ] Fix existing Fast Refresh lint warnings or document acceptable exceptions.
- [ ] Add Playwright smoke tests for key routes.
- [ ] Add visual regression screenshots for CRM, Inbox, Calendar, Channels, Dashboard.
- [ ] Add axe accessibility checks.
- [ ] Add a design-system/component catalog, likely Storybook or a local docs route.
- [ ] Add tests for URL-state behavior.
- [ ] Add tests for core table/filter interactions.
- [ ] Track bundle/chunk warnings and decide whether to split large route chunks.

## 9. Definition Of Done

- [ ] No Lovable references remain.
- [ ] No route owns raw design-system decisions.
- [ ] Every page uses an approved layout surface.
- [ ] Shared primitives are clearly separated from product-specific components.
- [ ] CRM is refactored as the reference implementation.
- [ ] Accessibility checks pass for the core routes.
- [ ] Visual snapshots confirm consistent surfaces/backgrounds.
- [ ] Frontend architecture docs match the actual codebase.

## Recommended First Milestone

Start with tokens, layout surfaces, and CRM as the pilot. That gives the rest of the app a clean reference implementation before refactoring Inbox, Channels, Calendar, and Syra.
