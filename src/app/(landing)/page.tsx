import { FAQ } from "./_components/FAQ";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import { ScrollToTop } from "./_components/ScrollToTop";
import { Sponsors } from "./_components/Sponsors";

export default function Page() {
  return (
    <main className="w-full mx-auto px-8">
      <Hero />
      <Sponsors />
      <HowItWorks />
      <FAQ />
      <ScrollToTop />
    </main>
  );
}
