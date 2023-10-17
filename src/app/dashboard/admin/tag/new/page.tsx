import { createTag } from "@/services/tag.service";
import TagForm from "../form";

function TagCreatePage() {
  return <TagForm actionFn={createTag} />;
}

export default TagCreatePage;
