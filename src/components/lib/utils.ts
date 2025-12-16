// utils.ts

/** ClassValue type supports strings, numbers, booleans, undefined, null, nested objects, and arrays */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: ClassValue }
  | ClassValue[];

/**
 * `cn` function combines multiple class names into a single string.
 * Supports nested arrays and conditional objects.
 * Example:
 *   cn("btn", { "btn-primary": true, "hidden": false }, ["extra", "classes"])
 *   => "btn btn-primary extra classes"
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}
