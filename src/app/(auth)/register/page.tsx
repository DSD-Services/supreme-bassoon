import { Button } from "@/components/ui/button";
import { RegisterForm } from "@/features/auth/components/register-form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid place-items-center md:flex-row">
        <h1 className="my-2 text-center text-2xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4 md:text-3xl">
          Welcome to DSD Services!
        </h1>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center pt-2 md:p-4 lg:px-8 lg:pt-4 lg:pb-2">
        <div className="rounded-lg bg-[#E2EAFF] p-4 px-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold tracking-tight text-blue-700">
              Register
            </h2>
          </div>

          <RegisterForm />

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Button
              asLink
              href="/login"
              variant="link"
              className="px-0 text-blue-700"
            >
              Log in
            </Button>{" "}
            instead.
          </p>
        </div>
      </div>
      <div className="mt-2 mb-1 flex justify-center text-slate-700">
        <Button asLink variant="ghost" href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to the home page
        </Button>
      </div>
    </div>
  );
}
