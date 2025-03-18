import {
  faCalendar,
  faDashboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavDataItem {
  label: string;
  href: string;
  icon?: IconDefinition;
}

export const navItems: NavDataItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: faDashboard,
  },
  {
    label: "Account",
    href: "/account",
    icon: faUser,
  },
];

export const clientNavItems: NavDataItem[] = [
  {
    label: "Schedule",
    href: "/schedule",
    icon: faCalendar,
  },
  ...navItems,
];

export const loggedOutNavItems = [
  {
    label: "Register",
    href: "/register",
  },
  {
    label: "Login",
    href: "/login",
  },
];
