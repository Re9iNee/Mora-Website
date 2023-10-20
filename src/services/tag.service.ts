"use server";

import { Tag, TagSchema } from "@/app/dashboard/admin/tag/schema";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}

export async function createTag(data: Tag) {
  const newName = data.name.trim();
  const result = TagSchema.safeParse(data);
  if (result.success === false)
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", ")
    );

  const existingTag = await prisma.tag.findUnique({
    where: { name: newName.toString() },
  });
  if (existingTag) throw new Error("Tag already exists");

  const newTag = await prisma.tag.create({
    data: {
      name: newName.toString(),
    },
  });

  revalidatePath("/dashboard/admin/tag");

  return newTag;
}

export async function deleteTagById(id: string) {
  const tag = await prisma.tag.delete({
    where: { id: id },
  });

  revalidatePath("/dashboard/admin/tag");

  return tag;
}

export async function getTagById(id: string) {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  return tag;
}

export async function updateTagById(data: Tag, id?: string): Promise<Tag> {
  if (!id) throw new Error("Tag ID is required");
  const result = TagSchema.safeParse(data);
  if (result.success === false)
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", ")
    );

  const updatedTag = await prisma.tag.update({
    where: { id },
    data: {
      name: data.name.trim(),
    },
  });

  revalidatePath("/dashboard/admin/tag");

  return updatedTag;
}
