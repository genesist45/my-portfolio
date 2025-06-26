import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10">
        <section>
          <HeroSection />
        </section>
        
        <section className="my-8">
          <AboutSection />
        </section>
        
        <section className="my-8">
          <SkillsSection />
        </section>
        
        <section className="my-8">
          <ProjectsSection />
        </section>
        
        <section className="my-8">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
