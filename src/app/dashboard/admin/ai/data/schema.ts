import { coerceToUndefined } from "@/lib/utils";
import { ComplexityLevel } from "@prisma/client";

import { coerce, z } from "zod";

export const AiSchema = z.object({
  body: z.string(),
  title: z.string().trim(),
  google_query_text: z.string().nullable().transform(coerceToUndefined),
  AI_release_date: z.date().nullish().transform(coerceToUndefined),
  slug: z.string().toLowerCase().trim(),
  version: z.coerce.string().trim().nullish().transform(coerceToUndefined),
  usage_link: z.coerce.string().url().nullish().transform(coerceToUndefined),
  origin_website: z.coerce
    .string()
    .url()
    .nullish()
    .transform(coerceToUndefined),
  date_created: z.date().default(new Date()),
  complexity_level: z.nativeEnum(ComplexityLevel).default("NORMAL"),
});

// DIFFERENCES {
//     optional?: string | undefined;
//     nullable: string | null;
//     nullish?: string | null | undefined;
// }

export type AI = z.infer<typeof AiSchema>;
