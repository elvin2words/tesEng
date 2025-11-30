//components/services-section.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Sun, Factory, Wrench, Battery, Lightbulb, GraduationCap, Check, ChevronDown } from "lucide-react";
import { Link } from "wouter"; // or 'next/link' or 'react-router-dom'
import { cn } from "@/lib/utils"; // Optional utility if you're using classnames
import SmartLink from "./SmartLink";


const services = [ 
  {
    icon: Sun,
    title: "Solar Energy Systems",
    description: "Complete solar installations from residential rooftops to large-scale commercial and industrial projects.",
    features: ["Grid-tied systems", "Off-grid solutions", "Hybrid installations"],
    color: "text-solar-orange",
    href: "/services/solar-energy"
  },
  {
    icon: Factory,
    title: "Industrial Engineering",
    description: "Advanced engineering solutions for manufacturing, mining, and large-scale industrial operations.",
    features: ["Process optimization", "Energy audits", "Automation systems"],
    color: "text-solar-blue",
    href: "/services/industrial"
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Comprehensive maintenance programs ensuring optimal performance and longevity of your energy systems.",
    features: ["24/7 monitoring", "Preventive maintenance", "Technical support"],
    color: "text-solar-yellow",
    href: "/services/maintenance"
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description: "Advanced battery systems and energy storage solutions for reliable power availability.",
    features: ["Lithium-ion batteries", "Grid stabilization", "Backup systems"],
    color: "text-solar-orange",
    href: "/services/storage"
  },
  {
    icon: Lightbulb,
    title: "Consulting Services",
    description: "Expert guidance on energy strategy, feasibility studies, and sustainable development planning.",
    features: ["Feasibility studies", "ROI analysis", "Regulatory compliance"],
    color: "text-solar-blue",
    href: "/services/consulting"
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Comprehensive training programs for local technicians and engineers to build sustainable capacity.",
    features: ["Technical certification", "Safety protocols", "Ongoing education"],
    color: "text-solar-yellow",
    href: "/services/training"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Our Services
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-left">
            Comprehensive High Voltage Engineering and Renewable Energy Solutions designed for your unique challenges and opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <SmartLink key={index} to={service.href} className="group block focus:outline-none">
              <Card
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 card-hover border border-transparent group-hover:border-solar-orange/70",
                  "transform hover:-translate-y-1 hover:scale-[1.01]"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 sm:p-8 cursor-pointer">
                  <div className={`${service.color} text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-fade-in`}>
                    <service.icon className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-solar-orange">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    {service.description}
                  </p>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </SmartLink>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 transform left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </section>
  );
}
