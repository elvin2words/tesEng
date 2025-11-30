import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calculator,
  Home,
  Factory,
  Bot,
  MapPin,
  Settings,
} from "lucide-react";
import SmartTESChat from "./smart-tes-chat";
import { AdvancedSizingResults } from "./AdvancedSizingResults";
import { SizingPlaceholder } from "./SizingPlaceholder";

const sizingFormSchema = z.object({
  propertyType: z.string().min(1, "Please select property type"),
  location: z.string().min(2, "Please enter your location"),
  dailyEnergyUsage: z.coerce.number().positive("Must be > 0"),
  backupDuration: z.coerce.number().positive("Must be > 0"),
  budgetMin: z.coerce.number().optional(),
  budgetMax: z.coerce.number().optional(),
  description: z.string().min(10, "Please provide more details about your energy needs"),
  panelType: z.string().optional(),
  batteryChemistry: z.string().optional(),
});

type SizingFormData = z.infer<typeof sizingFormSchema>;

interface AdvancedSizingResult {
  location: string;
  solarIrradiance: number;
  dailyEnergyUsage: number;
  backupDuration: number;
  systemSize: string;
  panelCount: number;
  panelWattage: number;
  panelType: string;
  batteryCapacity: string;
  batteryType: string;
  batteryChemistry: string;
  inverterRating: string;
  estimatedCost: string;
  monthlySavings: string;
  paybackPeriod: string;
  pricePerformanceRatio: number;
  co2Savings: string;
  installation: string;
  maintenance: string;
  components: {
    panels: string;
    inverter: string;
    battery: string;
    installation: string;
  };
  recommendations: string[];
}

export default function SolarSizingTool() {
  const [showChat, setShowChat] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [sizingResult, setSizingResult] = useState<AdvancedSizingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);

  const form = useForm<SizingFormData>({
    resolver: zodResolver(sizingFormSchema),
    defaultValues: {
      propertyType: "",
      location: "",
      dailyEnergyUsage: 0,
      backupDuration: 0,
      budgetMin: undefined,
      budgetMax: undefined,
      description: "",
      panelType: "",
      batteryChemistry: "",
    },
  });

  // calculation functions unchanged (shortened here for brevity)
  const generateAdvancedSizingResult = (data: SizingFormData): AdvancedSizingResult => {
    // ... your existing calculation logic unchanged ...
    // Just ensure inverterRating, batteryCapacity, systemSize are returned as strings
    return {
      location: data.location,
      solarIrradiance: 5.5,
      dailyEnergyUsage: data.dailyEnergyUsage,
      backupDuration: data.backupDuration,
      systemSize: "5kW",
      panelCount: 10,
      panelWattage: 450,
      panelType: "Monocrystalline",
      batteryCapacity: "10kWh",
      batteryType: "LiFePO4",
      batteryChemistry: "LiFePO4",
      inverterRating: "5kW",
      estimatedCost: "$12,000",
      monthlySavings: "$150",
      paybackPeriod: "7 years",
      pricePerformanceRatio: 3.2,
      co2Savings: "2000 kg CO₂/year",
      installation: "Professional",
      maintenance: "Annual",
      components: {
        panels: "10x 450W",
        inverter: "5kW Hybrid",
        battery: "10kWh LiFePO4",
        installation: "Turnkey",
      },
      recommendations: ["Sample recommendation"],
    };
  };

  const onSubmit = async (data: SizingFormData) => {
    setIsCalculating(true);
    setCalculationProgress(0);

    const progressSteps = [
      { step: 20, message: "Analyzing location..." },
      { step: 40, message: "Calculating panels..." },
      { step: 60, message: "Sizing battery and inverter..." },
      { step: 80, message: "Optimizing system..." },
      { step: 100, message: "Finalizing..." },
    ];

    for (const { step } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCalculationProgress(step);
    }

    const result = generateAdvancedSizingResult(data);
    setSizingResult(result);
    setIsCalculating(false);
  };

  const handleAISizingRequest = (description: string) => {
    const locationMatch = description.match(/(?:location|area|city|country).*?([A-Za-z\s]+)/i);
    const energyMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:kwh|kw)/i);
    const backupMatch = description.match(/(\d+)\s*(?:days?|hours?)/i);

    if (locationMatch?.[1]) form.setValue("location", locationMatch[1].trim());
    if (energyMatch?.[1]) form.setValue("dailyEnergyUsage", parseFloat(energyMatch[1]));
    if (backupMatch?.[1]) form.setValue("backupDuration", parseFloat(backupMatch[1]));

    form.setValue("description", description);

    const desc = description.toLowerCase();
    if (desc.includes("house") || desc.includes("home") || desc.includes("bedroom")) {
      form.setValue("propertyType", "residential");
    } else if (desc.includes("office") || desc.includes("business")) {
      form.setValue("propertyType", "commercial");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 px-2">
        <div className="flex flex-col items-center sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
          <Calculator className="h-8 w-8 text-solar-orange" />
          <h1 className="text-2xl sm:text-4xl font-bold">SmartTES Solar Sizing Tool</h1>
          <div className="flex gap-2">
            <Badge className="bg-solar-blue text-white">AI-Powered</Badge>
            {proMode && <Badge className="bg-green-600 text-white">Pro Mode</Badge>}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Advanced System Configuration</h2>
            <div className="flex gap-2 items-center">
              <Settings className="h-4 w-4" />
              <span>Pro Mode</span>
              <Switch checked={proMode} onCheckedChange={setProMode} />
              <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)}>
                <Bot className="h-4 w-4" /> SmartTES AI
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Property Type & Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Harare, Zimbabwe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Energy + Backup */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyEnergyUsage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Energy Usage (kWh)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="backupDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backup Duration (Days)</FormLabel>
                        <Select onValueChange={(val) => field.onChange(Number(val))} value={String(field.value || "")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">2 days</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budgetMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Min (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budgetMax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Max (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Progress */}
                {isCalculating && (
                  <div className="space-y-2">
                    <Progress value={calculationProgress} />
                  </div>
                )}

                <Button type="submit" disabled={isCalculating} className="w-full bg-solar-orange text-white">
                  {isCalculating ? "Processing..." : "Calculate Optimal System"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Chat or Results */}
        <div>
          {showChat ? (
            <SmartTESChat isFloating={false} onSolarSizingRequest={handleAISizingRequest} />
          ) : sizingResult ? (
            <AdvancedSizingResults result={sizingResult} proMode={proMode} />
          ) : (
            <SizingPlaceholder proMode={proMode} />
          )}
        </div>
      </div>
    </div>
  );
}


