import { AI } from "@/app/dashboard/admin/ai/data/schema";
import { toast } from "@/components/ui/use-toast";
import { getAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function createAi(data: AI) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function getAllAIs(): Promise<AI[]> {
  const url = `${getAppUrl()}/api/ai`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await response.json();

  return result;
}

export async function getAiBySlug(slug: string): Promise<AI> {
  const url = `/api/ai/${slug}`;
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

export async function deleteAiById(id: string): Promise<AI> {
  const url = `/api/ai`;

  const response: Awaited<Response> = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
    cache: "no-cache",
  });

  if (response.status === 200)
    toast({
      title: "AI Removed",
    });
  else if (response.status === 400)
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });

  const result = await response.json();

  return result;
}
