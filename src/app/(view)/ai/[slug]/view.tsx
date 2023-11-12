import { AIModel } from "@/app/dashboard/admin/ai/types/ai.types";
import { getGoogleQueryTextUrl, getImagePlaceholderUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Chip from "../../components/Chip";

type Props = {
  data: AIModel;
};
function AIView({ data }: Props) {
  return (
    <div className='text-neutral-950 dark:text-neutral-50'>
      {/* Hero Section - until Medium screen sizes. the layout differs a lot from medium thats why i hide this section and use the second one */}
      <section
        className='pt-6 px-4 gap-3 flex flex-col
        md:hidden
        '
      >
        <div className='rounded-2xl border-2 border-fuchsia-600 bg-white inline-flex justify-center items-center'>
          <Image
            src={data.logo ?? getImagePlaceholderUrl()}
            alt={data.logo_alt ?? `Logo Image for ${data.title}`}
            width={176}
            height={48}
          />
        </div>
        <div className='flex justify-between'>
          <h1 className='text-lg font-extrabold leading-7'>{data.title}</h1>
          <h3 className='text-purple-700 text-sm font-semibold dark:text-purple-400'>
            {data.complexity_level}
          </h3>
        </div>
        <Link
          target='_blank'
          href={data.usage_link ?? "#"}
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
      {/* AI Header - The layout is completely different in Medium and above screen sizes thats why I created another layout */}
      <section
        className='hidden
        md:flex md:flex-col md:gap-2 md:pt-6 md:px-4
        '
      >
        <div className='flex items-start'>
          <div className='flex gap-4 p-2 flex-grow'>
            <div className='w-32 h-32 px-2 bg-white rounded-2xl border-2 border-fuchsia-600 grid items-center'>
              <Image
                width={112}
                height={128}
                src={data.logo ?? getImagePlaceholderUrl()}
                alt={data.logo_alt ?? `Video Thumbnail for ${data.title}`}
              />
            </div>
            <div className='flex flex-col justify-between'>
              <h1 className='text-xl font-extrabold'>{data.title}</h1>
              <div className='flex gap-4 justify-between text-sm font-semibold'>
                <h3 className='leading-tight'>Level</h3>
                <h3 className='text-purple-700 dark:text-purple-400'>
                  {data.complexity_level}
                </h3>
              </div>
              <div className='flex gap-2'>
                {data.tags.map((tag) => (
                  <Chip key={tag.id}>{tag.name}</Chip>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col p-2 text-center gap-3'>
            <Link
              target='_blank'
              href={data.usage_link ?? "#"}
              className='text-center w-48 h-11 py-2.5 bg-gradient-to-l from-violet-500 to-violet-700 rounded-3xl font-semibold text-white'
            >
              Try &quot;{data.title}&quot;
            </Link>
            <Link
              href={data.origin_website ?? "#"}
              target='_blank'
              className='underline text-neutral-600 text-xs font-medium'
            >
              View Pricing List
            </Link>
          </div>
        </div>
        <div className='text-neutral-600 text-sm leading-tight dark:text-neutral-200'>
          {data.body}
        </div>
      </section>

      {/* Video Section */}
      <section
        className='pt-12 px-4 flex flex-col gap-4 items-center text-center
        md:pt-14 md:gap-8 md:items-center
        '
      >
        <div
          className='text-center text-lg font-extrabold leading-7 md:text-3xl md:leading-9 md:flex-col md:flex md:gap-2
          '
        >
          <h2>Get Started with</h2>
          <h2 className='text-purple-700 dark:text-purple-400'>{data.title}</h2>
        </div>

        <Link
          target='_blank'
          href={data.video?.url ?? "#"}
          className='relative w-72 h-36 rounded-3xl shadow 
          md:w-96 md:h-64'
        >
          <Image
            fill
            src={
              "https://mora-uploads.s3.eu-central-1.amazonaws.com/video-placeholder.jpeg"
            }
            className='rounded-3xl'
            alt={data.video?.description ?? `Video Thumbnail for ${data.title}`}
          />
        </Link>

        <div
          className='text-xs leading-none 
          md:text-lg md:leading-7
          '
        >
          {data.video?.description}
        </div>
      </section>
      {/* Lesson Section */}
      {/* Update Section */}
      <section
        className='py-14 px-4 text-lg text-center
        md:py-16 md:px-0 md:text-2xl
        '
      >
        <div className='leading-7 md:leading-loose'>Want to learn more?</div>
        <Link
          target='_blank'
          href={getGoogleQueryTextUrl(data.google_query_text)}
          className='text-purple-600 font-extrabold leading-loose dark:text-purple-400
          md:leading-9
          '
        >
          Read Latest Updates
        </Link>
      </section>
    </div>
  );
}

export default AIView;
