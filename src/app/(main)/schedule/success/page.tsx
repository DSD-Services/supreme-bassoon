import { Button } from "@/components/ui/button";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Success - Please Check Your Email",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="flex-[1]">
          <Button asLink variant="ghost" href="/">
            <FontAwesomeIcon icon={faLeftLong} />
            Home
          </Button>
        </div>
        <h1 className="flex-[3] text-center text-3xl font-bold whitespace-nowrap sm:text-4xl md:w-2/4">
          Welcome to DSD Services!
        </h1>
        <div className="flex-[1]"></div>
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8">
        <div className="mt-2 rounded-lg bg-[#E2EAFF] p-6 shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="my-2 text-center text-2xl font-bold tracking-tight text-[#215CFF]">
              Success! Check your email to see scheduling details.
            </h2>
          </div>

          <p className="mt-4 text-center text-sm/6 text-gray-500">
            If you don&apos;t see an email from us, please check your spam or
            junk folder. If you still don&apos;t see it,{" "}
            <strong>please contact us</strong> for assistance.
          </p>
          <p className="mt-4 text-center text-sm/6 text-gray-500">
            You can return to the{" "}
            <Button asLink href="/" variant="link" className="px-0">
              Home Page
            </Button>{" "}
            or{" "}
            <Button asLink href="/schedule" variant="link" className="px-0">
              Schedule Another Service
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
