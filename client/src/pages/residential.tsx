import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, TrendingUp, Users, Home, Leaf, DollarSign, Clock, Award, PhoneCall, MessageCircle, Calculator, Wrench, Package, Cog, Bot, Sun, Battery, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ContactSection from "@/components/contact-section";
import { useEffect } from "react";

const benefits = [
  "Eliminate electricity bills permanently",
  "Energy independence from grid failures",
  "Increase property value by 15-20%",
  "Family safety with backup power",
  "Environmental impact for children's future",
  "Government rebates and tax incentives"
];

const serviceCategories = [
  {
    icon: Sun,
    title: "Installation Services",
    description: "Professional rooftop and ground-mount installations",
    features: ["Site assessment", "Permit handling", "Grid connection", "Commissioning"]
  },
  {
    icon: Clock,
    title: "Maintenance",
    description: "Keep your system running at peak performance",
    features: ["Annual inspections", "Cleaning services", "Performance monitoring", "Warranty support"]
  },
  {
    icon: Battery,
    title: "Equipment Supply",
    description: "Premium solar panels, inverters, and batteries",
    features: ["Tier-1 panels", "Hybrid inverters", "LiFePO4 batteries", "Smart monitoring"]
  },
  {
    icon: Shield,
    title: "Security Systems",
    description: "Protect your investment with advanced security",
    features: ["Anti-theft mounting", "Remote monitoring", "Insurance coordination", "24/7 support"]
  }
];

const familyStories = [
  {
    family: "The Moyo Family",
    location: "Borrowdale, Harare",
    system: "8kW Solar + 20kWh Battery",
    story: "We’ve been completely off-grid for 2 years. Our $200 monthly savings now cover our children's school fees at a local private school.",
    savings: "$4,800/year",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    family: "The Ncube Family",
    location: "Hillside, Bulawayo",
    system: "10kW Hybrid Solar System",
    story: "Before solar, we used to spend hours without power due to load shedding. Now our home office runs smoothly and our borehole pump never fails.",
    savings: "$3,200/year",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  // {
  //   family: "The Dube Family",
  //   location: "Chinhoyi, Mashonaland West",
  //   system: "6kW Solar + 10kWh Backup",
  //   story: "Our solar system ensures our son’s medical devices always have power. We’ve reduced our diesel generator use by over 80%.",
  //   savings: "$2,400/year",
  //   image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  // },
  {
    family: "The Chikomba Family",
    location: "Mutare, Manicaland",
    system: "5kW Grid-Tied Solar",
    story: "We installed solar during the COVID lockdowns to support our home bakery. It helped us cut bills and grow our business.",
    savings: "$2,800/year",
    image: "https://images.unsplash.com/photo-1590490350393-fd5ef5e4db3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];


export default function ResidentialPage() {
  const [showChat, setShowChat] = useState(false);

  // const handleInstantInquiry = () => {
  //   const context = "Residential - Home solar system with backup power";
  //   // In a real app, this would pass context to contact form
  //   window.location.href = `/#contact?context=${encodeURIComponent(context)}`;
  // };

  // const handleSmartTESOpen = () => {
  //   setShowChat(true);
  // };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // delay to wait for content to render
      }
    }
  }, []);

  return (
    <div id="res" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-solar-orange/10 to-solar-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Home className="w-16 h-16 text-solar-orange mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Solar Power for Your Family
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your home into an energy-independent haven. Protect your family from power outages 
              while saving thousands every year with clean, reliable solar energy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                // onClick={handleInstantInquiry}
                className="bg-solar-orange text-white px-8 py-4 text-lg flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Home Solar Quote
              </Button>
              <Button 
                // onClick={handleSmartTESOpen}
                variant="outline" 
                className="px-8 py-4 text-lg flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Size My System with AI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Home Solar Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-solar-orange mb-4" />
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Family Stories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Real Families, Real Results</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {familyStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={story.image} 
                  alt={`${story.family} home`}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{story.family}</h3>
                      <p className="text-muted-foreground">{story.location}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">{story.savings}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{story.system}</p>
                  <p className="italic">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Families Choose Solar</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-solar-orange/10 rounded-lg">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Average Family Savings
                </h3>
                <p className="text-2xl font-bold text-solar-orange">$3,500/year</p>
                <p className="text-sm text-muted-foreground">Based on 150+ residential installations</p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Happy family with solar panels"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SmartTES Integration */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] relative">
            <Button
              variant="ghost"
              onClick={() => setShowChat(false)}
              className="absolute top-4 right-4 z-10"
            >
              ×
            </Button>
            <SmartTESChat 
              isFloating={false}
              onSolarSizingRequest={(description) => {
                console.log("Residential sizing request:", description);
              }}
              onQuoteRequest={(details) => {
                console.log("Residential quote request:", details);
              }}
            />
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />
    </div>
  );
}