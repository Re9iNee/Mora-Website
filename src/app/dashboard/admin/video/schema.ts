import { z } from "zod";
import { AiSchema } from "../ai/data/schema";

export const VideoSchema = z.object({
  url: z.string().url(),
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(500),
  ais: z.array(AiSchema.pick({ title: true, slug: true })),
});

export type Video = z.infer<typeof VideoSchema> & {
  id: string;
};
