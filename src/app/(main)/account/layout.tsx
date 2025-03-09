import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { clientNavItems } from "@/components/header/nav-items";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header navData={clientNavItems} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
