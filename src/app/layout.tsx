import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from "../lib/constants";

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
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400`}
      >
        {children}

        {/* Version Badge */}
        <div className="fixed bottom-2 right-2 text-xs text-gray-700 bg-white/70 px-2 py-1 rounded-md shadow-md">
          {APP_VERSION}
        </div>
      </body>
    </html>
  );
}
