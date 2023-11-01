import { z } from "zod";

export const QuestionSchema = z.object({
  answer: z.string(),
  name: z.string().min(3).max(100),
  possible_answers: z.array(
    z.object({ text: z.string(), correct: z.boolean() })
  ),
});

export type Question = z.infer<typeof QuestionSchema> & {
  id: string;
};
