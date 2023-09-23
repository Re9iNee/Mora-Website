"use client";

import { getAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import AiForm from "../form";
import { AI } from "../data/schema";

type Props = {
  params: { slug: string };
};
async function getAiBySlug(slug: string) {
  // can't we use this instead? /api/ai?slug=${slug}
  const url = `${getAppUrl()}/api/ai?slug=${slug}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await response.json();

  return result;
}

const AiSlug = async ({ params }: Props) => {
  const { slug } = params;

  const ai = await getAiBySlug(slug);
  if (!ai) notFound();

  const onSubmit = async (data: AI) => {
    const response = await fetch("/api/ai", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
  };

  return <AiForm initialValues={ai} onSubmit={onSubmit} />;
};

export default AiSlug;
