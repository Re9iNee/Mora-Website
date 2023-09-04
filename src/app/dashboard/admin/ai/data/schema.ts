import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";

export const aiSchema = z.object({
  slug: z.string(),
  body: z.string(),
  title: z.string(),
  version: z.string(),
  usage_link: z.string().url(),
  origin_website: z.string().url(),
  AI_release_date: z.date().optional(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

export type AI = z.infer<typeof aiSchema>;
