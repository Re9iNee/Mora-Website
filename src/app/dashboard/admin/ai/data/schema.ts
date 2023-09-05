import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";

export const AiSchema = z.object({
  slug: z.string(),
  body: z.string(),
  title: z.string(),
  version: z.string().nullish(),
  AI_release_date: z.date().nullish(),
  usage_link: z.string().url().nullish(),
  origin_website: z.string().url().nullish(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

// DIFFERENCES {
//     optional?: string | undefined;
//     nullable: string | null;
//     nullish?: string | null | undefined;
// }

export type AI = z.infer<typeof AiSchema>;
