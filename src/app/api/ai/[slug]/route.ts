import { prisma } from "@/lib/prisma";
import { AI } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const newAi: AI = await req.json();

    if (Object.keys(newAi).length === 0)
      return NextResponse.json(
        { error: "No AI update provided" },
        { status: 400 }
      );

    const updatedAi = await prisma.aI.update({ data: newAi, where: { slug } });

    return NextResponse.json(updatedAi);
  } catch (e) {
    console.error("Couldn't update AI, ", e);
    return NextResponse.json(e, { status: 404 });
  }
}
