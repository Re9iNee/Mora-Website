import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const Chip = ({ children }: Props) => {
    return (
        <div
            className='cursor-pointer text-xs text-slate-600 p-1 px-4 rounded-xl shadow-xl shadow-slate-100 z-10 bg-white
            dark:bg-gray-600 dark:shadow-none dark:text-slate-50
            '
        >
            {children}
        </div>
    );
};

export default Chip;
