import { useEffect, useState } from "react";

/**
 * Debounces a boolean state, useful for conditionally rendering spinners/loading indicators.
 */
export function useDebouncedBoolean(value: boolean, delay: number = 200) {
  const [debouncedValue, setDebouncedValue] = useState(false);

  useEffect(() => {
    if (value) {
      const timeout = setTimeout(() => setDebouncedValue(true), delay);
      return () => clearTimeout(timeout);
    } else {
      setDebouncedValue(false);
    }
  }, [value, delay]);

  return debouncedValue;
}
