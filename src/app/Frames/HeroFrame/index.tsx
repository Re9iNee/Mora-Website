import Chip from "@/app/components/Chip";
import SearchInput from "@/app/components/SearchInput";
import React from "react";

const HeroFrame = () => {
    return (
        <section className='uppercase mx-4 flex flex-col gap-1  items-stretch sm:py-14 sm:px-24 sm:rounded-2xl sm:text-center hero-frame-background'>
            <h1 className='text-2xl font-bold'>
                <span className='text-purple-500'>Discover</span> your
            </h1>
            <h1 className='text-2xl font-bold'>
                Perfect <span className='text-purple-500'>Ai Assistant</span>
            </h1>

            <SearchInput />
            <div className='flex flex-wrap gap-1 mb-4 sm:justify-center'>
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
