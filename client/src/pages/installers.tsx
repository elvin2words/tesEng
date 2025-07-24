
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, MapPin, Award, Zap, MessageCircle, User, Phone, Mail } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";

interface Installer {
  id: number;
  name: string;
  region: string;
  experience: string;
  systemTypes: string;
  certifications: string | null;
  rating: number;
  totalInstalls: number;
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
}

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string | null;
  projectType: string | null;
  createdAt: string;
}

// Sample data for TES team members (will be replaced with real data)
const sampleInstallers: Installer[] = [
  {
    id: 1,
    name: "John Mwangi",
    region: "Harare",
    experience: "8 years",
    systemTypes: "Residential, Commercial, Hybrid Systems",
    certifications: "TES Certified Master Installer, Solar Energy Technician",
    rating: 5,
    totalInstalls: 145,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Expert in residential and commercial solar installations with focus on energy storage solutions.",
    isActive: true
  },
  {
    id: 2,
    name: "Sarah Mukamuri",
    region: "Bulawayo",
    experience: "6 years",
    systemTypes: "Industrial, Mining, Agricultural",
    certifications: "TES Certified Senior Installer, Industrial Systems Specialist",
    rating: 5,
    totalInstalls: 98,
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Specializes in large-scale industrial installations and mining sector solar solutions.",
    isActive: true
  },
  {
    id: 3,
    name: "David Chikwanha",
    region: "Mutare",
    experience: "5 years",
    systemTypes: "Residential, Agricultural, Off-grid Systems",
    certifications: "TES Certified Installer, Off-grid Systems Expert",
    rating: 5,
    totalInstalls: 87,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Expert in rural and agricultural installations, specializing in off-grid solar pumping systems.",
    isActive: true
  },
  {
    id: 4,
    name: "Grace Sibanda",
    region: "Gweru",
    experience: "4 years",
    systemTypes: "Residential, Commercial, Maintenance",
    certifications: "TES Certified Installer, Maintenance Specialist",
    rating: 5,
    totalInstalls: 63,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Focuses on residential installations and comprehensive maintenance services.",
    isActive: true
  },
  {
    id: 5,
    name: "Peter Magwenzi",
    region: "Masvingo",
    experience: "7 years",
    systemTypes: "Commercial, Industrial, Grid-tie Systems",
    certifications: "TES Certified Senior Installer, Grid-tie Specialist",
    rating: 5,
    totalInstalls: 112,
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Expert in commercial and industrial grid-tie systems with extensive project management experience.",
    isActive: true
  },
  {
    id: 6,
    name: "Tendai Nyamunda",
    region: "Chinhoyi",
    experience: "3 years",
    systemTypes: "Residential, Small Commercial, Training",
    certifications: "TES Certified Installer, Training Coordinator",
    rating: 5,
    totalInstalls: 45,
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    description: "Experienced installer who also conducts technical training for new technicians.",
    isActive: true
  }
];

const regions = ["All Regions", "Harare", "Bulawayo", "Mutare", "Gweru", "Masvingo", "Chinhoyi"];

export default function Installers() {
  const [installers, setInstallers] = useState<Installer[]>(sampleInstallers);
  const [filteredInstallers, setFilteredInstallers] = useState<Installer[]>(sampleInstallers);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [newReview, setNewReview] = useState({
    clientName: "",
    rating: 5,
    comment: "",
    projectType: ""
  });

  useEffect(() => {
    let filtered = installers;

    if (selectedRegion !== "All Regions") {
      filtered = filtered.filter(installer => installer.region === selectedRegion);
    }

    if (searchTerm) {
      filtered = filtered.filter(installer =>
        installer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        installer.systemTypes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        installer.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredInstallers(filtered);
  }, [selectedRegion, searchTerm, installers]);

  const handleRequestInstaller = (installer: Installer) => {
    // This would integrate with the contact form or create a job assignment
    const message = `I would like to request installer ${installer.name} from ${installer.region} for my solar project.`;
    
    // For now, we'll scroll to the contact section or open SmartTES
    const contactEvent = new CustomEvent('openSmartTES', { 
      detail: { message } 
    });
    window.dispatchEvent(contactEvent);
  };

  const submitReview = async () => {
    if (!selectedInstaller) return;
    
    const review: Review = {
      id: Date.now(),
      ...newReview,
      createdAt: new Date().toISOString()
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ clientName: "", rating: 5, comment: "", projectType: "" });
    setShowReviewDialog(false);
    
    // Here you would make an API call to save the review
    // await fetch(`/api/installers/${selectedInstaller.id}/reviews`, { ... });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-solar-yellow fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-blue via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Find Trusted Experts Near You
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Browse our network of TES certified installers across Zimbabwe. 
            Every installer is vetted, trained, and committed to delivering excellence in solar installations.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Search by name, location, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Installers Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstallers.map((installer) => (
              <Card key={installer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={installer.imageUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200`}
                      alt={installer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{installer.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{installer.region}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {renderStars(installer.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({installer.totalInstalls} installs)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-solar-orange" />
                        <span className="font-semibold">Experience</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{installer.experience}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-solar-yellow" />
                        <span className="font-semibold">Specializations</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{installer.systemTypes}</p>
                    </div>

                    {installer.certifications && (
                      <div className="space-y-1">
                        {installer.certifications.split(',').map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {installer.description && (
                      <p className="text-sm text-muted-foreground">{installer.description}</p>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => handleRequestInstaller(installer)}
                        className="flex-1 bg-solar-orange hover:bg-orange-600"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Request Installer
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedInstaller(installer)}
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Contact {installer.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-center">
                              <img
                                src={installer.imageUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200`}
                                alt={installer.name}
                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                              />
                              <h3 className="text-lg font-semibold">{installer.name}</h3>
                              <p className="text-muted-foreground">{installer.region}</p>
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full" variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                Call Installer
                              </Button>
                              <Button className="w-full" variant="outline">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                              <Button
                                className="w-full bg-solar-orange hover:bg-orange-600"
                                onClick={() => handleRequestInstaller(installer)}
                              >
                                Request Quote
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInstallers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No installers found matching your criteria.
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedRegion("All Regions"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose TES Certified Installers */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose TES Certified Installers?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-solar-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-solar-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Certified Excellence</h3>
              <p className="text-muted-foreground">
                All our installers undergo rigorous training and certification to ensure the highest quality standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-solar-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-solar-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven Track Record</h3>
              <p className="text-muted-foreground">
                Each installer has completed numerous successful installations with verified customer satisfaction.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-solar-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-solar-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ongoing Support</h3>
              <p className="text-muted-foreground">
                Get continued support and maintenance services from your installer backed by TES warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SmartTESChat />
      <Footer />
      
      {/* Floating SmartTES Chat */}
      <SmartTESChat 
        isFloating={true}
        onSolarSizingRequest={(description) => {
          console.log("Installers page sizing request:", description);
        }}
        onQuoteRequest={(details) => {
          console.log("Installers page quote request:", details);
        }}
      />
    </div>
  );
}
