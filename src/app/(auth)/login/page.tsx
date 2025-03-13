"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/features/auth/actions/login.action";
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
            <form action={loginAction} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email:
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="bg-white"
                    required
                  />
                </div>
              </div>

              {/* <div> */}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password:
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="bg-white"
                  required
                />
                <div />
              </div>

              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>

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
