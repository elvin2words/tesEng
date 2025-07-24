import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Bot, Building2, Tractor, ArrowRight, MapPin, Zap, Battery, Sun } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

// Minimal Project interface based on API + featuredProjects extra fields (optional)
interface Project {
  id: number;
  title: string;
  location: string;
  capacity?: string;
  description: string;
  status: string;
  imageUrl?: string | null;
  createdAt: string; // or Date if parsed
  // optional extra fields matching featuredProjects:
  challenge?: string;
  systemSize?: string;
  batteryStorage?: string;
  inverter?: string;
  savings?: string;
  features?: string[];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ctaText?: string;
  ctaLink?: string;
  statusColor?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "planning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "concept design":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Freedom Home - Glen Lorne",
    location: "Glen Lorne, Harare",
    status: "Concept Design",
    statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    challenge: "A family of five faces daily ZESA load-shedding during critical hours",
    systemSize: "5.0kW Solar Array",
    batteryStorage: "10.24kWh LiFePO₄",
    inverter: "7.5kVA Hybrid Inverter",
    savings: "$90-$120/month",
    description: "Hybrid solar system optimized for backup and daily usage with load prioritization for essential loads.",
    features: ["12 x 415W panels", "Load Prioritization System", "Uninterrupted evening power", "Zero generator costs"],
    icon: Home,
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    ctaText: "See More Residential Designs",
    ctaLink: "/projects/residential",
  },
  {
    id: 2,
    title: "Smart Retail Backup - Avondale Grocery",
    location: "Avondale, Harare",
    status: "Planned Deployment",
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    challenge: "Unpredictable power outages threatening cold storage and POS operations",
    systemSize: "8.5kW PV System",
    batteryStorage: "15kWh Lithium Storage",
    inverter: "Three-Phase 10kVA",
    savings: "$180/month fuel savings",
    description: "Clean, quiet alternative to aging diesel generator with solar shade parking structure.",
    features: ["Roof & awning installation", "WiFi monitoring dashboard", "Smart load shedding", "3-year ROI"],
    icon: Building2,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    ctaText: "Explore Commercial Solutions",
    ctaLink: "/projects/commercial",
  },
  {
    id: 3,
    title: "Solar-Powered Cold Room - Mutoko Farmers' Co-op",
    location: "Mutoko, Mashonaland East",
    status: "Community Pilot",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    challenge: "Post-harvest losses due to lack of refrigerated storage in off-grid area",
    systemSize: "15kW Off-Grid Array",
    batteryStorage: "48kWh Battery Bank",
    inverter: "Modular System",
    savings: "65% waste reduction",
    description: "Off-grid solution preserving 3 tons of produce per week with smart switching for cloudy days.",
    features: ["Cold room power", "Irrigation pump", "Office lighting", "Upgradeable hardware"],
    icon: Tractor,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    ctaText: "Partner with TES for OffGrid Setups",
    ctaLink: "/projects/agricultural",
  },
];

