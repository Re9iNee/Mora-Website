import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function coerceToUndefined<T>(x: T | null | undefined): T | undefined{ 
return x ?? undefined
}