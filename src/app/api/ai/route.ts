import { prisma } from "@/lib/prisma";
import { AI } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // read slug from request url

  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug)
      return NextResponse.json({ error: "No slug provided" }, { status: 400 });

    const ai = await prisma.aI.findUnique({
      where: {
        slug,
      },
    });

    return NextResponse.json(ai);
  } catch (e) {
    console.error("Couldn't find AI, ", e);
    return NextResponse.json(e, { status: 404 });
  }
}

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
