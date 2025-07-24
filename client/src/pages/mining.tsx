import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, TrendingUp, Mountain, HardHat, Clock, Award, PhoneCall, MessageCircle, Calculator, Wrench, Package, Cog, Bot, Battery } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ContactSection from "@/components/contact-section";

const benefits = [
  "Massive fuel cost savings (up to 80%)",
  "24/7 reliable power for critical operations",
  "Environmental compliance and ESG goals",
  "Reduced carbon footprint for mining",
  "Off-grid power for remote locations",
  "Harsh environment engineering design"
];

const serviceCategories = [
  {
    icon: Mountain,
    title: "Off-Grid Solutions",
    description: "Complete power independence for remote mining",
    features: ["Microgrid design", "Hybrid systems", "Load management", "Remote monitoring"]
  },
  {
    icon: Clock,
    title: "24/7 Reliability",
    description: "Continuous power for critical mining operations",
    features: ["Battery backup", "Generator integration", "Redundant systems", "Failover protection"]
  },
  {
    icon: Shield,
    title: "Harsh Environment",
    description: "Equipment designed for extreme conditions",
    features: ["Dust protection", "Temperature resistance", "Corrosion protection", "Vibration dampening"]
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description: "Large-scale battery systems for mining",
    features: ["Grid stabilization", "Peak shaving", "Emergency backup", "Load balancing"]
  }
];


const miningProjects = [
  {
    type: "Gold Mine",
    location: "Mazowe, Mashonaland Central",
    size: "8MW + 16MWh storage",
    description: "Off-grid solar system powering gold extraction, milling, and accommodation camps.",
    savings: "Saved $1.8M/year in diesel and maintenance costs",
    features: ["Ball mill & crusher", "Leaching tanks", "Security lighting", "Accommodation power"]
  },
  // {
  //   type: "Lithium Mine",
  //   location: "Bikita, Masvingo Province",
  //   size: "12MW hybrid system",
  //   description: "Solar + grid-tied system ensuring reliable power for 24/7 lithium ore processing.",
  //   savings: "$2.5M/year reduction in grid dependency and outages",
  //   features: ["Crushing lines", "Ore sorting", "Water pumping", "Ventilation"]
  // },
  {
    type: "Chrome Mine",
    location: "Shurugwi, Midlands Province",
    size: "10MW + diesel backup",
    description: "Hybrid solar-diesel solution for smelting, processing, and mine ventilation.",
    savings: "Reduced fuel costs by 60% and improved uptime",
    features: ["Smelter plant", "Loaders & conveyors", "Dust control systems", "Perimeter security"]
  },
  {
    type: "Platinum Group Metals (PGMs) Operation",
    location: "Ngezi, Mashonaland West",
    size: "20MW grid-assist system",
    description: "Solar-assisted power for large-scale underground and surface mining operations.",
    savings: "$3.2M/year savings on power demand charges",
    features: ["Shaft ventilation", "Ore hoisting", "Workshop energy", "Environmental monitoring"]
  }
];

const environmentalBenefits = [
  { metric: "80%", description: "Reduction in diesel consumption" },
  { metric: "15,000 tons", description: "CO₂ emissions saved annually" },
  { metric: "99.9%", description: "System uptime reliability" },
  { metric: "25 years", description: "System lifespan guarantee" }
];

export default function MiningPage() {
  const [showChat, setShowChat] = useState(false);

  const handleInstantInquiry = () => {
    const context = "Mining - Off-grid reliable power system for remote mining operations";
    window.location.href = `/#contact?context=${encodeURIComponent(context)}`;
  };

  const handleSmartTESOpen = () => {
    setShowChat(true);
  };

  return (
    <div id="mine" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-100 to-solar-orange/10 dark:from-gray-800 dark:to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Mountain className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Mining Solar Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Reliable power for remote mining operations. Engineered for extreme environments with 
              24/7 uptime, massive fuel savings, and environmental compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleInstantInquiry}
                className="bg-gray-600 text-white px-8 py-4 text-lg flex items-center hover:bg-gray-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Mining Quote
              </Button>
              <Button 
                onClick={handleSmartTESOpen}
                variant="outline" 
                className="px-8 py-4 text-lg flex items-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Power System Design
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Environmental & Economic Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {environmentalBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-600 mb-2">{benefit.metric}</div>
                <div className="text-muted-foreground">{benefit.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Mining Solar Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-gray-600 mb-4" />
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

      {/* Mining Projects */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Mining Success Stories</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {miningProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{project.type}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">{project.savings}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">System: </span>
                    <span className="text-muted-foreground">{project.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Applications:</h4>
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <Mountain className="w-3 h-3 text-gray-600 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mining Solar Benefits</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <Mountain className="w-5 h-5 mr-2" />
                  Remote Mining Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-gray-600">$3M+</div>
                    <div className="text-muted-foreground">Annual Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">2.5 years</div>
                    <div className="text-muted-foreground">Payback Period</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Mining solar installation"
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
                console.log("Mining sizing request:", description);
              }}
              onQuoteRequest={(details) => {
                console.log("Mining quote request:", details);
              }}
            />
          </div>
        </div>
      )}

      <ContactSection />
      <Footer />

      {/* Floating SmartTES Chat */}
      <SmartTESChat 
        isFloating={true}
        onSolarSizingRequest={(description) => {
          console.log("Mining sizing request:", description);
        }}
        onQuoteRequest={(details) => {
          console.log("Mining quote request:", details);
        }}
      />
    </div>
  );
}