import GetStartedButton from "./get-started-button";
import { Logo } from "./logo";
import Nav from "./nav";
import { clientNavItems, mainNavItems } from "./nav-items";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="text-background flex h-16 items-center justify-between bg-blue-500 pr-6 pl-4 md:px-8">
      <Logo />

      {children}
    </header>
  );
};

export const AuthHeader = () => {
  return (
    <Header>
      <Nav navData={clientNavItems} />
    </Header>
  );
};

export const HomeHeader = () => {
  return (
    <Header>
      <GetStartedButton />
    </Header>
  );
};

export const MainHeader = () => {
  return (
    <Header>
      <Nav navData={mainNavItems} />
    </Header>
  );
};
