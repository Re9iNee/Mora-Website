import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnuratiRegular from "next/font/local";

const logoFont = AnuratiRegular({
    src: "./fonts/Anurati-Regular.otf",
    variable: "--font-anurati",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MORA - The AI Wiki Website",
    description: "Mora is a Wiki for AIs",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`${inter.className} ${logoFont.variable}`}>
                {children}
            </body>
        </html>
    );
}
