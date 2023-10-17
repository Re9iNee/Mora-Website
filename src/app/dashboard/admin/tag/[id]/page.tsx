import { getTagById, updateTagById } from "@/services/tag.service";
import { notFound } from "next/navigation";
import TagForm from "../form";

type Props = {
  params: { id: string };
};
async function TagEditPage({ params }: Props) {
  const { id } = params;
  const data = await getTagById(id);
  if (!data) notFound();

  return <TagForm actionFn={updateTagById} initialValues={data} />;
}

export default TagEditPage;
