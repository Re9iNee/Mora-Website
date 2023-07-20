import Image from "next/image";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import AiChip from "./AiChip";

type Props = {
    link: string;
};
const AICard = ({ link }: Props) => {
    return (
        <div
            className='flex flex-col gap-2 p-3 bg-neutral-50 rounded-2xl 
            sm:flex-row
            '
        >
            <div
                className='bg-white rounded-lg grid place-items-center py-8 shadow
                sm:p-8
                '
            >
                <Image src='./logo.svg' alt='' width={40} height={40} />
            </div>

            <div className='flex-col flex gap-1'>
                <div className='inline-flex justify-between items-center py-1 pl-1'>
                    <h1 className='text-sm font-extrabold'>Anima.Ai</h1>
                    <a
                        href={link}
                        target='_blank'
                        className='text-purple-500 text-xs font-semibold 
                        sm:inline-flex
                        sm:items-center
                        sm:p-1
                        sm:gap-1'
                    >
                        <span className='hidden sm:block'>Check it out</span>
                        <IoIosArrowForward className='text-xl' />
                    </a>
                </div>

                <div className='inline-flex gap-1 flex-wrap items-center'>
                    <h5 className='text-xs p-1'>Advanced</h5>
                    <AiChip>visual</AiChip>
                    <AiChip>video</AiChip>
                    <AiChip>2023</AiChip>
                </div>

                <h5 className='text-xs p-1'>
                    Lorem ipsum dolor sit amet consectetur. Tincidunt sed duis
                    cursus turpis at magna sed dignissim.
                </h5>
            </div>
        </div>
    );
};

export default AICard;
