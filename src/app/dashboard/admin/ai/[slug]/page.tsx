import { getAiBySlug, updateAiBySlug } from "@/services/ai.service";
import { notFound } from "next/navigation";
import AiForm from "../form";

type Props = {
  params: { slug: string };
};

const AiSlug = async ({ params }: Props) => {
  const { slug } = params;
  const data = await getAiBySlug(slug);
  if (!data) notFound();

  return <AiForm actionFn={updateAiBySlug} initialValues={data} />;
};

export default AiSlug;
