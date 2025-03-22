import { Logo } from "./logo";
import { NavWrapper } from "./nav-wrapper";

export const Header = () => {
  return (
    <header className="text-background h-16 bg-blue-500">
      <div className="container mx-auto flex h-full items-center justify-between px-6 py-6 md:px-8">
        <Logo />
        <NavWrapper />
      </div>
    </header>
  );
};
