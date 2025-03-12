import { Logo } from "./logo";

interface HeaderProps {
  children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="text-background flex h-16 items-center justify-between bg-blue-500 pr-6 pl-4 md:px-8">
      <Logo />

      {children}
    </header>
  );
}
