import { getAiById, updateAiById } from "@/services/ai.service";
import { notFound } from "next/navigation";
import AiForm from "../form";

type Props = {
  params: { id: string };
};

const AiSlug = async ({ params }: Props) => {
  const { id } = params;
  const data = await getAiById(id);
  if (!data) notFound();

  return <AiForm actionFn={updateAiById} initialValues={data} />;
};

export default AiSlug;
