import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    type: "email",
                    label: "E-Mail",
                    placeholder: "example@mail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "********",
                },
            },
            async authorize(credentials, req): Promise<User | null> {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (
                    !user ||
                    !(await compare(credentials.password, user.password))
                ) {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            },
            type: "credentials",
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
