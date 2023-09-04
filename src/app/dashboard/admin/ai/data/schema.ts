import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";

export const AiSchema = z.object({
  slug: z.string(),
  body: z.string(),
  title: z.string(),
  usage_link: z.string().url(),
  version: z.string().optional(),
  origin_website: z.string().url(),
  AI_release_date: z.date().optional(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

// TODO use the type in prisma client
export type AI = z.infer<typeof AiSchema>;
