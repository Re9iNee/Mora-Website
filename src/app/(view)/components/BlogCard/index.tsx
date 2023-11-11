import React from "react";
import RelativeImage from "../Image";
import Tags from "../../../../../interfaces/Tags";
import BlogChip from "./BlogChip";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  link: string;
  tags: Tags[];
  title: string;
  description: string;
  dateCreated: string;
  image: Record<"url" | "alt", string>;
};
const BlogCard = ({
  title,
  link,
  tags,
  image,
  description,
  dateCreated,
}: Props) => {
  return (
    <section
      className='p-4 px-6 flex flex-col gap-3 bg-white rounded-2xl shadow-2xl shadow-slate-200 dark:bg-gray-800 dark:shadow-none
            sm:flex-row sm:grid sm:grid-cols-12
            '
    >
      <RelativeImage link={image.url} alt={image.alt} />
      <div
        className='flex flex-col gap-3 
                sm:col-span-7
                '
      >
        <h1 className='font-extrabold'>{title}</h1>
        <span className='font-extralight text-xs p-1'>{dateCreated}</span>

        <p
          className='font-extralight p-1 font-xs dark:text-gray-400 
                    sm:line-clamp-3
                    '
        >
          {description}
        </p>
        <section className='inline-flex gap-1 flex-wrap items-center'>
          {tags.map((tag) => (
            <BlogChip key={tag.id}>{tag.text}</BlogChip>
          ))}
        </section>
        <Link
          href={link}
          className='text-gradient text-xs cursor-pointer self-end py-2 font-medium inline-flex items-center gap-1 dark:text-slate-50'
        >
          Continue Reading
          <IoIosArrowForward className='text-purple-800 dark:text-slate-50' />
        </Link>
      </div>
    </section>
  );
};

export default BlogCard;
