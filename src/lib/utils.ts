import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function coerceToUndefined<T>(x: T | null | undefined): T | undefined {
  return x ?? undefined;
}

export function mapNullToUndefinedInArray(arr: Record<string, unknown>[]) {
  return arr.map((obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === null) {
        obj[key] = undefined;
      }
    }
    return obj;
  });
}
