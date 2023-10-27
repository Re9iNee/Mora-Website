"use server";

import { Video, VideoSchema } from "@/app/dashboard/admin/video/schema";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function getAllVideos() {
  const videos = await prisma.video.findMany({
    include: { ais: { select: { title: true, slug: true } } },
  });

  // show the most recent videos first
  return videos.reverse();
}

export async function createVideo(data: Video) {
  const result = VideoSchema.safeParse(data);
  if (result.success === false)
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", ")
    );

  const newVideo = await prisma.video.create({
    data: {
      ...result.data,
      ais: { connect: [{ slug: "amongst-gleefully" }] },
    },
  });

  revalidatePath("/dashboard/admin/video");

  return newVideo;
}

export async function deleteVideoById(id: string) {
  const video = await prisma.tag.delete({
    where: { id: id },
  });

  revalidatePath("/dashboard/admin/video");

  return video;
}

export async function getVideoById(id: string) {
  const video = await prisma.video.findUnique({
    where: { id },
    include: { ais: true },
  });

  return video;
}

export async function updateVideoById(data: Video, id?: string) {
  if (!id) throw new Error("Video ID is required");
  const result = VideoSchema.safeParse(data);
  if (result.success === false)
    throw new Error(
      result.error.issues.map((issue) => issue.message).join(", ")
    );

  const updatedTag = await prisma.video.update({
    where: { id },
    data: {
      ...result.data,
      ais: { connect: [{ slug: "amongst-gleefully" }] },
    },
  });

  revalidatePath("/dashboard/admin/tag");

  return updatedTag;
}
