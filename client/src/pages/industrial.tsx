import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, TrendingUp, Factory, Settings, Clock, Award, PhoneCall, MessageCircle, Calculator, Wrench, Package, Cog, Bot, AlertTriangle } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ContactSection from "@/components/contact-section";
import { Helmet } from "react-helmet-async";

const benefits = [
  "Massive reduction in operational costs (50-70%)",
  "Improved manufacturing competitiveness",
  "Reduced carbon footprint and ESG compliance",
  "Energy independence from grid instability",
  "Scalable solutions for production growth",
  "24/7 monitoring and rapid response support"
];

const serviceCategories = [
  {
    icon: Factory,
    title: "Heavy-Duty Installation",
    description: "Industrial-grade systems for manufacturing",
    features: ["Structural engineering", "3-phase power systems", "High-voltage integration", "Safety protocols"]
  },
  {
    icon: Wrench,
    title: "Maintenance Services",
    description: "Comprehensive maintenance for uptime",
    features: ["Preventive maintenance", "Emergency repairs", "Performance optimization", "Parts inventory"]
  },
  {
    icon: Settings,
    title: "Equipment Supply",
    description: "Industrial-grade components and systems",
    features: ["Commercial inverters", "Heavy-duty panels", "Grid-tie systems", "SCADA integration"]
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Meeting industrial safety standards",
    features: ["OSHA compliance", "Electrical safety", "Environmental permits", "Insurance coordination"]
  }
];

const complianceStandards = [
  { standard: "IEC 61215", description: "Crystalline Silicon Photovoltaic Modules" },
  { standard: "IEC 61730", description: "Photovoltaic Module Safety Qualification" },
  { standard: "IEEE 1547", description: "Interconnecting Distributed Resources" },
  { standard: "UL 1741", description: "Inverters, Converters, Controllers" },
  { standard: "NEC Article 690", description: "Solar Photovoltaic Systems" },
  { standard: "OSHA 1926", description: "Construction Safety Standards" }
];

const industrialProjects = [
  {
    type: "Textile & Garment Manufacturing",
    location: "Kadoma, Mashonaland West",
    size: "2MW solar + backup storage",
    savings: "$420,000/year",
    description: "Round-the-clock solar-powered operation for spinning, dyeing, and sewing processes.",
    features: ["3-phase solar integration", "Load balancing", "Battery backup for outages"]
  },
  // {
  //   type: "Agro-Food Processing Plant",
  //   location: "Mutare, Manicaland",
  //   size: "1.8MW hybrid system",
  //   savings: "$370,000/year",
  //   description: "Cold storage and value-added processing for fruits and vegetables using solar energy.",
  //   features: ["Temperature-controlled zones", "Clean processing lines", "Solar-diesel hybrid backup"]
  // },
  {
    type: "Steel & Metal Fabrication",
    location: "Redcliff, Midlands Province",
    size: "4MW industrial system",
    savings: "$750,000/year",
    description: "Powering furnaces, heavy rollers, and cutting machinery with reliable solar input.",
    features: ["High-voltage integration", "Harmonic filtering", "Smelting plant support"]
  },
  {
    type: "Chemical Manufacturing",
    location: "Msasa Industrial, Harare",
    size: "3MW solar grid-tied system",
    savings: "$500,000/year",
    description: "Supporting continuous production of paints, plastics, and cleaning agents.",
    features: ["Explosion-proof zones", "Clean room HVAC", "Load priority management"]
  }
];
export default function IndustrialPage() {
  const [showChat, setShowChat] = useState(false);

  const handleInstantInquiry = () => {
    const context = "Industrial - Heavy-duty manufacturing solar system with 3-phase power";
    window.location.href = `/#contact?context=${encodeURIComponent(context)}`;
  };

  const handleSmartTESOpen = () => {
    setShowChat(true);
  };

  return (
    <div id="industry" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-solar-yellow/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Factory className="w-16 h-16 text-solar-yellow mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Industrial Solar Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Power your manufacturing and processing operations with large-scale solar installations. 
              Engineered for safety, reliability, and massive cost reductions in industrial environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleInstantInquiry}
                className="bg-solar-yellow text-solar-gray px-8 py-4 text-lg flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Industrial Quote
              </Button>
              <Button 
                onClick={handleSmartTESOpen}
                variant="outline" 
                className="px-8 py-4 text-lg flex items-center"
              >
                <Settings className="w-5 h-5 mr-2" />
                System Engineering
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="w-12 h-12 text-solar-yellow mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Safety Engineering & Compliance</h2>
            <p className="text-lg text-muted-foreground">
              All installations meet or exceed international safety standards
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceStandards.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-solar-yellow border-solar-yellow">
                    {item.standard}
                  </Badge>
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Industrial Solar Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-solar-yellow mb-4" />
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

      {/* Industrial Projects */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Heavy-Duty Installations</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {industrialProjects.map((project, index) => (
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
                    <span className="font-semibold">System Size: </span> 
                    <span className="text-muted-foreground">{project.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <Zap className="w-3 h-3 text-solar-yellow mr-2" />
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
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Industrial solar installation"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Industrial Solar Benefits</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-solar-yellow/10 rounded-lg">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <Factory className="w-5 h-5 mr-2" />
                  Average Industrial Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-solar-yellow">60%</div>
                    <div className="text-muted-foreground">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-solar-yellow">2.8 years</div>
                    <div className="text-muted-foreground">Payback Period</div>
                  </div>
                </div>
              </div>
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
                console.log("Industrial sizing request:", description);
              }}
              onQuoteRequest={(details) => {
                console.log("Industrial quote request:", details);
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
          console.log("Industrial sizing request:", description);
        }}
        onQuoteRequest={(details) => {
          console.log("Industrial quote request:", details);
        }}
      />
    </div>
  );
}