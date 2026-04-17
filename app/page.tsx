import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import SocialProof from "@/components/sections/SocialProof";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import AuraBackground from "@/components/ui/AuraBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-white/20 selection:text-white">
      <AuraBackground />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SocialProof />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
