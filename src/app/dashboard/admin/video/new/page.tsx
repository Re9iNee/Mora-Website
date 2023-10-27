import { createVideo } from "@/services/video.service";
import VideoForm from "../form";

function VideoCreatePage() {
  return <VideoForm actionFn={createVideo} />;
}

export default VideoCreatePage;
