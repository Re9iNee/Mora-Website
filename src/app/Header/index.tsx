import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import AnuratiFont from "next/font/local";
const logoFont = AnuratiFont({ src: "./Anurati-Regular.otf" });

const Header = () => {
    return (
        <div className='px-4 pt-4 pb-2 gap-6 flex justify-between'>
            <h1 className={`p-2 ${logoFont.className} logo text-xl`}>MORA</h1>

            <div className='flex gap-4 items-center'>
                <button className='text-xs text-white bg-purple-600 rounded-3xl px-3 py-2 cursor-pointer'>
                    Sign-up for Updates
                </button>
                <RxHamburgerMenu className='text-2xl cursor-pointer' />
            </div>
        </div>
    );
};

export default Header;
