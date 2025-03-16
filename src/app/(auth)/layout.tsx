import Footer from "@/components/footer";
import { loggedOutNavItems } from "@/components/header/nav-items";
import { Logo } from "@/components/header/logo";
import Nav from "@/components/header/nav";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="text-background flex h-16 items-center justify-between bg-blue-500 pr-6 pl-4 md:px-8">
        <Logo />
        <Nav navData={loggedOutNavItems} />
      </header>
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
