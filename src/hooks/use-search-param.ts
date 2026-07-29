import { parseAsString, useQueryState } from "nuqs";

/** [explainMore]
 * Thin wrapper around nuqs `useQueryState` for the "search" URL param.
 * `clearOnDefault` removes the param from the URL when the value is empty,
 * keeping URLs clean and shareable.
 */
export function useSearchParam() {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );
};
