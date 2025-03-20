import { Button } from "@/components/ui/button";

export default function GetStartedSection() {
  return (
    <div className="flex flex-col items-center px-10 py-12 lg:px-20">
      <p className="pb-10 text-center text-xl lg:w-3/4">
        Easily book your service appointment. Schedule plumbing, electrical,
        HVAC, or other local services in just a few clicks. Select your service,
        pick a time, and we’ll handle the rest! What are you waiting for?
      </p>

      <Button
        asLink
        href="/login"
        className="h-12 rounded-md px-10 font-semibold"
      >
        Get started
      </Button>
    </div>
  );
}
