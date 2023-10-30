import { AI, Tag, Video } from "@prisma/client";

export interface AIWithTags extends AI {
  tags: Tag[];
}

interface AIWithVideo extends AI {
  video: Video | null;
}

export type AIModel = AIWithTags & AIWithVideo;
