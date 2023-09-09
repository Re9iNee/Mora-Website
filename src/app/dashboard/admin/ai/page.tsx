import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { AI, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { AiSchema } from "./data/schema";
import AiList from "./list";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI List",
  description: "A List of All the AIs",
};

const prisma = new PrismaClient();

async function getAIs() {
  const AIs: AI[] = await prisma.aI.findMany();

  return z.array(AiSchema).parse(AIs);
}

const AiPage = async () => {
  const AIs = await getAIs();

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>AI List</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of AIs</p>
          <Button asChild data-cy='create'>
            <Link href='ai/new'>Create</Link>
          </Button>
        </div>
      </div>
      <AiList AIs={AIs} />
    </div>
  );
};

export default AiPage;
