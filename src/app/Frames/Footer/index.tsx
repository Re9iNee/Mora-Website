const Footer = () => {
    return (
        <footer className='mt-16 p-10 pt-6 flex flex-col items-center gap-8 bg-white rounded-t-3xl'>
            <section className='text-center'>
                <h2 className='gradient-logo font-anurati'>MORA</h2>
                <h4 className='gradient-logo'>Do More with Less Work</h4>
            </section>

            <button className='bg-purple-600 text-white text-sm font-semibold px-4 py-3 rounded-3xl'>
                Sign-up for Updates
            </button>

            <p className='text-xs font-light text-gray-500 text-center'>
                By signing up to MORA, You’ll receive updates directly in your
                inbox.
            </p>
        </footer>
    );
};

export default Footer;
