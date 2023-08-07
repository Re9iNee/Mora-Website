import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
                const user: User = {
                    id: "1",
                    name: "Admin",
                    email: "attarzadeh76@gmail.com",
                };

                return user;
            },
            type: "credentials",
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
