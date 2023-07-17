import BlogCard from "@/app/components/BlogCard";

import React from "react";
import blogPosts from "../../../../Mocks/BlogPosts.json";

const MasterYourAi = () => {
    return (
        <section className='p-4 mt-1'>
            <h1 className='text-2xl mb-2 font-bold'>Master Your Ai 🥇</h1>
            <h1 className='text-xs mb-6'>
                Learn and master your tools with in-depth blogs
            </h1>

            <div className='flex flex-col gap-4'>
                {blogPosts.map((post) => (
                    <BlogCard
                        key={post.id}
                        link={post.link}
                        tags={post.tags}
                        title={post.title}
                        image={post.image}
                        dateCreated={post.dateCreated}
                        description={post.description}
                    />
                ))}
            </div>
        </section>
    );
};

export default MasterYourAi;
