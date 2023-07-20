import React from "react";

const EmailSignUpInput = () => {
    return (
        <div
            className='hidden relative rounded-3xl shadow-sm
            sm:block
            sm:w-96
            '
        >
            <input
                type='email'
                name='subscribe-email'
                className='block w-full text-sm p-4 text-gray-900 rounded-3xl bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none
                custom-box-shadow 
                sm:text-sm
                sm:leading-6'
                placeholder='example@gmail.com'
            />
            <div className='absolute inset-y-0 right-0 flex items-center'>
                <button className='custom-gradient text-white text-sm font-semibold px-4 py-3 rounded-3xl'>
                    Sign-up for Updates
                </button>
            </div>
        </div>
    );
};

export default EmailSignUpInput;
