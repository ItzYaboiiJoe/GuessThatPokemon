import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_VERSION,
  SITE_URL,
} from "../lib/constants";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/pokeball.png`,
        width: 800,
        height: 600,
        alt: "Pokeball",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/pokeball.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gradient-to-b from-yellow-100 via-orange-300 to-red-500`}
      >
        {children}

        {/* Version Badge */}
        <div className="fixed bottom-2 right-2 text-xs text-gray-700 bg-white/70 px-2 py-1 rounded-md shadow-md">
          {APP_VERSION}
        </div>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
