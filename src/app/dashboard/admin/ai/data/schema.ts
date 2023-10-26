import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";
import { Tag, TagSchema } from "../../tag/schema";

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
  title: z.string().min(3).max(50),
  version: z.string().optional(),
  AI_release_date: z.date().nullish(),
  usage_link: z.string().url().optional(),
  tags: z.array(z.string()),
  origin_website: z.string().url().optional(),
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
