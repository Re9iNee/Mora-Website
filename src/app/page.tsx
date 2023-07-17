import DiscoverLatestAi from "./Frames/DiscoverLatestAi";
import Header from "./Frames/Header";
import HeroFrame from "./Frames/HeroFrame";
import MasterYourAi from "./Frames/MasterYourAi";

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col gap-8'>
            <Header />

            <HeroFrame />

            <DiscoverLatestAi />

            <MasterYourAi />
        </main>
    );
}
