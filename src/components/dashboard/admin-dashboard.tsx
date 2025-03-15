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
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  },
  {
    path: "inventory",
    label: "Inventory",
    icon: faBox,
    description: "Track parts, equipment and supplies",
    color:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
  },
  {
    path: "work-orders",
    label: "Work Orders",
    icon: faClipboardList,
    description: "Create and manage service requests",
    color:
      "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
  },
  {
    path: "clients",
    label: "Clients",
    icon: faUserCircle,
    description: "View and update client information",
    color:
      "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  },
  {
    path: "departments",
    label: "Departments",
    icon: faBuilding,
    description: "Organize by department or location",
    color: "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800",
  },
  {
    path: "service-types",
    label: "Service Types",
    icon: faScrewdriverWrench,
    description: "Configure service categories and types",
    color: "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800",
  },
];
export const AdminDashboard = () => {
  return (
    <div className="container mx-auto space-y-4 px-4 py-8">
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
              "hover:z-10 hover:-translate-y-1 hover:shadow-lg",
              "peer",
            )}
          >
            <div className="flex flex-col items-center gap-y-3 text-center">
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
