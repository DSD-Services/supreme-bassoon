"use client";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="px-14">
        <div className="flex flex-col items-center justify-center pt-12 sm:gap-2 md:flex-row md:justify-between">
          <Link href="/">
            <p>Home</p>
          </Link>
          <h1 className="text-4xl font-bold">Welcome to DSD Services!</h1>
          <div></div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="my-2 text-center text-2xl/9 font-bold tracking-tight text-[#215CFF]">
                Login
              </h2>
            </div>
            <LoginForm />

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Need to sign up?{" "}
              <Button asLink href="/register" variant="link" className="px-0">
                Register
              </Button>{" "}
              instead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
