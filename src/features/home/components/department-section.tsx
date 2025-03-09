import DepartmentCard from "./department-card";

export default function DepartmentSection() {
  const departments = [
    {
      title: "Electrical",
      description:
        "Cum modi veritatis dicta et deserunt dolores praesentium, harum laborum quibusdam ea.",
      imageSrc: "/images/dsd-house-white.png",
      altText: "DSD Services logo",
    },
    {
      title: "HVAC",
      description:
        "Cum modi veritatis dicta et deserunt dolores praesentium, harum laborum quibusdam ea.",
      imageSrc: "/images/dsd-house-white.png",
      altText: "DSD Services logo",
    },
    {
      title: "Plumbing",
      description:
        "Cum modi veritatis dicta et deserunt dolores praesentium, harum laborum quibusdam ea.",
      imageSrc: "/images/dsd-house-white.png",
      altText: "DSD Services logo",
    },
  ];

  return (
    <div className="bg-secondary/50 px-4 pt-10 pb-14 md:px-6 lg:px-10 lg:pt-12">
      <h3 className="text-primary pb-10 text-center text-xl font-semibold md:text-2xl lg:text-3xl">
        Check out our service departments
      </h3>
      <div className="flex flex-wrap justify-center gap-14">
        {departments.map((dept) => (
          <DepartmentCard key={dept.title} {...dept} />
        ))}
      </div>
    </div>
  );
}
