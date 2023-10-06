import { prisma } from "@/lib/prisma";
import { AI } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // return all AIs if slug not provided
    const AIs = await prisma.aI.findMany();
    return NextResponse.json(AIs);
  } catch (e) {
    console.error("Couldn't find AI, ", e);
    return NextResponse.json(e, { status: 404 });
  }
}

export async function POST(req: Request) {
  try {
    const newAi: AI = await req.json();

    const createdAi = await prisma.aI.create({ data: newAi });

    return NextResponse.json(
      {
        data: createdAi,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Couldn't create a new AI, ", err);
    return NextResponse.json(err, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const newAi: AI = await req.json();

    const updateAi = await prisma.aI.update({
      data: newAi,
      where: { id: newAi.id },
    });

    return NextResponse.json({ updateAi, newAi }, { status: 200 });
  } catch (e) {
    console.error("Couldn't update AI, ", e);
    return NextResponse.json(e, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id }: { id: string } = await req.json();

    const removedAi = await prisma.aI.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ removedAi }, { status: 200 });
  } catch (e) {
    console.error("Couldn't remove AI, ", e);
    return NextResponse.json(e, { status: 400 });
  }
}
