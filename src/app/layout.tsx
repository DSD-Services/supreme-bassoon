import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
config.autoAddCss = false;

const sofiaSans = Sofia_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_API_URL)),
  title: {
    template: "%s | DSD Services",
    default: "DSD Services",
  },
  description: "Booking system for plumbing, electrical work and HVAC repairs.",
  keywords: ["plumbing", "electrical", "HVAC", "repairs", "services"],
  openGraph: {
    images: ["opengraph-image.png"],
    description:
      "Professional booking system for plumbing, electrical work and HVAC repair services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sofiaSans.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
