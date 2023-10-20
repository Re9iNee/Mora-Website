import { Tag } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type Props = {
  data: Tag[];
};
function TagList({ data }: Props) {
  return <DataTable name='tag-list' data={data} columns={columns} />;
}

export default TagList;
