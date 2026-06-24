# Shared Components Audit

This audit supports checklist section 3. The intended ownership model is:

- `src/components/ui`: low-level primitives and Radix/shadcn adapters.
- `src/components/app`: composed app patterns, product-specific surfaces, and decorative UI.
- `src/features/*`: feature-specific data, copy, and workflow components.

## Keep In `components/ui`

These are primitive adapters or low-level controls:

- Radix adapters: dialog, alert-dialog, drawer, dropdown-menu, popover, sheet, tabs, tooltip, select, switch, checkbox, radio-group, accordion, hover-card, menubar, navigation-menu, context-menu, scroll-area, slider, toggle, toggle-group.
- Base elements: button, badge, input, textarea, label, card, table, avatar, skeleton, separator, progress, breadcrumb, pagination, chart, calendar, carousel, command, form, input-otp, resizable, sonner.

## Moved To `components/app`

These are composed/product-facing patterns rather than primitives:

- `Panel`
- `PillButton`
- `SectionLabel`
- `StatTile`
- `SparkleButton`
- `BentoGrid`
- `CardSpotlight`
- `GradientFeatureCard`
- `ScoreBar`

The old `components/ui/*` paths now re-export from `components/app/*` as transitional shims. New code should import these from `@/components/app`.

## New App Patterns

Added reusable app patterns for page and workflow composition:

- `SearchField`
- `FilterBar`
- `StatusBadge`
- `MetricTile` / `MetricStrip`
- `DataTable`
- `ActionMenu`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `IconButton`
- `SegmentedControl`

CRM is the pilot usage for the new app patterns.
