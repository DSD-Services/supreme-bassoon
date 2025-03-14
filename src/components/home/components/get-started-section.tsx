import Button from "@/components/buttons/button";

export default function GetStartedSection() {
  return (
    <div className="flex flex-col items-center px-10 py-12 lg:px-20">
      <p className="pb-10 text-center text-xl lg:w-3/4">
        What are you waiting for? Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Vel similique expedita nisi, sequi minus, voluptate
        aliquid iste consequatur, non iusto dolorum eveniet dolor cumque
        ducimus! Necessitatibus eius autem adipisci harum.
      </p>
      <Button size="lg" fontWeight="semibold">
        Get started
      </Button>
    </div>
  );
}
