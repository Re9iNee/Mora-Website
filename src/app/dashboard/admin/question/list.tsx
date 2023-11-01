import { Question } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

type Props = {
  data: Question[];
};
function QuestionList({ data }: Props) {
  return (
    <DataTable
      data={data}
      columns={columns}
      name='question-list'
      filterBy='name'
    />
  );
}

export default QuestionList;
