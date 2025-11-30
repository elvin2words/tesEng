//pages/supply.tsx 

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SmartTESChat from "@/components/smart-tes-chat";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Battery, Zap, Shield, Star, Package, TrendingUp, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const productCategories = [
  {
    icon: Sun,
    title: "Solar Panels",
    description: "High-efficiency Tier-1 solar panels from leading manufacturers",
    features: ["Monocrystalline & Polycrystalline", "25-year warranties", "High efficiency ratings", "Weather resistant", "IEC certified"]
  },
  {
    icon: Zap,
    title: "Inverters",
    description: "Reliable inverters for grid-tie and off-grid applications",
    features: ["String & micro inverters", "Hybrid capabilities", "Smart monitoring", "Grid compliance", "Remote diagnostics"]
  },
  {
    icon: Battery,
    title: "Energy Storage",
    description: "Advanced battery systems for energy independence",
    features: ["LiFePO4 technology", "Deep cycle capability", "Smart BMS", "Long lifespan", "Safety certified"]
  },
  {
    icon: Package,
    title: "System Components",
    description: "Complete range of mounting and electrical components",
    features: ["Mounting systems", "DC/AC cables", "Monitoring systems", "Safety equipment", "Installation hardware"]
  }
];

const brands = [
  { name: "Canadian Solar", category: "Panels", tier: "Tier 1" },
  { name: "Longi Solar", category: "Panels", tier: "Tier 1" },
  { name: "SolarMax", category: "Inverters", tier: "Premium" },
  { name: "Victron Energy", category: "Inverters", tier: "Premium" },
  { name: "CATL", category: "Batteries", tier: "Tier 1" },
  { name: "Pylontech", category: "Batteries", tier: "Premium" }
];

const qualityFeatures = [
  { icon: Star, title: "Tier-1 Components", description: "Only the highest quality components from verified manufacturers" },
  { icon: Shield, title: "Extended Warranties", description: "Comprehensive warranties backed by manufacturer support" },
  { icon: TrendingUp, title: "Performance Guarantee", description: "Guaranteed performance specifications and efficiency ratings" },
  { icon: CheckCircle, title: "Quality Assurance", description: "Rigorous testing and quality control for all products" }
];

const specifications = [
  {
    category: "Solar Panels",
    specs: [
      "Power Range: 300W - 550W",
      "Efficiency: 19% - 22%+",
      "Warranty: 25 years product & performance",
      "Certifications: IEC, TUV, CE"
    ]
  },
  {
    category: "Inverters",
    specs: [
      "Power Range: 1kW - 100kW+",
      "Efficiency: 97%+ peak efficiency",
      "Warranty: 5-10 years standard",
      "Features: MPPT, monitoring, grid-tie"
    ]
  },
  {
    category: "Batteries",
    specs: [
      "Capacity: 100Ah - 1000Ah+",
      "Chemistry: LiFePO4, Lithium-ion",
      "Warranty: 10+ years / 6000+ cycles",
      "Features: BMS, remote monitoring"
    ]
  }
];

export default function SupplyPage() {
  return (
    <div id="equipment" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* ✅ SEO */}
      <Helmet>
        <title>Solar Equipment Supply Zimbabwe | Panels, Inverters & Batteries</title>
        <meta
          name="description"
          content="TES supplies high-quality Tier-1 solar equipment in Zimbabwe. Get solar panels, inverters, batteries, and components from trusted global brands."
        />
        <meta name="keywords" content="Solar equipment Zimbabwe, Buy solar panels, Solar inverters, Solar batteries, Tier 1 solar, Renewable energy supplies" />

        {/* Open Graph */}
        <meta property="og:title" content="Solar Equipment Supply Zimbabwe | Panels, Inverters & Batteries" />
        <meta property="og:description" content="Get premium solar equipment in Zimbabwe. We supply Tier-1 panels, inverters, batteries, and system components." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tesengineering.com/services/supply" />
        <meta property="og:image" content="https://tesengineering.com/images/supply-preview.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solar Equipment Supply Zimbabwe | Panels, Inverters & Batteries" />
        <meta name="twitter:description" content="Source trusted Tier-1 solar panels, inverters, and batteries for residential, commercial, and industrial projects." />
        <meta name="twitter:image" content="https://tesengineering.com/images/supply-preview.png" />
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-solar-yellow/10 to-solar-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-solar-yellow/10 text-solar-yellow">Premium Equipment Supply</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Quality LV, HV, Solar Equipment
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Source premium solar equipment from trusted manufacturers. We supply high-quality panels, inverters, 
              batteries, and components for residential, commercial, and industrial applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Request Quote
              </Button>
              <Button variant="outline" className="px-8 py-3 text-lg">
                Product Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Equipment Range</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <category.icon className="w-12 h-12 text-solar-yellow mb-4" />
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
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

      {/* Trusted Brands */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted Brand Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                  <p className="text-muted-foreground mb-2">{brand.category}</p>
                  <Badge className="bg-solar-blue text-white">{brand.tier}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technical Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-solar-orange">{spec.category}</h3>
                  <ul className="space-y-3">
                    {spec.specs.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Equipment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-solar-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-solar-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-solar-yellow to-solar-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Source Premium Equipment?</h2>
          <p className="text-xl mb-8">
            Get competitive pricing on high-quality solar equipment. Contact us for bulk pricing and custom solutions.
          </p>
          {/* <Button className="bg-white text-solar-orange hover:bg-gray-100 px-8 py-3 text-lg"> */}
          <Button className="bg-orange-600 hover:bg-white text-black px-8 py-3 text-lg">
            Get Equipment Quote
          </Button>
        </div>
      </section>

      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
