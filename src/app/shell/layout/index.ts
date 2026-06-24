/**
 * Canonical page-layout primitives.
 *
 * Every route composes its frame from these instead of hand-rolling page
 * backgrounds, viewport math, or header markup. See page-surface.tsx for the
 * two approved surface variants ("padded" | "flush").
 */
export { PageSurface } from "./page-surface";
export { PageBandHeader, StatStrip, PageToolbar, PageBody } from "./page-band";
export { SplitPane } from "./split-pane";

// PageShell (the padded surface + Syra widget) and its PageHeader still live in
// the existing shell module; re-exported here so routes have a single layout
// import path.
export { PageShell, PageHeader } from "../page-shell";
