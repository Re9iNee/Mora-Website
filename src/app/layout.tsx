import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import AnuratiRegular from "next/font/local";

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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={`${notoSans.className} ${logoFont.variable}`}>
                {children}
            </body>
        </html>
    );
}
