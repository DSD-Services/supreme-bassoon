import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { LoginForm } from "@/features/auth/components/login-form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid place-items-center md:flex-row">
        <h1 className="text-center text-2xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4 md:text-3xl">
          Welcome to DSD Services!
        </h1>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center p-4 md:p-6 lg:px-8">
        <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold tracking-tight text-blue-700">
              Login
            </h2>
          </div>

          <Suspense
            fallback={
              <form className="space-y-2.5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-blue-800"
                  >
                    Email
                  </label>
                  <Input type="email" className="bg-white" />
                </div>

                <div>
                  <div className="flex items-center justify-between pt-2">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-blue-800"
                    >
                      Password
                    </label>
                  </div>
                  <PasswordInput className="bg-white" />
                  <div className="flex justify-end pt-1 pb-2 text-sm">
                    <Link
                      href="/forgot-password"
                      className="self-end font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            }
          >
            <LoginForm />
          </Suspense>

          <p className="mt-4 text-center text-sm text-gray-500">
            Need to sign up?{" "}
            <Button
              asLink
              href="/register"
              variant="link"
              className="px-0 text-blue-700"
            >
              Register
            </Button>{" "}
            instead.
          </p>
        </div>
      </div>
      <div className="flex justify-center text-slate-700">
        <Button asLink variant="ghost" href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to the home page
        </Button>
      </div>
    </div>
  );
}
