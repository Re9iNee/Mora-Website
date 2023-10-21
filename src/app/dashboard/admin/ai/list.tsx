import { DataTable } from "@/components/ui/data-table";
import { AI } from "./data/schema";
import { columns } from "./columns";

type Props = {
  AIs: AI[];
};
const AiList = ({ AIs }: Props) => {
  return (
    <DataTable name='ai-list' data={AIs} columns={columns} filterBy='title' />
  );
};

export default AiList;
