//pages/commercial.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, TrendingUp, Building, BarChart3, Clock, Award, PhoneCall, MessageCircle, Calculator, Wrench, Package, Cog, Bot, ArrowRight } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ContactSection from "@/components/contact-section";
import { Helmet } from "react-helmet-async";

const benefits = [
  "Immediate 40-60% reduction in electricity costs",
  "Tax incentives and accelerated depreciation",
  "Enhanced corporate sustainability profile",
  "Long-term energy price predictability",
  "Minimal maintenance with 25-year warranties",
  "Professional project management from start to finish"
];

const serviceCategories = [
  {
    icon: Building,
    title: "Installation Services",
    description: "Commercial-grade installations for businesses",
    features: ["Structural analysis", "Grid integration", "Permit management", "System commissioning"]
  },
  {
    icon: Clock,
    title: "Maintenance & Support",
    description: "Keep your business running efficiently",
    features: ["Preventive maintenance", "Performance monitoring", "24/7 technical support", "Warranty management"]
  },
  {
    icon: Shield,
    title: "Equipment Supply",
    description: "Commercial-grade equipment and components",
    features: ["Tier-1 commercial panels", "Three-phase inverters", "Energy storage systems", "Monitoring platforms"]
  },
  {
    icon: TrendingUp,
    title: "Financial Services",
    description: "Financing options and ROI optimization",
    features: ["Lease programs", "Power purchase agreements", "ROI analysis", "Tax benefit guidance"]
  }
];

const useCases = [
  // {
  //   type: "Supermarket Chain",
  //   location: "Harare, Bulawayo, Mutare",
  //   size: "40–60kW per branch",
  //   savings: "$22,000/year per site",
  //   payback: "3.0 years",
  //   description: "Solar powering refrigeration, lighting, and POS systems across major urban centres.",
  //   image: "https://images.unsplash.com/photo-1606813902789-df042db3f6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  // },
  {
    type: "Commercial Office Park",
    location: "Borrowdale, Harare",
    size: "180kW system",
    savings: "$75,000/year",
    payback: "4.0 years",
    description: "Shared solar systems supporting HVAC, lighting, and internet infrastructure in business hubs.",
    image: "https://images.unsplash.com/photo-1600585154356-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Logistics & Distribution Center",
    location: "Willowvale, Harare",
    size: "500kW rooftop system",
    savings: "$140,000/year",
    payback: "3.6 years",
    description: "Warehouses with solar for forklifts, lighting, and 24/7 surveillance operations.",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0edc2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Shopping Mall",
    location: "Victoria Falls",
    size: "300kW grid-tied system",
    savings: "$100,000/year",
    payback: "3.9 years",
    description: "Retail and entertainment spaces powered during peak hours, reducing grid strain.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];


export default function CommercialPage() {
  const [showChat, setShowChat] = useState(false);

  const handleInstantInquiry = () => {
    const context = "Commercial - Business solar solution with ROI analysis";
    window.location.href = `/#contact?context=${encodeURIComponent(context)}`;
  };

  const handleSmartTESOpen = () => {
    setShowChat(true);
  };

  return (
    <div id="biz" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-solar-blue/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Building className="w-16 h-16 text-solar-blue mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Commercial Solar Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your business with scalable solar power. Reduce operational costs, enhance your brand, 
              and achieve energy independence with systems designed for African commercial needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleInstantInquiry}
                className="bg-solar-blue text-white px-8 py-4 text-lg flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Business Quote
              </Button>
              <Button 
                onClick={handleSmartTESOpen}
                variant="outline" 
                className="px-8 py-4 text-lg flex items-center"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate ROI with AI
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Highlight */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Business Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-blue">3.5 years</div>
                <div className="text-muted-foreground">Average Payback Period</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-solar-orange">45%</div>
                <div className="text-muted-foreground">Average Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">25 years</div>
                <div className="text-muted-foreground">System Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Commercial Solar Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-solar-blue mb-4" />
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

      {/* Use Cases */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories by Business Type</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.type}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{useCase.type}</h3>
                    <Badge className="bg-green-500 text-white">{useCase.payback} ROI</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold">System Size:</span>
                      <div className="text-muted-foreground">{useCase.size}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Annual Savings:</span>
                      <div className="text-muted-foreground">{useCase.savings}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
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
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Commercial solar installation"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Businesses Choose Solar</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleInstantInquiry}
                className="mt-8 bg-solar-blue text-white"
              >
                Transform Your Business
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SmartTES Integration */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] relative ">
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
                console.log("Commercial sizing request:", description);
              }}
              onQuoteRequest={(details) => {
                console.log("Commercial quote request:", details);
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
          console.log("Commercial sizing request:", description);
        }}
        onQuoteRequest={(details) => {
          console.log("Commercial quote request:", details);
        }}
      />
    </div>
  );
}