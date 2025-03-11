import Footer from "@/components/footer";
import Header from "@/components/header/header";
import Nav from "@/components/header/nav";
import { NavDataItem } from "@/components/header/nav-items";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const navItems: Array<NavDataItem> = [
  {
    label: "Account",
    href: "/account",
    icon: faUser,
  },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header>
        <Nav navData={navItems} />
      </Header>
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
