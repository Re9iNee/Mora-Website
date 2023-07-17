import AICard from "@/app/components/AiCard";
import React from "react";

const DiscoverLatestAi = () => {
    return (
        <section className='bg-purple-500 flex flex-col items-stretch p-4 pb-8'>
            <h1 className='text-2xl text-white mb-2 font-bold'>
                Discover Latest Ai 🚀
            </h1>
            <h1 className='text-xs text-white mb-6'>
                Recently Added Ai, Suggested by the community !!
            </h1>

            <div className='flex flex-col gap-4'>
                <AICard link='https://google.com' />
                <AICard link='https://google.com' />
                <AICard link='https://google.com' />
            </div>
        </section>
    );
};

export default DiscoverLatestAi;
