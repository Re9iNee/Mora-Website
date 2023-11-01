"use server";

import {
  Question,
  QuestionSchema,
} from "@/app/dashboard/admin/question/schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllQuestions() {
  const questions = await prisma.question.findMany();

  // show the most recent questions first
  return questions.reverse();
}

export async function deleteQuestionById(id: string) {
  const question = await prisma.question.delete({
    where: { id },
  });

  revalidatePath("/dashboard/admin/question");

  return question;
}

export async function createQuestion(data: Question) {
  const result = QuestionSchema.safeParse(data);
  if (result.success === false)
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", ")
    );

  const newQuestion = await prisma.question.create({
    data: { ...result.data },
  });

  revalidatePath("/dashboard/admin/question");

  return newQuestion;
}
