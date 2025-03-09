import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { technicianNavItems } from "@/components/header/nav-items";

export default function TechnicianLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header navData={technicianNavItems} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
