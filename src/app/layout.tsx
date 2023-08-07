import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import AnuratiRegular from "next/font/local";
import { NextAuthProvider } from "./providers";

const logoFont = AnuratiRegular({
    src: "./fonts/Anurati-Regular.otf",
    variable: "--font-anurati",
});

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["200", "400", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "MORA - The AI Wiki Website",
    description: "Mora is a Wiki for AIs",
    themeColor: "#ffffff",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body
                className={`${notoSans.className} ${logoFont.variable} 
                bg-white
                dark:bg-slate-900 dark:text-slate-50`}
            >
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
