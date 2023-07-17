import Image from "next/image";
import React from "react";

type Props = {
    alt: string;
    link: string;
};
const RelativeImage = ({ link, alt }: Props) => {
    return (
        <div className='relative w-full h-40'>
            <Image
                fill
                alt={alt}
                src={link}
                objectFit='cover'
                className='rounded-xl'
            />
        </div>
    );
};

export default RelativeImage;
