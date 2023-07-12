import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const Chip = ({ children }: Props) => {
    return (
        <div className='text-xs p-1 px-4 rounded-xl shadow-sm bg-white'>
            {children}
        </div>
    );
};

export default Chip;
