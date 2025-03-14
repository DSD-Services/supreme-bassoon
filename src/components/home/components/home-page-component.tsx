import DepartmentSection from "./department-section";
import GetStartedSection from "./get-started-section";
import HomeHero from "./home-hero";

export default function HomePageComponent() {
  return (
    <>
      <HomeHero />
      <DepartmentSection />
      <GetStartedSection />
    </>
  );
}
