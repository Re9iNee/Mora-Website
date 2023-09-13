import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

import * as dotenv from "dotenv";
dotenv.config(); // Load the environment variables

const prisma = new PrismaClient();

async function removeAllUsers() {
  const removedUsers = await prisma.user.deleteMany({
    where: {},
  });

  console.log("resetting users", removedUsers);
}

async function createAdmin() {
  const credential = process.env.ADMINS_CREDENTIAL;
  if (!credential) throw new Error("Please Add ADMINS_CREDENTIAL in .env file");

  const [email, password] = credential.split(":");
  const hashedPassword = await hash(password, 12);

  const newUser = await prisma.user.upsert({
    where: {
      email: email,
    },
    create: {
      email: email,
      role: "ADMIN",
      name: "Admin Test",
      password: hashedPassword,
    },
    update: {},
  });

  console.log("Upserted a new User", { newUser });
}

async function createAI() {
  const newAI = await prisma.aI.upsert({
    where: {
      slug: "runaway",
    },
    create: {
      slug: `runway-${Math.random() * 10}`,
      title: "Runway",
      body: "# Runway",
    },
    update: {
      slug: `runway-${Math.random() * 10}`,
      title: "Runway",
      body: "# Runway",
    },
  });

  console.log("Upserted a new AI", { newAI });
}

removeAllUsers()
  .then(createAdmin)
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("HAPPENED AN ERROR DURING DB SEED");

    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
