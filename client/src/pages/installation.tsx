// pages/installation.tsx

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, Shield, CheckCircle, Users, MapPin, Sun, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";

const installationServices = [
  {
    icon: Sun,
    title: "Residential Installation",
    description: "Professional rooftop and ground-mount solar installations for homes",
    features: ["Site assessment", "Permit handling", "Grid connection", "System commissioning", "Warranty setup"]
  },
  {
    icon: Settings,
    title: "Commercial Installation",
    description: "Large-scale solar installations for businesses and commercial buildings",
    features: ["Structural analysis", "Three-phase systems", "Load management", "Grid integration", "Performance monitoring"]
  },
  {
    icon: Zap,
    title: "Industrial Installation",
    description: "Heavy-duty solar systems for manufacturing and industrial facilities",
    features: ["High-voltage systems", "SCADA integration", "Safety protocols", "Compliance certification", "24/7 monitoring"]
  },
  {
    icon: MapPin,
    title: "Remote Installation",
    description: "Off-grid and remote location solar system installations",
    features: ["Off-grid design", "Battery integration", "Remote monitoring", "Harsh environment protection", "Satellite communication"]
  }
];

const installationProcess = [
  { step: 1, title: "Site Assessment", description: "Comprehensive evaluation of your location and energy needs" },
  { step: 2, title: "System Design", description: "Custom solar system design optimized for your requirements" },
  { step: 3, title: "Permits & Approvals", description: "Handle all necessary permits and utility approvals" },
  { step: 4, title: "Professional Installation", description: "Expert installation by certified technicians" },
  { step: 5, title: "Testing & Commissioning", description: "Thorough testing and system commissioning" },
  { step: 6, title: "Grid Connection", description: "Safe connection to the electrical grid and utility systems" }
];

const certifications = [
  "NABCEP Certified Installers",
  "IEC 61215 Compliance",
  "IEEE 1547 Standards",
  "Local Electrical Codes",
  "Safety Protocols OSHA",
  "Insurance & Bonding"
];

export default function InstallationPage() {
  return (
    <div id="install" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* ✅ Page-level SEO */}
      <Helmet>
        <title>Solar Installation Services in Zimbabwe | TES</title>
        <meta
          name="description"
          content="Professional solar installation services across Zimbabwe. Residential, commercial, industrial, and off-grid solar systems installed by certified experts."
        />
        <meta name="keywords" content="Solar installation Zimbabwe, Residential solar, Commercial solar, Off-grid solar, Solar companies Harare" />
        
        <meta property="og:title" content="Solar Installation Services in Zimbabwe | TES" />
        <meta property="og:description" content="From rooftops to industrial complexes, TES delivers safe, efficient, and code-compliant solar installations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tesengineering.com/services/installation" />
        <meta property="og:image" content="https://tesengineering.com/images/installation-preview.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Installation Services in Zimbabwe | TES" />
        <meta name="twitter:description" content="Expert solar installation services for homes, businesses, and industries across Zimbabwe." />
        <meta name="twitter:image" content="https://tesengineering.com/images/installation-preview.png" />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-solar-blue/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-solar-orange/10 text-solar-orange">Professional Installation Services</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Expert Solar Installation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Professional solar installation services across Zimbabwe. From residential rooftops to industrial complexes, 
              our certified technicians ensure safe, efficient, and code-compliant installations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Get Installation Quote
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Services */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Installation Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {installationServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-solar-blue mb-4" />
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

      {/* Installation Process */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Installation Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installationProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-solar-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Certified & Compliant Installations</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            All our installations meet international standards and local regulations for safety and performance.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-center p-4 border rounded-lg">
                <Shield className="w-6 h-6 text-solar-blue mr-3" />
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
