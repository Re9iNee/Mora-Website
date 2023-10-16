"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}

export async function createTag(formData: FormData) {
  const newName = formData.get("name");
  if (!newName) return "No name provided";

  const existingTag = await prisma.tag.findUnique({
    where: { name: newName.toString() },
  });
  if (existingTag) return "Tag already exists";

  const newTag = await prisma.tag.create({
    data: {
      name: newName.toString(),
    },
  });

  revalidatePath("/dashboard/admin/tag");

  return newTag;
}
