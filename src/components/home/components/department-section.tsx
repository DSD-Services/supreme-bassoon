import DepartmentCard from "./department-card";

export default function DepartmentSection() {
  const departments = [
    {
      title: "Electrical",
      description:
        "Expert electrical solutions for residential and commercial needs. From wiring and lighting installations to troubleshooting and repairs, we ensure safe, efficient, and code-compliant electrical work.",
      imageSrc: "/images/electrical.jpg",
      altText: "DSD Services logo",
    },
    {
      title: "HVAC",
      description:
        "Reliable heating, ventilation, and air conditioning (HVAC) services to keep your home or business comfortable year-round. We provide installation, maintenance, and repairs for optimal indoor air quality and energy efficiency",
      imageSrc: "/images/hvac.jpg",
      altText: "DSD Services logo",
    },
    {
      title: "Plumbing",
      description:
        "Professional plumbing services for homes and businesses. Whether it’s leak detection, pipe repairs, drain cleaning, or full system installations, we deliver fast and effective solutions to keep your water flowing smoothly.",
      imageSrc: "/images/plumbing.jpg",
      altText: "DSD Services logo",
    },
  ];

  return (
    <div className="bg-gray-200 px-4 pt-10 pb-14 md:px-6 lg:px-10 lg:pt-12">
      <h3 className="pb-10 text-center text-xl font-semibold text-blue-500 md:text-2xl lg:text-3xl">
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
