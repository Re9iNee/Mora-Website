"use client";

import { getAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";
import AiForm from "../form";
import { AI } from "../data/schema";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

type Props = {
  params: { slug: string };
};
async function getAiBySlug(slug: string): Promise<AI> {
  // can't we use this instead? /api/ai?slug=${slug}
  const url = `${getAppUrl()}/api/ai?slug=${slug}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const result = await response.json();

  return result;
}

async function updateAiBySlug(slug: string, data: AI): Promise<AI> {
  const url = `${getAppUrl()}/api/ai/${slug}`;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  console.log(response.status);
  if (response.status === 404) notFound();

  const result = await response.json();

  return result;
}

const AiSlug = async ({ params }: Props) => {
  const { slug } = params;

  const ai = await getAiBySlug(slug);
  if (!ai) notFound();

  const onSubmit = async (data: AI) => {
    const result = await updateAiBySlug(slug, data);
    console.log(result);

    toast({
      title: "You submitted the following values:",
      description: (
        <div>
          <Link href={`./edit/${result.slug}`}>Edit Page</Link>
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      ),
    });
  };

  return <AiForm initialValues={ai} onSubmit={onSubmit} />;
};

export default AiSlug;
