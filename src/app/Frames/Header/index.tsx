import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    return (
        <header className='px-4 pt-4 gap-6 flex justify-between'>
            <div className='inline-flex items-center gap-2'>
                <h1 className='p-2 font-anurati gradient-logo text-xl sm:text-2xl'>
                    MORA
                </h1>
                <Link
                    className='p-2 text-xs hidden sm:block'
                    href={"/categories"}
                >
                    Categories
                </Link>
                <Link className='p-2 text-xs hidden sm:block' href={"/blog"}>
                    Blog
                </Link>
            </div>

            <div className='flex gap-4 items-center'>
                {/* TODO: BG gradient */}
                <button className='text-xs text-white bg-purple-600 rounded-3xl px-3 py-2 cursor-pointer font-bold'>
                    Sign-up for Updates
                </button>
                <RxHamburgerMenu className='cursor-pointer sm:hidden' />
            </div>
        </header>
    );
};

export default Header;
