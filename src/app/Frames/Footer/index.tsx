import EmailSignUpInput from "./EmailSignUpInput";

const Footer = () => {
    return (
        <footer
            className='mt-16 p-10 pt-6 flex flex-col items-center gap-8 bg-white rounded-t-largest footer-shadow-mobile dark:bg-gray-800
            sm:col-span-12 sm:grid sm:grid-cols-12
            '
        >
            <section className='text-center sm:col-span-12'>
                <h2
                    className='gradient-logo font-anurati text-4xl font-black
                    sm:text-5xl sm:drop-shadow-lg
                    '
                >
                    MORA
                </h2>
                <h4
                    className='gradient-logo font-extralight tracking-widest
                    sm:text-xl sm:drop-shadow-lg
                    '
                >
                    Do More with Less Work
                </h4>
            </section>

            <button
                className='custom-gradient text-white text-sm font-semibold px-4 py-3 rounded-3xl
                sm:hidden
                '
            >
                Sign-up for Updates
            </button>

            <EmailSignUpInput />

            <p className='text-xs font-light text-gray-500 text-center sm:col-span-12 dark:text-gray-400'>
                By signing up to MORA, You’ll receive updates directly in your
                inbox.
            </p>
        </footer>
    );
};

export default Footer;
