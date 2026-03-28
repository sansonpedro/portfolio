import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main className="container max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col gap-[30vh] pt-[20vh] pb-40">
          <TechStackSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}