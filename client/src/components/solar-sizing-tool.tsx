
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
import { Calculator, Zap, Home, Factory, Lightbulb, DollarSign, TrendingUp, Bot, MapPin, Battery, Sun, Download, Mail, Settings } from "lucide-react";
import SmartTESChat from "./smart-tes-chat";
import { AdvancedSizingResults } from "./AdvancedSizingResults";
import { SizingPlaceholder } from "./SizingPlaceholder";

const sizingFormSchema = z.object({ 
  propertyType: z.string().min(1, "Please select property type"),
  location: z.string().min(2, "Please enter your location"),
  dailyEnergyUsage: z.string().min(1, "Please enter daily energy usage"),
  backupDuration: z.string().min(1, "Please select backup duration"),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
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
      dailyEnergyUsage: "",
      backupDuration: "",
      budgetMin: "",
      budgetMax: "",
      description: "",
      panelType: "",
      batteryChemistry: "",
    }
  });

  // calculation functions (unchanged)
  const generateAdvancedSizingResult = (data: SizingFormData): AdvancedSizingResult => { 
    const location = data.location;
    const dailyEnergyUsage = parseFloat(data.dailyEnergyUsage);
    const backupDuration = parseFloat(data.backupDuration);
    const budgetMin = data.budgetMin ? parseFloat(data.budgetMin) : 0;
    const budgetMax = data.budgetMax ? parseFloat(data.budgetMax) : 0;

    // Location-based solar irradiance database
    const locationFactors: { [key: string]: number } = {
      "harare": 5.5, "zimbabwe": 5.5, "cape town": 5.2, "south africa": 5.2,
      "gaborone": 6.0, "botswana": 6.0, "windhoek": 6.2, "namibia": 6.2,
      "lusaka": 5.0, "zambia": 5.0, "lilongwe": 5.3, "malawi": 5.3,
      "maputo": 5.4, "mozambique": 5.4, "nairobi": 5.8, "kenya": 5.8,
      "default": 5.0
    };

    const solarIrradiance = locationFactors[location.toLowerCase()] || 
                           Object.entries(locationFactors).find(([key]) => 
                             location.toLowerCase().includes(key))?.[1] || 
                           locationFactors.default;

    // Advanced panel selection based on budget and pro mode
    let panelWattage = 450;
    let panelType = "Monocrystalline";
    let batteryChemistry = "LiFePO4";

    if (proMode) {
      panelType = data.panelType || panelType;
      batteryChemistry = data.batteryChemistry || batteryChemistry;
      
      // Adjust based on selections
      if (panelType === "Bifacial Monocrystalline") panelWattage = 550;
      else if (panelType === "Polycrystalline") panelWattage = 330;
      else if (panelType === "Thin-film") panelWattage = 200;
    } else if (budgetMax > 0) {
      if (budgetMax < 8000) {
        panelWattage = 330;
        panelType = "Polycrystalline";
        batteryChemistry = "AGM";
      } else if (budgetMax > 15000) {
        panelWattage = 550;
        panelType = "Bifacial Monocrystalline";
        batteryChemistry = "Li-ion";
      }
    }

    // System sizing calculations
    const systemEfficiency = 0.85;
    const requiredPanelCapacity = (dailyEnergyUsage / solarIrradiance) / systemEfficiency;
    const panelCount = Math.ceil(requiredPanelCapacity * 1000 / panelWattage);
    const systemSize = (panelCount * panelWattage / 1000).toFixed(1);

    // Battery sizing with chemistry-specific factors
    const batteryEfficiency = batteryChemistry === "LiFePO4" ? 0.95 : 
                             batteryChemistry === "Li-ion" ? 0.93 : 0.8;
    const batteryCapacity = Math.ceil((dailyEnergyUsage * backupDuration * 1.3) / batteryEfficiency);
    
    // Inverter sizing
    const peakLoad = dailyEnergyUsage * 0.35; // More accurate peak load estimation
    const inverterRating = Math.ceil(peakLoad * 1.25);

    // Advanced cost calculation
    const panelCostPerWatt = panelType === "Bifacial Monocrystalline" ? 0.85 : 
                            panelType === "Monocrystalline" ? 0.65 : 
                            panelType === "Polycrystalline" ? 0.55 : 0.4;
    
    const batteryCostPerKWh = batteryChemistry === "Li-ion" ? 400 : 
                             batteryChemistry === "LiFePO4" ? 300 : 200;

    const panelCost = panelCount * panelWattage * panelCostPerWatt;
    const batteryCost = batteryCapacity * batteryCostPerKWh;
    const inverterCost = inverterRating * 150;
    const installationCost = (panelCost + batteryCost + inverterCost) * 0.25;
    const totalCost = panelCost + batteryCost + inverterCost + installationCost;

    // Performance metrics
    const monthlySavings = Math.round(dailyEnergyUsage * 30 * 0.15); // $0.15 per kWh saved
    const paybackPeriod = Math.round(totalCost / (monthlySavings * 12));
    const pricePerformanceRatio = Math.round((dailyEnergyUsage * 365 * 25) / totalCost * 100) / 100;
    const co2Savings = Math.round(dailyEnergyUsage * 365 * 0.5);

    // Smart recommendations based on analysis
    const recommendations = [
      solarIrradiance > 5.5 ? "Excellent solar resource - optimal for high-efficiency panels" : "Good solar resource - consider efficiency optimization",
      backupDuration > 3 ? "Extended backup - consider load management system" : "Standard backup configuration suitable",
      panelCount > 20 ? "Large system - three-phase configuration recommended" : "Single-phase system suitable",
      batteryChemistry === "LiFePO4" ? "Excellent battery choice for longevity and safety" : "Consider LiFePO4 upgrade for better performance",
      pricePerformanceRatio > 3 ? "Excellent investment with strong ROI" : "Good investment - consider financing options"
    ];

    return {
      location,
      solarIrradiance,
      dailyEnergyUsage,
      backupDuration,
      systemSize: `${systemSize}kW`,
      panelCount,
      panelWattage,
      panelType,
      batteryCapacity: `${batteryCapacity}kWh`,
      batteryType: `${batteryChemistry} ${batteryCapacity}kWh Battery Bank`,
      batteryChemistry,
      inverterRating: `${inverterRating}kW`,
      estimatedCost: `$${totalCost.toLocaleString()}`,
      monthlySavings: `$${monthlySavings}`,
      paybackPeriod: `${paybackPeriod} years`,
      pricePerformanceRatio,
      co2Savings: `${co2Savings} kg CO₂/year`,
      installation: "Professional installation & commissioning",
      maintenance: "Annual maintenance contract recommended",
      components: {
        panels: `${panelCount} x ${panelWattage}W ${panelType} Solar Panels`,
        inverter: `${inverterRating}kW Hybrid Inverter with MPPT`,
        battery: `${batteryCapacity}kWh ${batteryChemistry} Battery Bank`,
        installation: "Professional installation, commissioning & monitoring"
      },
      recommendations
    };
  };

  const onSubmit = async (data: SizingFormData) => {
    setIsCalculating(true);
    setCalculationProgress(0);
    
    // Simulate AI processing with progress updates
    const progressSteps = [
      { step: 20, message: "Analyzing location and solar irradiance..." },
      { step: 40, message: "Calculating optimal panel configuration..." },
      { step: 60, message: "Sizing battery and inverter systems..." },
      { step: 80, message: "Optimizing price-performance ratio..." },
      { step: 100, message: "Generating recommendations..." }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCalculationProgress(step);
    }

    const result = generateAdvancedSizingResult(data);
    setSizingResult(result);
    setIsCalculating(false);
  };

  const handleAISizingRequest = (description: string) => {
    // Parse AI request and pre-fill form
    const locationMatch = description.match(/(?:location|area|city|country).*?([A-Za-z\s]+)/i);
    const energyMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:kwh|kw)/i);
    const backupMatch = description.match(/(\d+)\s*(?:days?|hours?)/i);

    if (locationMatch) form.setValue("location", locationMatch[1].trim());
    if (energyMatch) form.setValue("dailyEnergyUsage", energyMatch[1]);
    if (backupMatch) form.setValue("backupDuration", backupMatch[1]);
    
    form.setValue("description", description);
    
    const desc = description.toLowerCase();
    if (desc.includes("house") || desc.includes("home") || desc.includes("bedroom")) {
      form.setValue("propertyType", "residential");
    } else if (desc.includes("office") || desc.includes("business")) {
      form.setValue("propertyType", "commercial");
    }
  };

  const handleDownloadPDF = () => {
    alert("PDF report downloaded! This would generate a comprehensive system specification document.");
  };

  const handleEmailReport = () => {
    alert("Report emailed! This would send the sizing report to your email address.");
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 px-2">
        <div className="flex flex-col items-center sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
          <Calculator className="h-8 w-8 text-solar-orange" />
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground text-center">
            SmartTES Solar Sizing Tool
          </h1>
          <div className="flex gap-2">
            <Badge className="bg-solar-blue text-white">AI-Powered</Badge>
            {proMode && <Badge className="bg-green-600 text-white">Pro Mode</Badge>}
          </div>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced AI-powered solar system sizing with geo-location optimization, energy analytics, and professional-grade specs.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Advanced System Configuration</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Pro Mode</span>
                <Switch checked={proMode} onCheckedChange={setProMode} />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowChat(!showChat)} className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>SmartTES AI</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Grid 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Property Type */}
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="residential">
                              <div className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                <span>Residential</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="commercial">
                              <div className="flex items-center gap-2">
                                <Factory className="h-4 w-4" />
                                <span>Commercial</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Harare, Zimbabwe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Grid 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dailyEnergyUsage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Energy Usage (kWh)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="15.5" {...field} />
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select backup duration" />
                            </SelectTrigger>
                          </FormControl>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budgetMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Min (USD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5000" {...field} />
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
                          <Input type="number" placeholder="15000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pro Mode Extra */}
                {proMode && (
                  <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 text-sm">Pro Mode Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="panelType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Panel Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select panel type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Monocrystalline">Monocrystalline</SelectItem>
                                <SelectItem value="Polycrystalline">Polycrystalline</SelectItem>
                                <SelectItem value="Bifacial Monocrystalline">Bifacial</SelectItem>
                                <SelectItem value="Thin-film">Thin-film</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="batteryChemistry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Battery Chemistry</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select battery type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="LiFePO4">LiFePO4</SelectItem>
                                <SelectItem value="Li-ion">Li-ion</SelectItem>
                                <SelectItem value="AGM">AGM</SelectItem>
                                <SelectItem value="Gel">Gel</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your specific needs..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Progress Bar */}
                {isCalculating && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Bot className="h-4 w-4 text-solar-orange animate-spin" />
                      SmartTES AI is analyzing your requirements...
                    </div>
                    <Progress value={calculationProgress} className="w-full" />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full bg-solar-orange hover:bg-orange-600 text-white py-3 text-base font-semibold"
                >
                  {isCalculating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      <span>Calculate Optimal System</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Chat or Results */}
        <div className="w-full">
          {showChat ? (
            <SmartTESChat isFloating={false} onSolarSizingRequest={handleAISizingRequest} />
          ) : sizingResult ? (
            <AdvancedSizingResults
              result={sizingResult}
              proMode={proMode}
              onDownloadPDF={handleDownloadPDF}
              onEmailReport={handleEmailReport}
            />
          ) : (
            <SizingPlaceholder proMode={proMode} />
          )}
        </div>
      </div>
    </div>
  );
}
