import React from "react";
import RelativeImage from "../Image";
import Tags from "../../../../interfaces/Tags";
import BlogChip from "./BlogChip";
import Link from "next/link";

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
        <section className='p-4 px-6 flex flex-col gap-3 bg-white rounded-2xl shadow-2xl'>
            <RelativeImage link={image.url} alt={image.alt} />
            <h1 className='font-bold'>{title}</h1>
            <span className='font-extralight text-xs'>{dateCreated}</span>
            <p className='font-extralight p-1'>{description}</p>

            <section className='inline-flex gap-1 flex-wrap items-center'>
                {tags.map((tag) => (
                    <BlogChip key={tag.id}>{tag.text}</BlogChip>
                ))}
            </section>
            <Link
                href={link}
                className='text-gradient cursor-pointer self-end py-2 font-semibold'
            >
                Continue Reading &gt;
            </Link>
        </section>
    );
};

export default BlogCard;
