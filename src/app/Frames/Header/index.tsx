"use client";

import Link from "next/link";
import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data: session } = useSession();

    return (
        <header
            className='px-4 pt-4 pb-1 gap-6 flex justify-between max-w-screen-xl mx-auto border-b border-slate-100 dark:border-slate-800
            sm:col-span-12
            '
        >
            <div className='inline-flex items-center gap-2'>
                <h1
                    className='p-2 font-anurati gradient-logo text-xl 
                    sm:text-2xl
                    '
                >
                    MORA
                </h1>
                <Link
                    className='p-2 text-xs hidden 
                    sm:block
                    '
                    href={"/categories"}
                >
                    Categories
                </Link>
                <Link
                    className='p-2 text-xs hidden 
                    sm:block
                    '
                    href={"/blog"}
                >
                    Blog
                </Link>

                {session ? (
                    <button onClick={() => signOut()}>Sign Out</button>
                ) : (
                    <button onClick={() => signIn()}>Sign In</button>
                )}
            </div>

            <div className='flex gap-4 items-center'>
                {/* TODO: BG gradient */}
                <button className='custom-gradient text-xs text-white bg-purple-600 rounded-3xl px-3 py-2 cursor-pointer font-bold'>
                    Sign-up for Updates
                </button>
                <RxHamburgerMenu className='cursor-pointer sm:hidden' />
            </div>
        </header>
    );
};

export default Header;
