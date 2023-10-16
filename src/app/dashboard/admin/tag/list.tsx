import { Tag } from "@prisma/client";
import TagsForm from "./form";

type Props = {
  data: Tag[];
};
function TagList({ data }: Props) {
  return (
    <div>
      {data.map((tag) => (
        <p key={tag.id}>{tag.name}</p>
      ))}

      <TagsForm />
    </div>
  );
}

export default TagList;