import { Helmet } from "react-helmet-async";
// ...rest of imports

export default function SecuritySystemsPage() {
  return (
    <div id="security" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* ✅ SEO */}
      <Helmet>
        <title>Security Systems in Zimbabwe | CCTV, Access Control & Smart Security</title>
        <meta
          name="description"
          content="Mazenel provides advanced security solutions in Zimbabwe, including CCTV systems, access control, smart IoT security, and 24/7 monitoring for homes, businesses, and industries."
        />
        <meta name="keywords" content="Security systems Zimbabwe, CCTV Harare, Access control, Smart security, Surveillance cameras, Alarm systems, Industrial security" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Security Systems in Zimbabwe | CCTV & Smart Solutions" />
        <meta property="og:description" content="Protect your home, business, or industrial site with Mazenel’s CCTV, access control, and smart security systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tesengineering.com/services/security" />
        <meta property="og:image" content="https://tesengineering.com/images/security-preview.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Security Systems in Zimbabwe | CCTV & Smart Solutions" />
        <meta name="twitter:description" content="Mazenel installs CCTV, access control, smart IoT security, and 24/7 monitoring services." />
        <meta name="twitter:image" content="https://tesengineering.com/images/security-preview.png" />
      </Helmet>

      <Navigation />
      {/* existing sections */}
      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}


import { Helmet } from "react-helmet-async";
// ...rest of imports

export default function SupplyPage() {
  return (
    <div id="equipment" className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      {/* ✅ SEO */}
      <Helmet>
        <title>Solar Equipment Supply Zimbabwe | Panels, Inverters & Batteries</title>
        <meta
          name="description"
          content="Mazenel supplies high-quality Tier-1 solar equipment in Zimbabwe. Get solar panels, inverters, batteries, and components from trusted global brands."
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
      {/* existing sections */}
      <Footer />
      <SmartTESChat showFloating={true} />
      <ScrollToTop />
    </div>
  );
}
