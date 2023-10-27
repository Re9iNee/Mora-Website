import { getVideoById, updateVideoById } from "@/services/video.service";
import { notFound } from "next/navigation";
import VideoForm from "../form";

type Props = {
  params: { id: string };
};
async function VideoEditPage({ params }: Props) {
  const { id } = params;
  const data = await getVideoById(id);
  if (!data) notFound();

  return <VideoForm actionFn={updateVideoById} initialValues={data} />;
}

export default VideoEditPage;
