import { AI } from "@/app/dashboard/admin/ai/data/schema";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const newAi: AI = await req.json();
    const tags = newAi.tags;

    if (Object.keys(newAi).length === 0)
      return NextResponse.json(
        { error: "No AI update provided" },
        { status: 400 }
      );

    const updatedAi = await prisma.aI.update({
      data: {
        ...newAi,
        tags: { set: [...tags] },
      },
      where: { slug },
    });

    return NextResponse.json(updatedAi);
  } catch (e) {
    console.error("Couldn't update AI, ", e);
    return NextResponse.json(e, { status: 404 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // TODO: What if we enter the wrong slug or url?
    const { slug } = params;

    if (!slug)
      return NextResponse.json(
        { status: "error", message: "No slug provided" },
        { status: 400 }
      );

    const ai = await prisma.aI.findUnique({
      where: {
        slug,
      },
      include: {
        tags: true,
        video: true,
      },
    });

    return NextResponse.json(ai);
  } catch (e) {}
}
