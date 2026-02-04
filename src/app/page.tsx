import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Technical } from "@/components/sections/technical";
import { Benefits } from "@/components/sections/benefits";
import { Team } from "@/components/sections/team";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Technical />
        <Benefits />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
