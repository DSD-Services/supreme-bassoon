import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { mainNavItems } from "@/components/header/nav-items";
import Nav from "@/components/header/nav";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header>
        <Nav navData={mainNavItems} />
      </Header>
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
