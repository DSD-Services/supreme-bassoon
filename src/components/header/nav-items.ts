import {
  faCalendar,
  faDashboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { UserRole } from "@/utils/supabase/types";

export interface NavDataItem {
  label: string;
  href: string;
  icon?: IconDefinition;
  roles?: UserRole[];
}

export const mainNavItems: NavDataItem[] = [
  {
    label: "Account",
    href: "/account",
    icon: faUser,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: faCalendar,
    roles: ["CLIENT"],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: faDashboard,
    roles: ["TECHNICIAN", "ADMIN"],
  },
];

export const clientNavItems = [
  {
    label: "Register",
    href: "/register",
  },
  {
    label: "Login",
    href: "/login",
  },
];

export const clientMobileNavItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Register",
    href: "/register",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Account",
    href: "/account",
  },
];

export const technicianNavItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Dashboard",
    href: "/dashboard/technician",
  },
  {
    label: "Account",
    href: "/account",
    icon: faUser,
  },
];
