import { Button } from "@/components/ui/button";

export default function GetStartedSection() {
  return (
    <div className="relative flex flex-col items-center bg-blue-100 px-10 py-10 shadow-lg md:py-20 lg:px-20">
      <p className="max-w-prose pb-10 text-center md:text-lg lg:w-3/4 lg:text-xl">
        Easily book your service appointment. Schedule plumbing, electrical,
        HVAC, or other local services in just a few clicks. Select your service,
        pick a time, and we&apos;ll handle the rest! What are you waiting for?
      </p>

      <Button
        asLink
        href="/login"
        className="h-12 rounded-md px-10 text-sm font-semibold sm:text-base lg:text-lg"
      >
        Get started
      </Button>
    </div>
  );
}
