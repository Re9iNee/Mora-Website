import Header from "./Frames/Header";
import HeroFrame from "./Frames/HeroFrame";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col gap-8'>
            <Header />

            <HeroFrame />
        </main>
    );
}
