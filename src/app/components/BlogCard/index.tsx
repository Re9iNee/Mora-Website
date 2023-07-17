import Image from "next/image";
import React from "react";
import RelativeImage from "../Image";
import Chip from "../Chip";
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
        <section className='p-4 px-6 flex flex-col gap-3 bg-white rounded-2xl shadow-xl'>
            <RelativeImage link={image.url} alt={image.alt} />
            <h1 className='font-bold'>{title}</h1>
            <section className='inline-flex gap-1 flex-wrap items-center'>
                <span className='font-extralight text-xs'>{dateCreated}</span>
                {tags.map((tag) => (
                    <BlogChip key={tag.id}>{tag.text}</BlogChip>
                ))}
            </section>
            <p className='font-extralight p-1'>{description}</p>

            <Link
                href={link}
                className='cursor-pointer self-end py-2 text-purple-500 font-semibold'
            >
                Continue Reading &gt;
            </Link>
        </section>
    );
};

export default BlogCard;
