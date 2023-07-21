import Chip from "@/app/components/Chip";
import SearchInput from "@/app/components/SearchInput";
import React from "react";

const HeroFrame = () => {
    return (
        <section
            className='mx-4 flex flex-col gap-1  items-stretch 
            sm:py-14 sm:px-24 sm:rounded-2xl sm:text-center sm:bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-600
            '
        >
            <h1 className='text-2xl font-black uppercase'>
                <span className='text-gradient'>Discover</span> your
            </h1>
            <h1 className='text-2xl font-black uppercase'>
                Perfect <span className='text-gradient'>Ai Assistant</span>
            </h1>

            <SearchInput />
            <div className='flex flex-wrap gap-2 mb-4 sm:justify-center'>
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
