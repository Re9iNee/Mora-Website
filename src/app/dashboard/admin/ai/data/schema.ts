import { ComplexityLevel } from "@prisma/client";
import { z } from "zod";

export const AiSchema = z.object({
  id: z.string().optional(),
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
  origin_website: z.string().url().optional(),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
  date_created: z.date().default(() => new Date()),
  date_updated: z.date().default(() => new Date()),
});

// DIFFERENCES {
//     optional?: string | undefined;
//     nullable: string | null;
//     nullish?: string | null | undefined;
// }

export type AI = z.infer<typeof AiSchema>;
