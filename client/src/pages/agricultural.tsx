//pages/agricultural.tsx

import { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, TrendingUp, Tractor, Droplets, Clock, Award, PhoneCall, MessageCircle, Calculator, Wrench, Package, Cog, Bot, Wheat, Snowflake, Sun, Settings } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ContactSection from "@/components/contact-section";
import { Helmet } from "react-helmet-async";


const benefits = [
  "Reliable power for irrigation in remote areas",
  "Cold storage solutions for crop preservation",
  "Reduced operational costs by 70%",
  "Year-round farming with controlled environment",
  "Water pumping systems for livestock",
  "Processing equipment for value addition"
];

const serviceCategories = [
  {
    icon: Droplets,
    title: "Irrigation Systems",
    description: "Solar-powered water pumping and distribution",
    features: ["Borehole pumps", "Drip irrigation", "Smart controllers", "Water storage"]
  },
  {
    icon: Snowflake,
    title: "Cold Storage",
    description: "Preserve crops and reduce post-harvest losses",
    features: ["Temperature control", "Humidity management", "Backup power", "Monitoring systems"]
  },
  {
    icon: Settings,
    title: "Processing Equipment",
    description: "Value-addition through solar-powered processing",
    features: ["Grain mills", "Dairy equipment", "Sorting machines", "Packaging systems"]
  },
  {
    icon: Sun,
    title: "Off-Grid Solutions",
    description: "Complete energy independence for remote farms",
    features: ["Battery storage", "Hybrid systems", "Generator backup", "Remote monitoring"]
  }
];

const seasonalData = [
  { season: "Dry Season", months: "May - Sep", irrigation: "High", storage: "Critical", power: "Peak" },
  { season: "Wet Season", months: "Oct - Apr", irrigation: "Low", storage: "Moderate", power: "Standard" },
  { season: "Harvest", months: "Mar - Jun", irrigation: "Moderate", storage: "Maximum", power: "High" },
  { season: "Planting", months: "Oct - Dec", irrigation: "High", storage: "Low", power: "Moderate" }
];

const farmProjects = [
  {
    type: "Horticulture Farm",
    location: "Marondera, Mashonaland East",
    size: "20kW + solar pump",
    description: "Solar-powered drip irrigation for tomatoes, onions, and leafy greens across 10 hectares.",
    impact: "300% yield increase",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Dairy & Livestock Farm",
    location: "Gweru, Midlands Province",
    size: "50kW + storage",
    description: "Powering milk cooling tanks, barn ventilation, and water pumping systems for 150+ cattle.",
    impact: "$35,000+/year savings",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  },
  {
    type: "Grain Drying Facility",
    location: "Mutoko, Mash East",
    size: "60kW + Battery System",
    description: "Solar-powered drying, milling, and storage facility serving local farmers’ cooperatives.",
    impact: "post-harvest losses by -40%",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  }
];

export default function AgriculturalPage() {
  const [showChat, setShowChat] = useState(false);

  // const handleInstantInquiry = () => {
  //   const context = "Agricultural - Solar irrigation and cold storage solution";
  //   window.location.href = `/#contact?context=${encodeURIComponent(context)}`;
  // };

  const handleInstantInquiry = () => {
    setShowChat(true);
  };

  const handleSmartTESOpen = () => {
    setShowChat(true);
  };

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
      <Navigation />

      {/* Hero Section */}
      <section id="agric" className="pt-20 pb-16 bg-gradient-to-br from-green-100 to-solar-orange/10 dark:from-green-900/20 dark:to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Wheat className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Agricultural Solar Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Sustainable energy for farming, irrigation, and food processing. Increase yields, 
              reduce costs, and build climate-resilient agricultural operations across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleInstantInquiry}
                className="bg-green-600 text-white px-8 py-4 text-lg flex items-center hover:bg-green-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Farm Solar Quote
              </Button>
              <Button 
                onClick={handleSmartTESOpen}
                variant="outline" 
                className="px-8 py-4 text-lg flex items-center"
              >
                <Droplets className="w-5 h-5 mr-2" />
                Design Irrigation System
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Impact Chart */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Seasonal Energy Needs</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {seasonalData.map((season, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{season.season}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{season.months}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Irrigation:</span>
                      <Badge variant={season.irrigation === 'High' ? 'default' : 'secondary'}>
                        {season.irrigation}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <Badge variant={season.storage === 'Critical' || season.storage === 'Maximum' ? 'default' : 'secondary'}>
                        {season.storage}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Power:</span>
                      <Badge variant={season.power === 'Peak' || season.power === 'High' ? 'default' : 'secondary'}>
                        {season.power}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Agricultural Solar Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-10 h-10 text-green-600 mb-4" />
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

      {/* Farm Projects */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Farm Success Stories</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {farmProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.type}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{project.type}</h3>
                      <p className="text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge className="bg-green-500 text-white">{project.impact}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold">System: </span>
                    <span className="text-muted-foreground">{project.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
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
              <h2 className="text-3xl font-bold mb-6">Transform Your Farm</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">70%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">300%</div>
                  <div className="text-sm text-muted-foreground">Yield Increase</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Solar irrigation system"
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
                console.log("Agricultural sizing request:", description);
              }}
              onQuoteRequest={(details) => {
                console.log("Agricultural quote request:", details);
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
          console.log("Agricultural sizing request:", description);
        }}
        onQuoteRequest={(details) => {
          console.log("Agricultural quote request:", details);
        }}
      />
    </div>
  );
}