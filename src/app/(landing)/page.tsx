import { About } from "./_components/About";
import { Cta } from "./_components/Cta";
import { FAQ } from "./_components/FAQ";
import { Footer } from "./_components/Footer";
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
      <About />
      <HowItWorks />
      <Services />
      <Cta />
      <Team />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
