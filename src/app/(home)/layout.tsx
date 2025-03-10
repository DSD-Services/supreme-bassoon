import Header from "@/components/header/header";
import Footer from "@/components/footer";
import GetStartedButton from "@/components/header/get-started-button";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header>
        <GetStartedButton />
      </Header>
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>
      <Footer />
    </>
  );
}
