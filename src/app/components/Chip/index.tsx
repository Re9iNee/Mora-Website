import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const Chip = ({ children }: Props) => {
    return (
        <div
            className='text-xs p-1 px-4 rounded-xl shadow-sm bg-white
            dark:bg-gray-600
            '
        >
            {children}
        </div>
    );
};

export default Chip;
