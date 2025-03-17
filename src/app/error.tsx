"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  const [errorMessage, setErrorMessage] = useState<string>(
    "An unexpected error occurred.",
  );
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);

    if (error instanceof Error) {
      if (error.message.includes("Network request failed")) {
        setErrorMessage(
          "Network connection error. Please check your internet connection.",
        );
      } else if (error.message.includes("Supabase")) {
        setErrorMessage("Supabase service error. Please try again later.");
      } else if (error.message.includes("404")) {
        setErrorMessage("Page not found.");
      }
    }
  }, [error]);

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded bg-white p-5 text-center shadow">
        <h1 className="mb-2 text-xl font-bold">Oops! Something went wrong.</h1>
        <p className="mb-4 text-gray-600">{errorMessage}</p>

        <Button variant="outline" onClick={handleHome}>
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
