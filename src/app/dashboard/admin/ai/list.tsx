import { Metadata } from "next";
import { columns } from "./columns";
import { DataTable } from "../../../../components/ui/data-table";
import { payments } from "./data/payment";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// async function getTasks() {
//   const data = await fs.readFile(path.join(process.cwd(), "Mocks"));

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

const AiList = async () => {
  //   const tasks = await getTasks();

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <p className='text-muted-foreground'>Here&apos;s a list of AIs</p>
      </div>
      <DataTable data={payments} columns={columns} />
    </div>
  );
};

export default AiList;
