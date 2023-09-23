import { getAppUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};
async function getAiBySlug(slug: string) {
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

  return (
    <div>
      AiSlug, request to visit:
      <pre>{params.slug}</pre>
      RESPONSE:
      <pre>{JSON.stringify(ai)}</pre>
    </div>
  );
};

export default AiSlug;
