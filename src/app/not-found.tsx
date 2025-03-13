import Footer from "@/components/footer";
import { HomeHeader } from "@/components/header/header";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <>
      <HomeHeader />
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          Return to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
