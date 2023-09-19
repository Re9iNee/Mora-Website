import { prisma } from "@/lib/prisma";
import { AI } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const newAi: AI = await req.json();

    console.log(newAi);

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
