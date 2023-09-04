import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";

export const AiSchema = z.object({
  slug: z.string(),
  body: z.string(),
  title: z.string(),
  version: z.string().optional(),
  AI_release_date: z.date().optional(),
  usage_link: z.string().url().optional(),
  origin_website: z.string().url().optional(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

export type AI = z.infer<typeof AiSchema>;
