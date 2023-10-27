import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { getAllVideos } from "@/services/video.service";
import Link from "next/link";
import VideoList from "./list";

export const metadata: Metadata = {
  title: "Videos List",
  description: "A List of All the Videos",
};

const VideoPage = async () => {
  const videos = await getAllVideos();

  return (
    <div className='h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-s2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Videos List</h2>
          <p className='text-muted-foreground'>Here&apos;s a list of Videos</p>
        </div>
        <Button asChild data-cy='create'>
          <Link href='video/new'>Create</Link>
        </Button>
      </div>
      <VideoList data={videos} />
    </div>
  );
};

export default VideoPage;
