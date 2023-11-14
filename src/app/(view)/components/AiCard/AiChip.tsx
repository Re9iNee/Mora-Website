import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const AiChip = ({ children }: Props) => {
  return (
    <div className='text-xs p-1 px-2 rounded-xl shadow-sm bg-white dark:bg-slate-900 cursor-pointer'>
      {children}
    </div>
  );
};

export default AiChip;
