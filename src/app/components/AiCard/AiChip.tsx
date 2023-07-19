import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const AiChip = ({ children }: Props) => {
    return (
        <div className='text-xs p-1 px-2 rounded-xl shadow-sm bg-white'>
            {children}
        </div>
    );
};

export default AiChip;
