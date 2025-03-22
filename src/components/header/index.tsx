import { Logo } from "./logo";
import { NavWrapper } from "./nav-wrapper";

export const Header = () => {
  return (
    <header className="h-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
      <div className="container mx-auto flex h-full items-center justify-between px-6 py-6 md:px-8">
        <Logo />
        <NavWrapper />
      </div>
    </header>
  );
};
