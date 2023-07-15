import Chip from "@/app/components/Chip";
import SearchInput from "@/app/components/SearchInput";
import React from "react";

const HeroFrame = () => {
    return (
        <section className='text-purple-500 uppercase mx-4 flex flex-col gap-1  items-stretch'>
            <h1 className='text-2xl font-bold'>
                Discover <span className='text-black'>your</span>
            </h1>
            <h1 className='text-2xl font-bold'>
                <span className='text-black'>Perfect</span> Ai Assistant
            </h1>

            <SearchInput />
            <div className='flex flex-wrap text-black gap-1 mb-4'>
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
