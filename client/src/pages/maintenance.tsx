
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Settings, AlertTriangle, CheckCircle, TrendingUp, Shield, Wrench } from "lucide-react";

const maintenanceServices = [
  {
    icon: Calendar,
    title: "Preventive Maintenance",
    description: "Regular scheduled maintenance to prevent issues and optimize performance",
    features: ["Monthly inspections", "Panel cleaning", "Connection checks", "Performance analysis", "Preventive repairs"]
  },
  {
    icon: AlertTriangle,
    title: "Emergency Repairs",
    description: "24/7 emergency response for critical system failures",
    features: ["24/7 hotline", "Rapid response", "Emergency diagnostics", "Temporary solutions", "Priority scheduling"]
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "System tuning and upgrades to maximize energy production",
    features: ["Performance audits", "System upgrades", "Efficiency improvements", "Monitoring setup", "ROI analysis"]
  },
  {
    icon: Wrench,
    title: "Component Replacement",
    description: "Professional replacement of faulty or aging system components",
    features: ["Quality parts", "Warranty coverage", "Professional installation", "System testing", "Documentation"]
  }
];

const maintenanceSchedule = [
  { frequency: "Monthly", tasks: ["Visual inspection", "Performance monitoring", "Basic cleaning", "Safety checks"] },
  { frequency: "Quarterly", tasks: ["Deep cleaning", "Connection tightening", "Inverter maintenance", "Battery testing"] },
  { frequency: "Annually", tasks: ["Comprehensive inspection", "Electrical testing", "System calibration", "Warranty reviews"] },
  { frequency: "As Needed", tasks: ["Emergency repairs", "Component replacement", "System upgrades", "Weather damage repair"] }
];

const benefits = [
  { icon: Clock, title: "Extended System Life", description: "Regular maintenance extends equipment lifespan by 25-30%" },
  { icon: TrendingUp, title: "Optimal Performance", description: "Maintain 95%+ of rated system performance year-round" },
  { icon: Shield, title: "Warranty Protection", description: "Keep manufacturer warranties valid with documented maintenance" },
  { icon: CheckCircle, title: "Cost Savings", description: "Prevent costly repairs and maximize energy production" }
];

export default function MaintenancePage() {
  return (
    <div id="maintain" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-solar-blue/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-solar-blue/10 text-solar-blue">Professional Maintenance Services</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Solar System Maintenance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Keep your solar investment performing at its peak with our comprehensive maintenance services. 
              From routine cleaning to emergency repairs, we ensure maximum energy production and system longevity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                Emergency Service
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Maintenance Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceServices.map((service, index) => (
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

      {/* Maintenance Schedule */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Maintenance Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenanceSchedule.map((schedule, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-solar-orange">{schedule.frequency}</h3>
                  <ul className="space-y-2">
                    {schedule.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Regular Maintenance Matters</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-solar-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-solar-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-solar-blue to-solar-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Solar Investment?</h2>
          <p className="text-xl mb-8">
            Don't let poor maintenance reduce your solar system's performance. Contact us today for a maintenance plan tailored to your needs.
          </p>
          <Button className="bg-cyan-200 text-black hover:bg-gray-400 px-8 py-3 text-lg">
            Get Maintenance Quote
          </Button>
        </div>
      </section>

      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
