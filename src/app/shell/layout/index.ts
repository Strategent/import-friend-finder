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

// The padded surface still ships its header via the existing shell module.
export { PageHeader } from "../page-shell";
