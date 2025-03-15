"use client";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/auth/components/login-form";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="md:w-1/4">
          <Button asLink variant="ghost" href="/">
            <FontAwesomeIcon icon={faLeftLong} />
            Home
          </Button>
        </div>
        <h1 className="text-center text-3xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4">
          Welcome to DSD Services!
        </h1>
        <div className="md:w-1/4"></div>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8">
        <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-2 text-center text-2xl font-bold tracking-tight text-[#215CFF]">
              Login
            </h2>
          </div>

          <LoginForm />

          <p className="mt-4 text-center text-sm text-gray-500">
            Need to sign up?{" "}
            <Button asLink href="/register" variant="link" className="px-0">
              Register
            </Button>{" "}
            instead.
          </p>
        </div>
      </div>
    </div>
  );
}
