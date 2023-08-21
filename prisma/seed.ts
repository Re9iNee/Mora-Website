import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

import * as dotenv from "dotenv";
dotenv.config(); // Load the environment variables

const prisma = new PrismaClient();

async function createAdmin() {
    // const credential = process.env.ADMINS_CREDENTIAL;
    // if (!credential)
    //     throw new Error("Please Add ADMINS_CREDENTIAL in .env file");

    // const [email, password] = credential.split(":");
    const hashedPassword = await hash("1234", 12);

    const newUser = await prisma.user.upsert({
        where: {
            email: "attarzadeh76@gmail.com",
        },
        create: {
            role: "ADMIN",
            name: "Reza Attarzadeh",
            password: hashedPassword,
            email: "attarzadeh76@gmail.com",
        },
        update: {
            name: "Agha Reza",
        },
    });

    console.log({ newUser });
}

createAdmin()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error("HAPPENED AN ERROR DURING DB SEED");

        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
