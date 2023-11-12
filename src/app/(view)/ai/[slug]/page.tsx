import { AIModel } from "@/app/dashboard/admin/ai/types/ai.types";
import { getAiBySlug } from "@/services/ai.service";
import { notFound } from "next/navigation";
import AIView from "./view";

type Props = {
  params: { slug: string };
};
async function AIViewPage({ params }: Props) {
  const data: AIModel | null = await getAiBySlug({ slug: params.slug });
  if (!data) notFound();

  return <AIView data={data} />;
}

export default AIViewPage;
