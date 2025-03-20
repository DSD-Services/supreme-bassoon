import { cn } from "@/lib/utils";
import {
  faBox,
  faBuilding,
  faClipboardList,
  faScrewdriverWrench,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const links = [
  {
    path: "technicians",
    label: "Technicians",
    icon: faUsers,
    description: "Manage technician profiles and assignments",
    color: "bg-blue-500",
  },
  {
    path: "inventory",
    label: "Inventory",
    icon: faBox,
    description: "Track parts, equipment and supplies",
    color: "bg-blue-600",
  },
  {
    path: "work-orders",
    label: "Work Orders",
    icon: faClipboardList,
    description: "Create and manage service requests",
    color: "bg-blue-700",
  },
  {
    path: "clients",
    label: "Clients",
    icon: faUserCircle,
    description: "View and update client information",
    color: "bg-blue-800",
  },
  {
    path: "departments",
    label: "Departments",
    icon: faBuilding,
    description: "Organize by department or location",
    color: "bg-blue-900",
  },
  {
    path: "service-types",
    label: "Service Types",
    icon: faScrewdriverWrench,
    description: "Configure service categories and types",
    color: "bg-blue-950",
  },
];
export const AdminDashboard = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <div className="bg-muted h-1" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.path}
            href={`/admin/${link.path}`}
            className={cn(
              "group text-background flex h-28 flex-col items-center justify-center rounded-xl border px-6 py-3 transition duration-300 sm:h-40 sm:py-6",
              link.color,
              "hover:z-10 hover:-translate-y-1 hover:opacity-90 hover:shadow-lg",
              "peer",
            )}
          >
            <div className="flex flex-col items-center gap-y-3 text-center text-xl sm:text-2xl lg:text-3xl">
              <FontAwesomeIcon icon={link.icon} />
              <h2 className="text-xl font-semibold">{link.label}</h2>
              <p className="text-background/80 hidden text-sm sm:block">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
