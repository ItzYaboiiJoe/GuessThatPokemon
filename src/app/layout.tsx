import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import { APP_DESCRIPTION, APP_NAME } from "../lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400`}
      >
        {children}
      </body>
    </html>
  );
}
