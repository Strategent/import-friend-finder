import { useCallback, useEffect, useMemo, useState } from "react";

type PreferenceOptions<T> = {
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
};

export function usePersistentPreference<T>(
  key: string,
  defaultValue: T,
  options: PreferenceOptions<T> = {},
) {
  const serialize = useMemo(() => options.serialize ?? JSON.stringify, [options.serialize]);
  const deserialize = useMemo(
    () => options.deserialize ?? ((storedValue: string) => JSON.parse(storedValue) as T),
    [options.deserialize],
  );
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored != null) setValue(deserialize(stored));
    } catch {
      setValue(defaultValue);
    }
  }, [defaultValue, deserialize, key]);

  const setPreference = useCallback(
    (nextValue: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const resolved =
          typeof nextValue === "function" ? (nextValue as (previous: T) => T)(previous) : nextValue;

        try {
          window.localStorage.setItem(key, serialize(resolved));
        } catch {
          /* storage may be unavailable */
        }

        return resolved;
      });
    },
    [key, serialize],
  );

  return [value, setPreference] as const;
}
