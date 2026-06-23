import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/styles/frontend.css";
import Cursor from "@/components/Cursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EduMark Education Consultancy | Biratnagar, Nepal",
  description:
    "Study abroad, test preparations, and visa counseling assistance services from Biratnagar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable}`}
    >
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}