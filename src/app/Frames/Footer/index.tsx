import Image from "next/image";

const Footer = () => {
    return (
        <footer className='mt-16 p-10 pt-6 flex flex-col items-center gap-8 bg-white rounded-t-3xl'>
            <Image
                src='/MORA.png'
                alt='footer-mora-logo'
                width={178}
                height={62}
            />

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
