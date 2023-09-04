import { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { taskSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), "Mocks"));

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const List = async () => {
  const tasks = await getTasks();

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
};

export default List;
