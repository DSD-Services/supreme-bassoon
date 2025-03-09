import { faUser } from "@fortawesome/free-solid-svg-icons";

export const clientNavItems = [
  {
    label: "Register",
    href: "/register",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition",
  },
  {
    label: "Login",
    href: "/login",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition",
  },
];

export const clientMobileNavItems = [
  {
    label: "Home",
    href: "/",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
  },
  {
    label: "Register",
    href: "/register",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
  },
  {
    label: "Login",
    href: "/login",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
  },
];

export const technicianNavItems = [
  {
    label: "Home",
    href: "/",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
  },
  {
    label: "Dashboard",
    href: "/dashboard/technician",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
  },
  {
    label: "Account",
    href: "/account",
    className:
      "text-primary-foreground hover:text-primary-foreground/80 transition flex justify-center",
    icon: faUser,
  },
];
