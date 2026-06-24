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

- [ ] Define primitive tokens: color, spacing, radius, shadow, typography, motion, z-index.
- [ ] Define semantic tokens: background, foreground, muted, border, panel, sidebar, table, toolbar.
- [ ] Define component tokens: button, badge, input, card, table row, nav item, dialog, popover.
- [ ] Define interaction tokens: hover, active, selected, disabled, focus, error.
- [ ] Define status tokens: lead, qualified, proposal, negotiation, closed, success, warning, danger, info.
- [ ] Normalize dark-mode tokens.
- [ ] Add high-contrast-friendly token choices where practical.
- [ ] Remove or scope the global negative letter-spacing.
- [ ] Replace scattered `#hex`, `rgba`, and one-off color classes with tokens.
- [ ] Decide which branded tokens belong to Strategent/Syra and which are generic app tokens.

## 2. Layout System

- [ ] Create canonical page surface primitives.
- [ ] Standardize default app background behavior.
- [ ] Create a standard `PageHeader` pattern.
- [ ] Create a standard stat/metric strip pattern.
- [ ] Create a standard toolbar/search/filter row pattern.
- [ ] Create a standard data-table page pattern.
- [ ] Create a standard split-pane workflow pattern.
- [ ] Create a standard full-bleed workflow pattern for special surfaces.
- [ ] Make every route explicitly use one approved layout variant.
- [ ] Remove route-specific background styling where a shared surface should handle it.
- [ ] Apply the layout system to CRM first.

## 3. Shared Components

- [ ] Audit `src/components/ui` and separate primitives from product-specific visuals.
- [ ] Keep Radix/shadcn-style primitives in `components/ui`.
- [ ] Move branded or decorative components out of generic UI.
- [ ] Add `components/app` for composed reusable app patterns.
- [ ] Create `SearchField`.
- [ ] Create `FilterBar`.
- [ ] Create `StatusBadge`.
- [ ] Create `MetricTile` or `MetricStrip`.
- [ ] Create `DataTable`.
- [ ] Create `ActionMenu`.
- [ ] Create `EmptyState`.
- [ ] Create `LoadingState`.
- [ ] Create `ErrorState`.
- [ ] Standardize icon-only button behavior and labels.
- [ ] Standardize compact buttons, segmented controls, tabs, and badges.

## 4. Feature Refactor

- [ ] Refactor `crm.tsx` into a thin route plus `features/crm`.
- [ ] Move CRM mock data into feature-local fixtures.
- [ ] Move CRM types into feature-local `types.ts`.
- [ ] Move CRM table, filters, stats, and actions into feature components.
- [ ] Refactor `inbox.tsx` into `features/inbox`.
- [ ] Refactor `channels.tsx` into `features/channels`.
- [ ] Refactor `calendar.tsx` into `features/calendar`.
- [ ] Refactor `syra.tsx` into `features/syra` where still needed.
- [ ] Keep route files responsible only for route setup and rendering the feature screen.

## 5. Accessibility

- [ ] Audit all icon-only buttons for `aria-label`.
- [ ] Audit all inputs for visible labels or accessible names.
- [ ] Audit custom tab/filter controls for keyboard support.
- [ ] Audit menus, popovers, dialogs, and sheets for focus behavior.
- [ ] Ensure visible focus states across all interactive components.
- [ ] Remove `outline-none` usages without a real replacement.
- [ ] Check color contrast for text, borders, icons, badges, and states.
- [ ] Add reduced-motion handling for animated components.
- [ ] Ensure heading hierarchy is logical per page.
- [ ] Prefer native controls before custom ARIA patterns.

## 6. State And Data Patterns

- [ ] Standardize URL search params for filters, tabs, sorting, and pagination.
- [ ] Apply URL state to CRM search/filter/stage selection.
- [ ] Apply URL state to Inbox views where useful.
- [ ] Apply URL state to Calendar mode/date selection where useful.
- [ ] Create a shared pattern for persisted user preferences.
- [ ] Formalize dashboard layout persistence.
- [ ] Centralize date, currency, number, and relative-time formatting helpers.
- [ ] Separate mock data from render components.

## 7. Visual Consistency

- [ ] Remove one-off route palettes.
- [ ] Normalize table row height, density, borders, hover states, and selected states.
- [ ] Normalize page spacing and section rhythm.
- [ ] Normalize card/panel radius.
- [ ] Normalize shadows and elevation.
- [ ] Normalize form field sizing.
- [ ] Normalize badge shapes and colors.
- [ ] Reduce decorative gradients/orbs where they conflict with admin-tool clarity.
- [ ] Keep Syra visually distinct only through approved brand tokens.

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
