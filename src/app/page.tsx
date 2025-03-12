import Footer from "@/components/footer";
import { HomeHeader } from "@/components/header/header";
import HomePageComponent from "@/features/home/components/home-page-component";

export default function Page() {
  return (
    <>
      <HomeHeader />
      <main className="min-h-[calc(100vh-4rem-4rem)]">
        <HomePageComponent />
      </main>
      <Footer />
    </>
  );
}
