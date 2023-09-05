import { Metadata } from "next";
import { columns } from "./columns";

import { z } from "zod";
import { AI, PrismaClient } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { AiSchema } from "./data/schema";

export const metadata: Metadata = {
  title: "AI List",
  description: "A List of All the AIs",
};

const prisma = new PrismaClient();

async function getAIs() {
  const AIs: AI[] = await prisma.aI.findMany();

  return z.array(AiSchema).parse(AIs);
}

const AiList = async () => {
  const AIs = await getAIs();

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>AI List</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of AIs</p>
        </div>
      </div>
      <DataTable data={AIs} columns={columns} />
    </div>
  );
};

export default AiList;
