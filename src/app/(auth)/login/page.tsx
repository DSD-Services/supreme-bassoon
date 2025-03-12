"use client";

import { loginAction } from "@/features/auth/actions/login.action";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="px-14">
        <div className="pt-12 flex flex-col items-center justify-center md:flex-row md:justify-between sm:gap-2">
          <Link href="/">
            <p>Home</p>
          </Link>
          <h1 className="text-4xl font-bold">Welcome to DSD Services!</h1>
          <div></div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="rounded-lg shadow-lg p-6 bg-[#E2EAFF] mt-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-2 text-center text-2xl/9 font-bold tracking-tight text-[#215CFF]">Login</h2>
          </div>
              <form action={loginAction} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email:</label>
                  <div className="mt-2">
                    <input id="email" 
                      name="email" 
                      type="email" 
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

              {/* <div> */}
                <div className="flex items-center justify-between">
                  <label htmlFor="password"  className="block text-sm/6 font-medium text-gray-900">Password:</label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                <div/>
              </div>

              <div className="flex justify-center rounded-md bg-[#215CFF] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <button 
                  type="submit"
                  className="w-1/4"
                  >Log In</button>
              </div>
              
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Need to sign up?
              <a href="#" className="mx-1 font-semibold text-indigo-600 hover:text-indigo-500">
                Register
              </a>
              instead.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
