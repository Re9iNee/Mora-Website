"use client";

import { AIWithTags } from "@/app/dashboard/admin/ai/types/ai.types";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import AiChip from "./AiChip";
import { getImagePlaceholderUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AICard = ({
  tags,
  slug,
  logo,
  body,
  title,
  logo_alt,
  complexity_level,
}: AIWithTags) => {
  const router = useRouter();

  return (
    <div
      className='flex flex-col gap-2 p-3 bg-neutral-50 rounded-2xl mt-4 
      sm:flex-row
      dark:bg-gray-800
      '
    >
      <div
        className='bg-white rounded-xl justify-center items-center inline-flex shadow w-full h-28 relative
        sm:p-8 sm:w-28 sm:h-28
        dark:bg-slate-900
        '
      >
        <Image
          fill
          objectFit='contain'
          src={logo ?? getImagePlaceholderUrl()}
          alt={logo_alt ?? "logo icon for AI"}
        />
      </div>

      <div className='flex-col flex gap-1 sm:flex-grow'>
        <div className='inline-flex justify-between items-center py-1 pl-1'>
          <h1
            onClick={() => router.push(`ai/${slug}`)}
            className='text-sm font-extrabold hover:underline cursor-pointer'
          >
            {title}
          </h1>
          <a
            href={`/ai/${slug}`}
            target='_blank'
            className='text-purple-500 dark:text-slate-50 text-xs font-semibold 
            sm:inline-flex sm:items-center sm:p-1 sm:gap-1
            '
          >
            <span className='hidden sm:block'>Check it out</span>
            <IoIosArrowForward className='text-xl' />
          </a>
        </div>

        <div className='inline-flex gap-1 flex-wrap items-center'>
          <h5 className='text-xs p-1 dark:text-gray-400'>{complexity_level}</h5>
          {tags.map((tag) => (
            <AiChip key={tag.id}>{tag.name}</AiChip>
          ))}
        </div>

        <h5 className='text-xs p-1 dark:text-gray-400 line-clamp-1'>
          {body.split(" ").slice(0, 15).join(" ")}...
        </h5>
      </div>
    </div>
  );
};

export default AICard;
