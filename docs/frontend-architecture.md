# Frontend Architecture

This app is a TanStack Start React frontend with file-based routes, a small app
shell, feature-owned UI, and shared primitives. Keep modules deep: a route should
compose feature modules, not own every detail of a workflow.

## Top-Level Layout

| Path                 | Responsibility                                                          |
| -------------------- | ----------------------------------------------------------------------- |
| `src/routes`         | TanStack Start file routes, route metadata, and page composition.       |
| `src/app`            | App-wide shell, providers, navigation, and root layout helpers.         |
| `src/features`       | Product features with their components, data, and local layout helpers. |
| `src/components/app` | Reusable app patterns composed from shared UI primitives.               |
| `src/components/ui`  | Reusable, feature-agnostic UI primitives only.                          |
| `src/integrations`   | External adapters such as Supabase clients and middleware.              |
| `src/lib`            | Small app utilities and cross-cutting helpers.                          |
| `src/assets`         | Imported static assets used by React modules.                           |
| `public`             | Static files served directly by Vite.                                   |

## Product Direction

The frontend target is a restrained enterprise SaaS/admin workspace for private
wealth and operations teams. Screens should feel calm, dense, scannable, and
task-focused. Avoid marketing-page patterns, oversized decorative sections, and
route-specific palettes unless a feature has an approved product reason.

CRM is the pilot screen for the frontend standardization work. It exercises the
main app patterns that need to become reusable: page surfaces, page headers,
metrics, search, filters, status badges, data tables, row actions, and Syra
assist.

### Brand Names

Three distinct brands appear in this codebase; do not conflate them:

- **Strategent** is the platform vendor that builds this app. It owns the design
  system, so the token namespace and primitive token file are "Strategent".
- **Harwick & Sterne** is the demo tenant: the wealth-management firm shown in
  the product UI (page titles, sidebar, client/mock data). It is content, not a
  design-system concept, so shared primitives must not know about it.
- **Syra** is the in-product AI agent sub-brand.

## Design Tokens

Tokens are layered from stable primitives to app semantics:

- `src/styles/tokens.css` owns theme-independent primitives: typography,
  spacing, shape, motion, elevation, z-index, color ramps, and brand accents.
- `src/styles.css` owns light/dark semantic tokens: app backgrounds, surfaces,
  panels, tables, toolbars, component tokens, interaction states, and statuses.
- Shared UI and feature modules should use semantic tokens or Tailwind utilities
  generated from semantic tokens. They should not reach for primitive color
  ramps unless they are defining a new semantic token.
- Strategent brand tokens belong in the primitive token file. Syra-specific
  accent tokens may stay there only when they are cross-feature brand accents;
  feature-only Syra styling belongs in `src/features/syra`.

## Current Routes And Workflows

The sidebar groups the current user workflows into Workspace, Collaboration,
and Operations:

| Route         | Workflow                                                         |
| ------------- | ---------------------------------------------------------------- |
| `/`           | Dashboard, daily brief, workload, planner, and meeting widgets.  |
| `/inbox`      | Email triage, folders, message reading, composer, and Syra help. |
| `/calls`      | Call log review, call outcomes, and AI-handled call indicators.  |
| `/crm`        | Client relationships, stages, AUM, owners, and next actions.     |
| `/tasks`      | Human and agent task tracking by time horizon.                   |
| `/documents`  | Document library, upload flow, and searchable client assets.     |
| `/calendar`   | Monthly schedule, meetings, availability, and booking details.   |
| `/connectors` | Connected tools and integration status.                          |
| `/team`       | Team roster, status, task load, and score indicators.            |
| `/channels`   | Team channels, direct messages, and Syra handoff conversation.   |
| `/syra`       | Syra chat and quick agent actions.                               |
| `/billing`    | Invoices, payment state, and billing actions.                    |
| `/support`    | Support threads and help requests.                               |
| `/settings`   | Workspace settings, theme, security, notifications, and access.  |

## Route Rules

