"use server";

import { AI, AiSchema } from "@/app/dashboard/admin/ai/data/schema";
import { AIModel, AIWithTags } from "@/app/dashboard/admin/ai/types/ai.types";
import { prisma } from "@/lib/prisma";
import { AI as PrismaAI } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAiBySlug({
  slug,
}: {
  slug: string;
}): Promise<AIModel | null> {
  const ai = await prisma.aI.findUnique({
    where: { slug },
    include: { tags: true, video: true },
  });

  return ai;
}

export async function getAIsByTitle({ title }: { title: string }) {
  const ais = await prisma.aI.findMany({
    take: 10,
    where: { title: { contains: title } },
  });

  return ais;
}

export async function getAllAIs(take?: number): Promise<AIWithTags[]> {
  const AIs: AIWithTags[] = await prisma.aI.findMany({
    take: take,
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

export async function updateAiById(data: AI, id?: string): Promise<PrismaAI> {
  try {
    if (!id) throw new Error("AI ID is required");
    const result = await AiSchema.parseAsync(data);

    const { tags, video } = result;

    const updatedAi = await prisma.aI.update({
      where: { id },
      data: {
        ...result,
        tags: { set: [...tags] },
        video: video ? { connect: { id: video.id } } : {},
      },
    });

    revalidatePath("/dashboard/admin/ai");

    return updatedAi;
  } catch (e) {
    throw new Error(`Couldn't update ai ${e}`);
  }
}
export async function createAi(data: AI): Promise<PrismaAI> {
  try {
    const result = await AiSchema.parseAsync(data);

    const { tags, video } = result;

    const createdAi = await prisma.aI.create({
      data: {
        ...result,
        tags: { connect: [...tags] },
        video: video ? { connect: { id: video.id } } : {},
      },
    });

    return createdAi;
  } catch (e) {
    throw new Error(`Couldn't create ai ${e}`);
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
