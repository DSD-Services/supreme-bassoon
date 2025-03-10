import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { clientNavItems } from "@/components/header/nav-items";
import Nav from "@/components/header/nav";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header>
        <Nav navData={clientNavItems} />
      </Header>
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
