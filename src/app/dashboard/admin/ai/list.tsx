import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { AIWithTags } from "./types/ai.types";

type Props = {
  AIs: AIWithTags[];
};
const AiList = ({ AIs }: Props) => {
  return (
    <DataTable name='ai-list' data={AIs} columns={columns} filterBy='title' />
  );
};

export default AiList;
