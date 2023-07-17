import React from "react";

type Props = {
    children: string;
};
const BlogChip = ({ children }: Props) => {
    return (
        <div className='text-xs p-1 px-4 rounded-xl shadow-sm bg-gray-100 font-light text-purple-500'>
            {children}
        </div>
    );
};

export default BlogChip;
