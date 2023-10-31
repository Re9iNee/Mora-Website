import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";
import { Tag, TagSchema } from "../../tag/schema";
import { VideoSchema } from "../../video/schema";

export const AiSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Must not have an special character",
    })
    .min(3)
    .max(50)
    .toLowerCase(),
  body: z.string(),
  tags: z.array(TagSchema),
  version: z.string().optional(),
  title: z.string().min(3).max(50),
  AI_release_date: z.date().nullish(),
  usage_link: z.string().url().optional(),
  origin_website: z.string().url().optional(),
  video: z.object({ name: z.string(), id: z.string() }).optional(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

// DIFFERENCES {
//     optional?: string | undefined;
//     nullable: string | null;
//     nullish?: string | null | undefined;
// }

export type AI = z.infer<typeof AiSchema> & {
  id: string;
  date_updated: string | Date;
  date_created: string | Date;
};
