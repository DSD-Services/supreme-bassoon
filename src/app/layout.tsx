import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
//import { Toaster } from "react-hot-toast";
config.autoAddCss = false; //

const sofiaSans = Sofia_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSD Services",
  description: "Electrical, HVAC & Plumbing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sofiaSans.className} antialiased`}>{children}</body>
    </html>
  );
}
