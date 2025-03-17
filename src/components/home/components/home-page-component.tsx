import DepartmentSection from "./department-section";
import FAQSection from "./faq";
import GetStartedSection from "./get-started-section";
import HomeHero from "./home-hero";
import HowItWorks from "./how-it-works";

export default function HomePageComponent() {
  return (
    <>
      <HomeHero />
      <DepartmentSection />
      <HowItWorks />
      <GetStartedSection />
      <FAQSection />
    </>
  );
}
