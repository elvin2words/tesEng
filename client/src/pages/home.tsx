import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import SolarFactsTicker from "@/components/solar-facts-ticker";
import ServicesSection from "@/components/services-section";
import IndustriesSection from "@/components/industries-section";
import InstallersDirSection from "@/components/installerDir";
import ProjectsSection from "@/components/projects-section";
import SuccessStoriesSection from "@/components/success-stories-section";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top"; 
import { useState, useEffect } from "react";


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);
  
  return (
    
    <div className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300"
    // onClick={() => setIsMobileMenuOpen(false)}
    >
      <Navigation />
      <HeroSection />
      <SolarFactsTicker />
      <IndustriesSection />
      <InstallersDirSection />
      <ServicesSection />
      <ProjectsSection />
      <SuccessStoriesSection />
      <AboutSection />
      <ContactSection />
      <Footer />

      {/* Floating SmartTES Chat */}
      <SmartTESChat 
        isFloating={true}
        onSolarSizingRequest={(description) => { console.log("Home page sizing request:", description); }}
        onQuoteRequest={(details) => { console.log("Home page quote request:", details); }}
      />
      <ScrollToTop />

    </div>
  );
}
