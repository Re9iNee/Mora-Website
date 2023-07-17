import Image from "next/image";
import React from "react";
import Chip from "../Chip";

type Props = {
    link: string;
};
const AICard = ({ link }: Props) => {
    return (
        <div className='flex flex-col gap-2 p-3 bg-gray-200 rounded-2xl'>
            <div className='bg-white rounded-lg grid place-items-center py-8'>
                <Image src='./logo.svg' alt='' width={40} height={40} />
            </div>

            <div className='flex-col flex gap-1'>
                <div className='inline-flex justify-between items-center'>
                    <h1 className='text-md font-bold'>Anima.Ai</h1>
                    <a
                        href={link}
                        target='_blank'
                        className='text-purple-500 text-3xl'
                    >
                        &gt;
                    </a>
                </div>

                <div className='inline-flex gap-1 flex-wrap items-center'>
                    <h5 className='text-xs font-semibold'>Advanced</h5>
                    <Chip>visual</Chip>
                    <Chip>video</Chip>
                    <Chip>2023</Chip>
                </div>

                <h5 className='text-xs font-extralight'>
                    Lorem ipsum dolor sit amet consectetur. Tincidunt sed duis
                    cursus turpis at magna sed dignissim.
                </h5>
            </div>
        </div>
    );
};

export default AICard;
