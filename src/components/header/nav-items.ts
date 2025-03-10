import { faUser } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface NavDataItem {
  label: string;
  href: string;
  icon?: IconDefinition;
}

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
