import { Metadata } from "next";

import { getAllTags } from "@/services/tag.service";
import TagList from "./list";

export const metadata: Metadata = {
  title: "Tags List",
  description: "A List of All the Tags",
};

const AiPage = async () => {
  const tags = await getAllTags();

  return (
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-s2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Tags List</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of Tags</p>
        </div>
      </div>
      <TagList data={tags} />
    </div>
  );
};

export default AiPage;
