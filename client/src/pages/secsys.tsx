//pages/secsys.tsx

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Camera, Wifi, Smartphone, Lock, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const securityServices = [
  {
    icon: Camera,
    title: "CCTV Systems",
    description: "Advanced surveillance systems for comprehensive security monitoring",
    features: ["HD/4K cameras", "Night vision", "Motion detection", "Remote viewing", "Cloud storage"]
  },
  {
    icon: Shield,
    title: "Access Control",
    description: "Secure entry systems for buildings and restricted areas",
    features: ["Card readers", "Biometric systems", "Keypad entry", "Remote management", "Audit trails"]
  },
  {
    icon: Wifi,
    title: "Smart Security",
    description: "IoT-enabled security systems with intelligent automation",
    features: ["Smart sensors", "Automated alerts", "Mobile integration", "AI analytics", "Real-time monitoring"]
  },
  {
    icon: Eye,
    title: "Monitoring Services",
    description: "24/7 professional monitoring and response services",
    features: ["Live monitoring", "Instant alerts", "Emergency response", "Professional security", "Remote support"]
  }
];

const systemTypes = [
  {
    category: "Residential Security",
    systems: ["Home surveillance", "Smart doorbells", "Window/door sensors", "Motion detectors", "Panic buttons"],
    features: ["Mobile app control", "Family notifications", "Easy self-monitoring", "Affordable packages"]
  },
  {
    category: "Commercial Security",
    systems: ["Multi-camera networks", "Access control integration", "Perimeter protection", "Business monitoring", "Employee management"],
    features: ["Scalable solutions", "Professional monitoring", "Business integration", "Compliance ready"]
  },
  {
    category: "Industrial Security",
    systems: ["Heavy-duty cameras", "Harsh environment protection", "Large area coverage", "Integration with safety systems", "Advanced analytics"],
    features: ["Rugged equipment", "Industrial protocols", "Safety compliance", "24/7 operation"]
  }
];

const features = [
  { icon: Smartphone, title: "Mobile Control", description: "Control and monitor your security system from anywhere" },
  { icon: Camera, title: "HD Recording", description: "Crystal clear video recording in HD and 4K resolution" },
  { icon: Wifi, title: "Remote Access", description: "Access your system remotely via internet connection" },
  { icon: Lock, title: "Secure Storage", description: "Encrypted cloud storage and local backup options" }
];

const technologies = [
  "AI-Powered Analytics",
  "Facial Recognition",
  "License Plate Recognition",
  "Thermal Imaging",
  "Motion Detection",
  "Audio Analytics",
  "Cloud Integration",
  "Mobile Alerts"
];

export default function SecuritySystemsPage() {
  return (
    <div id="security" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* ✅ SEO */}
      <Helmet>
        <title>Security Systems in Zimbabwe | CCTV, Access Control & Smart Security</title>
        <meta
          name="description"
          content="TES provides advanced security solutions in Zimbabwe, including CCTV systems, access control, smart IoT security, and 24/7 monitoring for homes, businesses, and industries."
        />
        <meta name="keywords" content="Security systems Zimbabwe, CCTV Harare, Access control, Smart security, Surveillance cameras, Alarm systems, Industrial security" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Security Systems in Zimbabwe | CCTV & Smart Solutions" />
        <meta property="og:description" content="Protect your home, business, or industrial site with TES’s CCTV, access control, and smart security systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tesengineering.com/services/security" />
        <meta property="og:image" content="https://tesengineering.com/images/security-preview.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Security Systems in Zimbabwe | CCTV & Smart Solutions" />
        <meta name="twitter:description" content="TES installs CCTV, access control, smart IoT security, and 24/7 monitoring services." />
        <meta name="twitter:image" content="https://tesengineering.com/images/security-preview.png" />
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-600/10 text-blue-600">Advanced Security Systems</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Digital Security Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Protect what matters most with our comprehensive security systems. From CCTV surveillance to smart access control, 
              we provide cutting-edge security solutions for homes, businesses, and industrial facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Get Security Quote
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                Free Security Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Services */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Security Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
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

      {/* System Types */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Security Solutions by Sector</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {systemTypes.map((type, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-solar-orange">{type.category}</h3>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Systems Include:</h4>
                    <ul className="space-y-1">
                      {type.systems.map((system, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {system}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Security Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Cutting-Edge Technologies</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our security systems incorporate the latest technologies for superior protection and intelligent monitoring.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                <span className="font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/20 border-y border-blue-200 dark:border-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">24/7 Monitoring & Response</h2>
          <p className="text-xl mb-8 text-blue-600 dark:text-blue-300">
            Our professional monitoring center provides round-the-clock surveillance and immediate emergency response coordination.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            Learn About Monitoring
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-solar-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Secure Your Property Today</h2>
          <p className="text-xl mb-8">
            Don't leave your security to chance. Get a comprehensive security assessment and custom solution designed for your needs.
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
            Schedule Security Assessment
          </Button>
        </div>
      </section>

      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
