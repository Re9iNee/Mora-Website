import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getAllAIs } from "@/services/ai.service";
import Link from "next/link";
import AiList from "./list";

export const metadata: Metadata = {
  title: "AI List",
  description: "A List of All the AIs",
};

const AiPage = async () => {
  const AIs = await getAllAIs();

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-s2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>AI List</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of AIs</p>
        </div>
        <Button asChild data-cy='create'>
          <Link id='create' href='ai/new'>
            Create
          </Link>
        </Button>
      </div>
      <AiList AIs={AIs} />
    </div>
  );
};

export default AiPage;
