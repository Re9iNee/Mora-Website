"use server";

import { AI, AiSchema } from "@/app/dashboard/admin/ai/data/schema";
import { AIModel, AIWithTags } from "@/app/dashboard/admin/ai/types/ai.types";
import { prisma } from "@/lib/prisma";
import { AI as PrismaAI, Tag } from "@prisma/client";
import { revalidatePath } from "next/cache";

type createParams = {
  data: AI;
};
export async function createAi({ data }: createParams): Promise<PrismaAI> {
  try {
    const result = await AiSchema.parseAsync(data);

    const { tags, video } = result;

    const createdAi = await prisma.aI.create({
      data: {
        ...result,
        tags: { connect: [...tags] },
        video: { connect: { id: video?.id } },
      },
    });

    return createdAi;
  } catch (e) {
    throw new Error(`Couldn't create ai ${e}`);
  }
}

export async function getAIsByTitle({ name }: { name: string }) {
  const ais = await prisma.aI.findMany({
    where: { title: { contains: name } },
    take: 10,
  });

  return ais;
}

export async function getAllAIs(): Promise<AIWithTags[]> {
  const AIs: AIWithTags[] = await prisma.aI.findMany({
    include: { tags: true },
    orderBy: { date_created: "desc" },
  });

  return AIs;
}

export async function getAiById(id: string): Promise<AIModel | void> {
  const ai = await prisma.aI.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
      video: true,
    },
  });

  if (!ai) return;

  return ai;
}

type updateParams = {
  data: AI;
  id?: string;
};
export async function updateAiById({
  id,
  data,
}: updateParams): Promise<PrismaAI> {
  try {
    if (!id) throw new Error("AI ID is required");
    const result = await AiSchema.parseAsync(data);

    const { tags, video } = result;

    const updatedAi = await prisma.aI.update({
      where: { id },
      data: {
        ...result,
        tags: { set: [...tags] },
        video: { connect: { id: video?.id } },
      },
    });

    revalidatePath("/dashboard/admin/ai");

    return updatedAi;
  } catch (e) {
    throw new Error(`Couldn't update ai ${e}`);
  }
}

export async function deleteAiById(id: string): Promise<PrismaAI> {
  try {
    const removedAi = await prisma.aI.delete({ where: { id } });

    revalidatePath("/dashboard/admin/ai");

    return removedAi;
  } catch (e) {
    throw new Error(`Couldn't delete ai ${e}`);
  }
}
