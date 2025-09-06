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
        <meta
          name="google-adsense-account"
          content="ca-pub-4454909616652906"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4454909616652906"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
