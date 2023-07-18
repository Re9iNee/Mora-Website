import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    return (
        <header className='px-4 pt-4 gap-6 flex justify-between'>
            <h1 className='p-2 font-anurati gradient-logo text-xl'>MORA</h1>

            <div className='flex gap-4 items-center'>
                <button className='text-xs text-white bg-purple-600 rounded-3xl px-3 py-2 cursor-pointer'>
                    Sign-up for Updates
                </button>
                <RxHamburgerMenu className='text-2xl cursor-pointer' />
            </div>
        </header>
    );
};

export default Header;
