import Image from "next/image";
import mockData from "../mocks/ai-data.json";
import Chip from "../../components/Chip";
import Link from "next/link";

function AIView() {
  const data = mockData;

  return (
    <div className='text-neutral-950 dark:text-neutral-50'>
      {/* Hero Section */}
      <section className='pt-6 px-4 gap-3 flex flex-col'>
        <div className='rounded-2xl border-2 border-fuchsia-600 bg-white inline-flex justify-center items-center'>
          <Image src={data.logo} alt={data.logo_alt} width={176} height={48} />
        </div>
        <div className='flex justify-between'>
          <h1 className='text-lg font-extrabold leading-7'>{data.title}</h1>
          <h3 className='text-purple-700 text-sm font-semibold dark:text-purple-400'>
            {data.complexity_level}
          </h3>
        </div>
        <Link
          target='_blank'
          href={data.usage_link}
          className='text-center px-2 py-2.5 bg-gradient-to-l from-violet-500 to-violet-700 rounded-3xl text-sm font-semibold text-white'
        >
          Try &quot;{data.title}&quot;
        </Link>
        <div className='text-neutral-600 text-xs dark:text-neutral-200'>
          {data.body}
        </div>
        <div className='inline-flex justify-start items-center gap-2'>
          {data.tags.map((tag) => (
            <Chip key={tag.id}>{tag.name}</Chip>
          ))}
        </div>
      </section>
      {/* Video Section */}
      <section className='pt-12 px-4 flex flex-col gap-4 text-center'>
        <div className='text-center text-lg font-extrabold leading-7'>
          <h2>Get Started with</h2>
          <h2 className='text-purple-700 dark:text-purple-400'>{data.title}</h2>
        </div>
        <div className='w-72 h-36 rounded-3xl shadow'>
          <Link href={data.video.url} target='_blank'>
            <Image
              src={
                "https://mora-uploads.s3.eu-central-1.amazonaws.com/Video-Frame.png"
              }
              width={288}
              height={144}
              alt={data.video.description}
            />
          </Link>
        </div>
        <div className='text-xs leading-none'>{data.video.description}</div>
      </section>
      {/* Lesson Section */}
      {/* Update Section */}
      <section className='py-14 px-4 text-lg text-center'>
        <div className='leading-7 '>Want to learn more?</div>
        <Link
          target='_blank'
          className='text-purple-600 font-extrabold leading-loose dark:text-purple-400'
          href={`https://www.google.com/search?&q=${data.google_query_text
            .trim()
            .split(" ")
            .join("+")}`}
        >
          Read Latest Updates
        </Link>
      </section>
    </div>
  );
}

export default AIView;
