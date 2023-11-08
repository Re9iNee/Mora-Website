import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";
import { TagSchema } from "../../tag/schema";

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
  version: z.string().nullish(),
  logo_alt: z.string().nullish(),
  title: z.string().min(3).max(50),
  logo: z.string().url().nullish(),
  AI_release_date: z.date().nullish(),
  usage_link: z.string().url().nullish(),
  origin_website: z.string().url().nullish(),
  video: z.object({ name: z.string(), id: z.string() }).nullish(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
  google_query_text: z.string().nullish(),
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
