import { Logo } from "./logo";
import { NavWrapper } from "./nav-wrapper";

export const Header = () => {
  return (
    <header className="text-background flex h-16 items-center justify-between bg-blue-500 pr-6 pl-4 md:px-8">
      <Logo />
      <NavWrapper />
    </header>
  );
};
