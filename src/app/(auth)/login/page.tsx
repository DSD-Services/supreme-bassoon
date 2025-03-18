import { Button } from "@/components/ui/button";
import { LoginForm } from "@/features/auth/components/login-form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-6">
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

          <LoginForm />

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