Routes are the public URL interface. Keep them thin:

- Define `createFileRoute`, `head`, and route-level loading or guards.
- Compose feature modules from `src/features`.
- Render every page into exactly one approved surface from `src/app/shell/layout`
  instead of hand-rolling page background or viewport math (see Layout System below).
  Padded content pages use `PageShell` + `PageHeader`; full-bleed workflows use
  `PageSurface`.
- Do not place reusable widgets, mock data, or layout engines directly in a route
  file unless the code is truly route-only and small.
- Do not define raw hex colors, one-off route palettes, or design-system
  decisions in route files. Add or use semantic tokens instead.

`src/routeTree.gen.ts` is generated by TanStack Router. Do not edit it by hand.

## App Layer

`src/app` owns the chrome around pages:

- `src/app/shell/app-sidebar.tsx` owns global navigation.
- `src/app/shell/page-shell.tsx` owns the top bar (with the `--topbar-h` token) and
  `PageShell`/`PageHeader` (the padded content surface used by most routes).
- `src/app/shell/layout/` owns the canonical layout primitives, re-exported from one
  index: `PageSurface`, the page bands (`PageBandHeader`, `StatStrip`, `PageToolbar`,
  `PageBody`), and `SplitPane`.
- `src/app/providers/theme-provider.tsx` owns theme state and the `useTheme` hook.

### Layout System

`PageSurface` is the canonical page frame. Every route renders into exactly one
variant rather than setting its own background or computing viewport height:

- `padded` — comfortable scrolling content page (forms, settings, dashboards).
  `PageShell` wraps this variant.
- `flush` — full-height surface that grows with content and scrolls the whole page
  (CRM, Calendar).
- `fill` — full-height surface locked to the area below the Topbar (fixed height +
  `overflow-hidden`), so an inner pane scrolls instead of the page (Inbox, Channels,
  Syra).

All three derive their height from the `--topbar-h` token; routes never hardcode
`100dvh` math or `bg-*` on the page root.

The app layer can import shared UI primitives and feature entry points. Feature
modules should not mutate app-level state directly; expose an explicit prop or
hook if that becomes necessary.

## Feature Layer

Feature modules own domain-specific UI and data. Current feature modules:

- `src/features/dashboard` owns dashboard cards, dashboard mock data, and the
  gridstack-powered dashboard layout.
- `src/features/syra` owns Syra-specific branding and the chat widget.

When adding a new feature, prefer:

```txt
src/features/<feature-name>/
  components/
  data/
  hooks/
  api/
```

Only create folders that are actually needed. A single component can live at
`src/features/<feature-name>/components/<thing>.tsx`.

## Shared UI

`src/components/ui` is for primitives that are not aware of Harwick & Sterne,
Syra, dashboard cards, routes, or integrations. If a module mentions product
copy, navigation, a specific workflow, or mock domain data, it belongs in
`src/features` or `src/app`, not in shared UI.

`src/components/app` is for reusable composed app patterns such as page
toolbars, search fields, status badges, metric strips, data-table wrappers, and
empty/loading/error states. These modules may know about the app design system,
but not about a single feature's data model or copy.

> **Status:** `src/components/app` is a planned folder, not yet created. It is
> introduced in Phase 3 of the frontend standardization work. Until then, only
> `src/components/ui` exists. This section describes the intended ownership once
> that folder lands.

## Integrations

`src/integrations` is the seam for external systems. Supabase clients and
middleware live here so routes and features do not need to know how clients are
constructed. Client-safe code should use public `VITE_` variables only; secrets
belong in `.server.ts` modules or server handlers.

## Build Ownership

The Vite config uses first-party plugins directly:

- `@tanstack/react-start/plugin/vite` for TanStack Start.
- `nitro/vite` for server output.
- `@vitejs/plugin-react` for React.
- `@tailwindcss/vite` for Tailwind.
- Vite's `resolve.tsconfigPaths` option for `@/*`.

No generator-specific package or runtime hook is required for local development,
builds, or deployment.
