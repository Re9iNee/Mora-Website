import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
    return (
        <div className='relative text-gray-600 focus-within:text-gray-400 rounded-3xl shadow-md w-full'>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <button
                    type='submit'
                    className='p-1 focus:outline-none focus:shadow-outline'
                >
                    <FiSearch />
                </button>
            </span>

            <input
                type='search'
                autoComplete='off'
                placeholder='Search...'
                className='w-full py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900'
            />
        </div>
    );
};

export default SearchInput;
