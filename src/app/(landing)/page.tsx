import { Cta } from "./_components/Cta";
import { FAQ } from "./_components/FAQ";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { ScrollToTop } from "./_components/ScrollToTop";
import { Services } from "./_components/Services";
import { Sponsors } from "./_components/Sponsors";
import { Team } from "./_components/Team";

export default function Page() {
  return (
    <>
      <Hero />
      <Sponsors />
      <HowItWorks />
      <Services />
      <Cta />
      <Team />
      <FAQ />
      <ScrollToTop />
    </>
  );
}
