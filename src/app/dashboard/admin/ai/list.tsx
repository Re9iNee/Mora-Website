import { DataTable } from "@/components/ui/data-table";
import { AI } from "./data/schema";
import { columns } from "./columns";

type Props = {
  AIs: AI[];
};
const AiList = ({ AIs }: Props) => {
  return <DataTable data={AIs} columns={columns} />;
};

export default AiList;
