import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="flex flex-col-reverse items-center justify-center gap-4 py-8 md:flex-row md:gap-10 md:py-10 lg:gap-16 lg:px-10 lg:py-12 xl:py-16">
      <div className="flex flex-col justify-center px-2 text-center text-3xl font-semibold text-blue-500 md:text-left md:text-4xl lg:text-5xl">
        <h1>
          Electrical, HVAC &amp; Plumbing{" "}
          <span className="block">services for your home...</span>
          <span className="block pt-4 italic md:pt-10">
            ...all under one roof!
          </span>
        </h1>
      </div>
      <div className="w-2/5 max-w-[350px] md:w-1/3">
        <Image
          src="/images/dsd-house-blue.png"
          alt="DSD Services logo shaped like a house. Under the roof are four circles with a lightning bolt, flame, snowflake, and water droplet."
          width={403}
          height={451}
        />
      </div>
    </section>
  );
}
