import { Tag } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type Props = {
  data: Tag[];
};
function TagList({ data }: Props) {
  return <DataTable data={data} columns={columns} />;
}

export default TagList;
