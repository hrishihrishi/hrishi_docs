import { useCallback, useRef } from "react";

/**
 * Returns a debounced version of `callback` that delays invocation until
 * `delay` ms have elapsed since the last call.
 * Useful for limiting expensive operations (e.g. search queries, Convex mutations) triggered by rapid input.
 * @param callback - The function to debounce.
 * @param delay    - Milliseconds to wait before invoking (default: 500).
 */
export function useDebounce<
  // type T extends (...)=>{...}
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      // Cancel any in-flight timer before scheduling a new one.
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
