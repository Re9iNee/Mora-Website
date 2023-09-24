import { AI } from "@/app/dashboard/admin/ai/data/schema";
import { getAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function createAi(data: AI) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function getAiBySlug(slug: string): Promise<AI> {
  // TODO: can't we use this instead? /api/ai?slug=${slug}
  const url = `${getAppUrl()}/api/ai?slug=${slug}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await response.json();

  return result;
}

export async function updateAiBySlug(slug: string, data: AI): Promise<AI> {
  const url = `${getAppUrl()}/api/ai/${slug}`;
  const response: Awaited<Response> = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  if (response.status === 404) notFound();

  const result = await response.json();

  return result;
}
