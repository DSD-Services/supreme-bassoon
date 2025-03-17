import Footer from "@/components/footer";
import { Header } from "@/components/header";
import HomePageComponent from "@/components/home/components/home-page-component";

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem-4rem)]">
        <HomePageComponent />
      </main>
      <Footer />
    </>
  );
}
