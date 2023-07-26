import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
    return (
        <div
            className='relative mt-8 mb-2
            sm:col-span-8 sm:col-start-3
            xl:col-span-6 xl:col-start-4
            '
        >
            <input
                type='search'
                placeholder='Video generating ai'
                className='block w-full text-sm p-4 shadow-2xl shadow-slate-200 border border-slate-200 text-gray-900 rounded-3xl bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none'>
                <FiSearch className='w-4 h-4 text-gray-500 dark:text-gray-400' />
            </div>
        </div>
    );
};

export default SearchInput;
