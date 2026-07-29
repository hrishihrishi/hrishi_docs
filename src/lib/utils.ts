import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind class names while resolving conflicts (e.g. `p-2` vs `p-4`).
 * clsx handles conditional and array inputs; twMerge deduplicates Tailwind utilities.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
