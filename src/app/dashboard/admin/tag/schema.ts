import { z } from "zod";

export const TagSchema = z.object({
  name: z.string().min(3).max(50),
});

export type Tag = z.infer<typeof TagSchema> & {
  id: string;
};
