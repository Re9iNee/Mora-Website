import Chip from "@/app/(view)/components/Chip";
import SearchInput from "@/app/(view)/components/SearchInput";
import React from "react";

const HeroFrame = () => {
  return (
    <section
      className='mx-4 flex flex-col gap-1 mt-8 max-w-screen-xl
            sm:py-14 sm:rounded-2xl sm:text-center sm:grid-cols-12 sm:grid sm:mx-auto'
    >
      <h1 className='text-2xl font-black uppercase sm:col-span-12'>
        <span className='text-gradient'>Discover</span> your
      </h1>
      <h1 className='text-2xl font-black uppercase sm:col-span-12'>
        Perfect <span className='text-gradient'>Ai Assistant</span>
      </h1>

      <SearchInput />
      <div
        className='flex flex-wrap gap-2 mb-4 sm:justify-center sm:col-span-8 sm:col-start-3
                xl:col-span-6 xl:col-start-4
                '
      >
        <Chip>Video generating ai</Chip>
        <Chip>Photo editing</Chip>
        <Chip>Coding</Chip>
        <Chip>Social media</Chip>
        <Chip>Dating</Chip>
      </div>
    </section>
  );
};

export default HeroFrame;
