import Footer from "@/components/footer";
import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem-10rem)]">{children}</main>
      <Footer />
    </>
  );
}
