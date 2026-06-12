# Daily Brief Swipe — Regression Checklist

Run through this list after any change to `daily-brief-stack.tsx` (or motion/dialog deps).
Goal: the last swipe must never snap back, flash, or glitch.

## Manual checks (preview at `/`)

Open the Daily Brief from the hero button, then:

### Forward swipes (left)
- [ ] Card 1 → 2: throws cleanly left, card 2 lifts smoothly into place.
- [ ] Card 2 → 3: same — no flicker on the incoming card.
- [ ] Card 3 (last) → close: card 3 throws fully off-screen and does **not**
      snap back to center before the dialog closes.
- [ ] No progress dots flash at 4/3 during the close.
- [ ] After close, reopening starts at card 1 (index reset).

### Backward swipes (right)
- [ ] Card 1: drag right is rejected — card springs back to center (no exit).
- [ ] Card 2 → 1 and Card 3 → 2: previous card reveals during drag, settles smoothly.

### Drag-cancel
- [ ] Slow drag under threshold (< ~104px, low velocity) springs back without
      jitter in both directions.
- [ ] Fast flick over threshold completes the throw even on short distance.

### Dots / keyboard / a11y
- [ ] Clicking a progress dot jumps to that card without animation glitches.
- [ ] `Esc` closes the dialog; reopening resets to card 1.
- [ ] `DialogTitle` remains `sr-only` (no Radix a11y warning in console).

## Code invariants (grep before shipping)

In `src/components/dashboard/hero/daily-brief-stack.tsx`:

- [ ] `handleSwipeComplete` on the last card returns `i + 1` (index advances
      **past** `total - 1`) so the thrown card is no longer `isTop` and its
      `x.set(0)` reset cannot snap it back into view.
- [ ] `onOpenChange(false)` is called via `setTimeout` (≥ ~60ms) **after** the
      index advance, never synchronously inside the throw animation's
      `.then()`.
- [ ] Index/`stackDragX`/`closingAfterSwipe` reset runs on a later timeout
      (≥ ~260ms) so it fires after the dialog close transition.
- [ ] `SwipeCard` only resets `x` to 0 when `isTop && !isThrowing.current`
      (prevents mid-throw snapback).
- [ ] `isThrowing` ref guards `handleDragEnd` against double-fire.
- [ ] `dragMomentum={false}` and `dragElastic` ≈ 0.18 on the top card.
- [ ] `onSwipeIntent` returns `false` for backward swipe on the first card.
- [ ] Progress-dot row is hidden while `closingAfterSwipe` is true.

## Things that have broken this before — do not reintroduce

- Calling `onOpenChange(false)` synchronously inside the throw `.then()` while
  leaving the same card as `isTop` → card snaps back to center mid-close.
- Wrapping cards in `AnimatePresence` with an `exit` prop while also animating
  `x` manually → double animation, visible jump on last swipe.
- Removing the `isThrowing` guard → drag end fires twice, second pass resets
  `x` to 0 before the throw finishes.
- Resetting `index` to 0 before the dialog finishes closing → card 1 flashes
  during the close fade.
