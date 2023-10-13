import { Tag } from "@prisma/client";

type Props = {
  data: Tag[];
};
function TagList({ data }: Props) {
  return (
    <div>
      {data.map((tag) => (
        <p key={tag.id}>{tag.name}</p>
      ))}
    </div>
  );
}

export default TagList;
