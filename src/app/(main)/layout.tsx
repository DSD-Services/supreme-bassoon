import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { clientNavItems } from "@/components/header/nav-items";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header navData={clientNavItems} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
