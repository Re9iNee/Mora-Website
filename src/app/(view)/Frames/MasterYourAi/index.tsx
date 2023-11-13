import BlogCard from "@/app/(view)/components/BlogCard";

import React from "react";
import blogPosts from "../../../../../__mocks__/BlogPosts.json";

const MasterYourAi = () => {
  return (
    <section
      className='p-4 mt-8 max-w-screen-xl 
                md:mx-20
                lg:mx-24
                xl:mx-28
                2xl:mx-auto'
    >
      <h1
        className='text-2xl mb-2 font-black
                sm:text-4xl sm:text-center
                '
      >
        Master Your Ai 🥇
      </h1>
      <h1
        className='text-xs mb-6 
                sm:text-sm
                sm:text-center
                '
      >
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
