
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Factory, BookOpenCheck, Mountain, Wheat, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const industries = [
  {
    icon: Home,
    title: "Residential",
    description: "Complete home solar systems setup and installtions for any homestead.",
    features: ["Rooftop installations", "Home backup systems", "Grid-tie solutions"],
    color: "text-solar-orange",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    href: "/residential"
  },
  {
    icon: Building,
    title: "Commercial",
    description: "Energy solutions for offices, retail, and commercial buildings.",
    features: ["Cost reduction", "Energy independence", "Sustainability goals"],
    color: "text-solar-blue",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    href: "/commercial"
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Large-scale power solutions for manufacturing and processing.",
    features: ["High-capacity systems", "Process optimization", "Load management"],
    color: "text-solar-yellow",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    href: "/industrial"
  },
  {
    icon: Mountain,
    title: "Mining",
    description: "Reliable power for remote mining operations and extraction.",
    features: ["Off-grid solutions", "24/7 reliability", "Harsh environment design"],
    color: "text-gray-600",
    bgColor: "bg-gray-50 dark:bg-gray-800",
    href: "/mining"
  },
  {
    icon: Wheat,
    title: "Agricultural",
    description: "Sustainable energy for farming, irrigation, and processing.",
    features: ["Irrigation pumping", "Cold storage", "Processing facilities"],
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    href: "/agricultural"
  },
  // {
  //   icon: BookOpenCheck,
  //   title: "Education",
  //   description: "Empowering schools and institutions with sustainable energy in remote and urban locations.",
  //   features: [
  //     "Solar-powered classrooms",
  //     "E-learning infrastructure",
  //     "Smart campus integrations"
  //   ],
  //   color: "text-purple-600",
  //   bgColor: "bg-purple-50 dark:bg-purple-900/20",
  //   href: "/education"
  // }  
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Industries We Serve
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-left">
            Tailored solar solutions for every sector.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className={`${industry.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group card-hover border-0 h-full`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className={`${industry.color} text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {industry.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm flex-grow">
                  {industry.description}
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  {industry.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-current rounded-full mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={industry.href}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-foreground hover:text-solar-orange mt-auto"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
