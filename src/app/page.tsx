import Footer from "@/components/footer";
import { Header } from "@/components/header";
import HomePageComponent from "@/components/home/components/home-page-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <HomePageComponent />
      </main>
      <Footer />
    </>
  );
}
