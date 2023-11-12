import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { URL } from "url";

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

export function getAppUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";

  return "https://" + process.env.VERCEL_URL;
}

export function getS3ObjectURLFromKey(key: string) {
  const url = new URL(
    `https://s3.${process.env.S3_REGION}.amazonaws.com/${process.env.S3_BUCKET}/${key}`
  );

  return url.toString();
}

export function getImagePlaceholderUrl(): string {
  return "https://mora-uploads.s3.eu-central-1.amazonaws.com/download/logo-2.png";
}

export function getGoogleQueryTextUrl(query: string | null): string {
  if (!query) return "#";
  return `https://www.google.com/search?&q=${query
    .trim()
    .split(" ")
    .join("+")}`;
}
