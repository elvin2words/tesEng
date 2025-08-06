
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";


const bannerContent = [
  {
    title: "Engineering Tomorrow's Energy",
    subtitle: "Innovative Solutions. Sustainable Future.",
    description: "TES Engineering delivers cutting-edge renewable energy and engineering solutions tailored to meet your business and indiviudal requirements. We transform industries through innovative technology and sustainable practices.",
    bgImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "500+ MW Installed Across Africa",
    subtitle: "Powering Communities. Driving Growth.",
    description: "From Zimbabwe to Nigeria, our solar installations have transformed energy access for thousands of businesses, hospitals, schools, and communities across 12 countries.",
    bgImage: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "SmartTES AI-Powered Solutions",
    subtitle: "Intelligence Meets Engineering.",
    description: "Our AI-powered sizing tool analyzes your energy needs and recommends the perfect solar solution in seconds. Experience the future of energy planning.",
    bgImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function HeroSection() {
  const [currentBanner] = useState(0);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentBanner((prev) => (prev + 1) % bannerContent.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    // <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <section id="home" className="relative min-h-screen flex items-start sm:items-center justify-center pt-28 sm:pt-0 overflow-hidden">

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${bannerContent[currentBanner].bgImage}')` }}
      />
      
      {/* Background Pattern - inspired by the grid pattern in the image */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-tes-accent/30 animate-pulse"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" /> */}
      {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" /> */}
      <div className="absolute inset-0 gradient-overlay" />

      {/* Animated floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-solar-yellow/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 md:w-40 md:h-40 bg-solar-blue/20 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-24 md:h-24 bg-solar-orange/20 rounded-full blur-3xl animate-float delay-2000" />
      </div>

      {/* Energy Savings Counter */}
      {/* <div className="absolute top-6 right-4 sm:top-20 sm:right-6 text-right text-white animate-fade-in"> */}
      <div className="absolute top-20 sm:top-20 right-4 sm:right-6 text-right text-white animate-fade-in z-20">
        <div className="text-[10px] sm:text-sm font-medium text-white/80 leading-tight">Annual Energy Saved</div>
        <div className="text-lg sm:text-3xl font-bold text-tes-secondary leading-snug">45,000</div>
        <div className="text-xs sm:text-lg text-tes-secondary">kWh +</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 text-center text-white max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up text-shadow">
          {bannerContent[currentBanner].title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-light mb-4 animate-slide-in-left text-shadow">
          {bannerContent[currentBanner].subtitle}
        </p>

        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6 animate-slide-in-right text-shadow">
          {bannerContent[currentBanner].description}
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 animate-slide-in-right">
          {["48hr Installation Guarantee", "ZERA Certified", "ISO Quality C&A Engineering"].map((text, i) => (
            <div key={i} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-tes-secondary rounded-full mr-2"></div>
              <span className="text-xs sm:text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center animate-bounce-in">
          <Button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto bg-solar-yellow text-black px-6 py-3 text-sm sm:text-base font-semibold hover:bg-yellow-400 transition-all transform hover:scale-105 hover-lift"
          >
            What Can We Do for You
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 bg-solar-white border-tes-accent text-tes-accent hover:bg-tes-accent hover:text-white px-6 py-3 text-sm sm:text-base font-semibold rounded-full transition-all transform hover:scale-105"
            onClick={() => document.querySelector('#industries')?.scrollIntoView({ behavior: 'smooth' })}
          >
            📞 Consult With Our Engineers
          </Button>

          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className="w-full sm:w-auto border-2 border-white text-white px-6 py-3 text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition-all hover-lift"
          >
            Request Installation
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 sm:bottom-8 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </section>
  );
}
