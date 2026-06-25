import * as React from "react";

type RovingOption<T extends string> = {
  value: T;
  disabled?: boolean;
};

/**
 * Shared keyboard behavior for the WAI-ARIA radiogroup pattern used by
 * `SegmentedControl` and `FilterBar`. Owns the roving-focus ref map and the
 * arrow / Home / End key handling so both controls stay in sync.
 *
 * Returns:
 *  - `getOptionRef(value)` — ref callback to register each radio button.
 *  - `onKeyDown` — handler for the radiogroup container.
 *  - `getTabIndex(value)` — roving tabindex (0 for the selected option, -1 otherwise).
 */
export function useRovingRadioGroup<T extends string>({
  options,
  value,
  onValueChange,
}: {
  options: RovingOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
}) {
  const buttonRefs = React.useRef(new Map<T, HTMLButtonElement>());
  const enabledOptions = options.filter((option) => !option.disabled);

  const getOptionRef = (optionValue: T) => (node: HTMLButtonElement | null) => {
    if (node) buttonRefs.current.set(optionValue, node);
    else buttonRefs.current.delete(optionValue);
  };

  const getTabIndex = (optionValue: T) => (optionValue === value ? 0 : -1);

  const focusOption = (nextValue: T) => {
    onValueChange(nextValue);
    window.requestAnimationFrame(() => buttonRefs.current.get(nextValue)?.focus());
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    if (enabledOptions.length === 0) return;

    const currentIndex = Math.max(
      0,
      enabledOptions.findIndex((option) => option.value === value),
    );
    const lastIndex = enabledOptions.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? currentIndex === 0
              ? lastIndex
              : currentIndex - 1
            : currentIndex === lastIndex
              ? 0
              : currentIndex + 1;

    focusOption(enabledOptions[nextIndex].value);
  };

  return { getOptionRef, getTabIndex, onKeyDown };
}
