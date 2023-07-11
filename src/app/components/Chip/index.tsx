import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
const Chip = ({ children }: Props) => {
    return (
        <div className='rounded-3xl shadow-sm py-1 px-4 bg-white'>
            {children}
        </div>
    );
};

export default Chip;
