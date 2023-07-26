import AICard from "@/app/components/AiCard";
import React from "react";

const DiscoverLatestAi = () => {
    return (
        <section
            className='custom-gradient mt-8 p-4 pb-8 max-w-screen-xl
            sm:rounded-3xl sm:pt-8 sm:mx-16
            md:mx-20
            lg:mx-24
            xl:mx-28
            2xl:mx-auto
            '
        >
            <h1
                className='text-2xl text-white mb-2 font-black
                sm:text-center
                sm:text-4xl
                '
            >
                Discover Latest Ai 🚀
            </h1>
            <h1
                className='text-xs text-white mb-6
                sm:text-center
                sm:text-sm
                sm:mb-8
                '
            >
                Recently Added Ai, Suggested by the community !!
            </h1>

            <div>
                <AICard link='https://google.com' />
                <AICard link='https://google.com' />
                <AICard link='https://google.com' />
            </div>

            <h3
                className='hidden text-white text-xl font-semibold text-center 
                sm:block
                sm:mt-8
                '
            >
                Stay tuned for latest AI tools 😎
            </h3>
        </section>
    );
};

export default DiscoverLatestAi;
