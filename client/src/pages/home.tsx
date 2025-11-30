// pages/home.tsx

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
import { Helmet } from "react-helmet-async";


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
    
    <div className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* onClick={() => setIsMobileMenuOpen(false)}> */}
      {/* ✅ SEO Metadata for Home Page */}
      <Helmet>
        <title>TES Eng | Smart Solar & Energy Solutions in Zimbabwe</title>
        <meta
          name="description"
          content="TES provides expert solar, battery storage, and smart energy solutions across Zimbabwe. Explore services for residential, commercial, and industrial projects."
        />
        <meta name="keywords" content="Solar Zimbabwe, Solar installation, Renewable energy, Battery storage, Commercial solar, Industrial solar" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="TES | Smart Solar & Energy Solutions in Zimbabwe" />
        <meta property="og:description" content="Power your home, business, or industry with TES's trusted solar and smart energy solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tesengineering.com/" />
        <meta property="og:image" content="https://tesengineering.com/images/og-preview.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TES | Smart Solar & Energy Solutions in Zimbabwe" />
        <meta name="twitter:description" content="Expert solar, battery storage, and renewable solutions for homes, businesses, and industries." />
        <meta name="twitter:image" content="https://tesengineering.com/images/og-preview.png" />

        {/* Structured Data (JSON-LD for Organization) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TES Engineering",
            "url": "https://tesengineering.com",
            "logo": "https://tesengineering.com/logo.png",
            "sameAs": [
              "https://facebook.com/TES",
              "https://twitter.com/TESEng",
              "https://linkedin.com/company/tes-eng"
            ]
          })}
        </script>
      </Helmet>

      {/* Website Layout */}
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