export default function ProjectsSection() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: () => fetch("/api/projects").then((res) => res.json()),
  });

  const projectsToRender = projects && projects.length > 0 ? projects : featuredProjects;

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-right">
            Transforming communities across Zimbabwe with innovative solar energy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-0">
                <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-600 dark:text-red-400">Failed to load projects</p>
            </div>
          ) : !projectsToRender || projectsToRender.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          ) : (
            projectsToRender.map((project, index) => {
              // Fallback icon
              const IconComponent = project.icon || Home;
              const statusColor = project.statusColor || getStatusColor(project.status);

              return (
                <Card
                  key={project.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group card-hover border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        project.imageUrl ||
                        // fallback images for featuredProjects keys that use image instead of imageUrl
                        // @ts-ignore
                        project.image ||
                        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                      }
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`text-xs font-semibold px-2.5 py-1 ${statusColor}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-2">
                      <IconComponent className="w-5 h-5 text-solar-orange" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>

                    {project.challenge && (
                      <p className="text-sm text-muted-foreground mb-4 italic">"{project.challenge}"</p>
                    )}

                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                    {/* System Specs */}
                    {(project.systemSize || project.batteryStorage || project.savings) && (
                      <div className="grid grid-cols-1 gap-3 mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        {project.systemSize && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4 text-solar-orange" />
                              <span className="font-medium">System:</span>
                            </div>
                            <span className="text-muted-foreground">{project.systemSize}</span>
                          </div>
                        )}
                        {project.batteryStorage && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Battery className="w-4 h-4 text-solar-blue" />
                              <span className="font-medium">Storage:</span>
                            </div>
                            <span className="text-muted-foreground">{project.batteryStorage}</span>
                          </div>
                        )}
                        {project.savings && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-solar-yellow" />
                              <span className="font-medium">Savings:</span>
                            </div>
                            <span className="text-green-600 font-semibold">{project.savings}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {project.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-solar-orange rounded-full mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Call to Action */}
                    {project.ctaLink && project.ctaText && (
                      <Link href={project.ctaLink}>
                        <Button
                          variant="ghost"
                          className="w-full hover:underline justify-between text-foreground hover:text-solar-orange hover:bg-solar-orange/10 transition-all"
                        >
                          {project.ctaText}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Mini Case Study */}
        <div className="max-w-5xl mx-auto mb-16 animate-fade-in-up">
          <Card className="bg-gradient-to-br from-solar-orange/10 to-solar-blue/10 dark:from-solar-orange/20 dark:to-solar-blue/20 border-0 rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-10 space-y-8">
              {/* Header */}
              <div className="text-center">
                <Badge className="bg-solar-orange text-white text-xs uppercase tracking-wider mb-4">
                  Powered by SmartTES AI
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Anonymous Client - Waterfalls, ZW
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  See how SmartTES AI interprets household needs, applies optimization algorithms, and instantly
                  generates an intelligent energy system — with install-ready specs.
                </p>
              </div>

              {/* AI Breakdown */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Client Input */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-solar-orange" />
                    Client Conversation Snapshot
                  </h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>🔋 Daily Energy Use:</span>
                      <span className="font-semibold text-foreground">12.5 kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>⏳ Backup Days Needed:</span>
                      <span className="font-semibold text-foreground">2 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>☀️ Sunlight Availability:</span>
                      <span className="font-semibold text-foreground">5.2 hrs/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🏡 Property Type:</span>
                      <span className="font-semibold text-foreground">Suburban Home</span>
                    </div>
                    <div className="flex justify-between">
                      <span>⚡ Load Priorities:</span>
                      <span className="font-semibold text-foreground">Fridge, Lights, Pump</span>
                    </div>
                  </div>
                </div>

                {/* AI Output */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-solar-blue" />
                    SmartTES AI Response
                  </h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>📊 Optimal System Size:</span>
                      <span className="font-semibold text-solar-orange">3.5 kW</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🔆 Panel Configuration:</span>
                      <span className="font-semibold text-solar-blue">9 x 400W</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🔋 Battery Bank Required:</span>
                      <span className="font-semibold text-solar-yellow">25 kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📦 Inverter Suggestion:</span>
                      <span className="font-semibold text-green-500">5kW Hybrid</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🧠 Optimization Logic:</span>
                      <span className="italic text-xs text-right">
                        Energy profile + Weather Profile + Fault Tolerance
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Summary */}
              <div className="text-center">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  ✅ SmartTES instantly generates a downloadable system report, and matches the client with certified
                  installers in the area.
                </p>
                <Link href="/sizing-tool">
                  <Button className="bg-solar-orange text-white hover:bg-orange-600 px-6 py-3 text-sm sm:text-base font-medium rounded-full transition-transform transform hover:scale-105">
                    Try SmartTES Sizing Tool
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={handleScrollToContact}
            className="bg-solar-orange text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 animate-pulse-glow"
          >
            Get Your Own System Setup Today
          </Button>
        </div>
      </div>
    </section>
  );
}
