import { Button } from "@/components/ui/button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <h1 className="text-center text-3xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4">
          Welcome to DSD Services!
        </h1>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8">
        <div className="mt-2 max-w-md rounded-lg bg-blue-100 p-6 shadow-lg sm:mx-auto sm:w-full md:max-w-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-2 text-center text-2xl font-bold tracking-tight text-[#215CFF]">
              You have successfully registered!{" "}
              <span className="block">
                Check your email for confirmation instructions.
              </span>
            </h2>
          </div>

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            Already verified your email?{" "}
            <Button asLink href="/login" variant="link" className="px-0">
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
