import { AI, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json({ status: 200, msg: "Message to show" });
}

export async function POST(req: Request) {
  try {
    const newAi: AI = await req.json();

    console.log(newAi);

    const createdAi = await prisma.aI.create({ data: newAi });

    return NextResponse.json({
      status: 201,
      msg: "Created",
      data: createdAi,
    });
  } catch (err) {
    console.error("Couldn't create a new AI, ", err);
  }
}
