import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Navbar from "../components/Navbar";
// _app.js or _app.tsx
import "tailwindcss/tailwind.css";

import ClientProvider from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectVision",
  description: "Connect Anywhere Collaborate Everywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ClientProvider>
            <Navbar />
            <main className="mx-auto max-w-4xl px-3 py-6 ">{children}</main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
