// pages/genesserves.tsx

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Settings, Clock, Fuel, Shield, Wrench, CheckCircle, AlertTriangle } from "lucide-react";

const generatorServices = [
  {
    icon: Zap,
    title: "Generator Supply",
    description: "High-quality diesel and gas generators for backup power",
    features: ["Residential generators", "Commercial generators", "Industrial generators", "Portable units", "Standby systems"]
  },
  {
    icon: Settings,
    title: "Installation Services",
    description: "Professional generator installation and commissioning",
    features: ["Site preparation", "Electrical connections", "Fuel system setup", "Control panel wiring", "System testing"]
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    description: "Comprehensive maintenance to keep generators running reliably",
    features: ["Scheduled maintenance", "Emergency repairs", "Parts replacement", "Performance tuning", "24/7 support"]
  },
  {
    icon: Fuel,
    title: "Fuel Management",
    description: "Complete fuel supply and management services",
    features: ["Fuel delivery", "Tank monitoring", "Quality testing", "Fuel conditioning", "Emergency supply"]
  }
];

const generatorTypes = [
  {
    type: "Portable Generators",
    power: "1kW - 10kW",
    fuel: "Petrol/Diesel",
    applications: ["Home backup", "Events", "Construction sites", "Emergency power"]
  },
  {
    type: "Standby Generators",
    power: "10kW - 50kW",
    fuel: "Diesel/Gas",
    applications: ["Home backup", "Small business", "Critical systems", "Automatic start"]
  },
  {
    type: "Commercial Generators",
    power: "50kW - 500kW",
    fuel: "Diesel",
    applications: ["Office buildings", "Retail centers", "Manufacturing", "Hospitals"]
  },
  {
    type: "Industrial Generators",
    power: "500kW+",
    fuel: "Diesel/Gas",
    applications: ["Large facilities", "Data centers", "Prime power", "Grid support"]
  }
];

const maintenanceServices = [
  { service: "Oil & Filter Changes", frequency: "Every 100 hours or 6 months" },
  { service: "Coolant System Service", frequency: "Every 500 hours or annually" },
  { service: "Fuel System Cleaning", frequency: "Every 400 hours or annually" },
  { service: "Battery Testing", frequency: "Monthly" },
  { service: "Load Bank Testing", frequency: "Annually" },
  { service: "Control Panel Inspection", frequency: "Every 6 months" }
];

const benefits = [
  { icon: Clock, title: "Rapid Response", description: "24/7 emergency service for critical power needs" },
  { icon: Shield, title: "Reliable Backup", description: "Ensure continuous power during outages and emergencies" },
  { icon: Settings, title: "Expert Service", description: "Certified technicians with extensive generator experience" },
  { icon: CheckCircle, title: "Quality Parts", description: "Genuine OEM parts and quality aftermarket alternatives" }
];

export default function GeneratorServicesPage() {
  return (
    <div id="generators" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-600/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gray-600/10 text-gray-600">Generator Services & Supply</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Reliable Backup Power
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Complete generator solutions for homes, businesses, and industrial facilities. From supply and installation 
              to maintenance and emergency repairs, we keep your power running when you need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Get Generator Quote
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                Emergency Service
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Services */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Generator Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generatorServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-gray-600 mb-4" />
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

      {/* Generator Types */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Generator Types & Specifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {generatorTypes.map((generator, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-solar-orange">{generator.type}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Power Range:</strong> {generator.power}</p>
                    <p><strong>Fuel Type:</strong> {generator.fuel}</p>
                    <div>
                      <p><strong>Applications:</strong></p>
                      <ul className="mt-2 space-y-1">
                        {generator.applications.map((app, idx) => (
                          <li key={idx} className="flex items-center">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Schedule */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Maintenance Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((maintenance, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{maintenance.service}</h3>
                  <p className="text-muted-foreground text-sm">{maintenance.frequency}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Generator Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Service */}
      <section className="py-16 bg-red-50 dark:bg-red-900/20 border-y border-red-200 dark:border-red-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-400">Emergency Generator Service</h2>
          <p className="text-xl mb-8 text-red-600 dark:text-red-300">
            Generator not starting? Power outage affecting your business? Call our 24/7 emergency hotline for immediate assistance.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
            Emergency Hotline: +263 xxx xxxx
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-solar-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Reliable Backup Power?</h2>
          <p className="text-xl mb-8">
            Don't let power outages disrupt your life or business. Contact us for generator solutions tailored to your needs.
          </p>
          <Button className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Get Generator Quote
          </Button>
        </div>
      </section>

      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
