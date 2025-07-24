
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calculator, Zap, Home, Factory, Lightbulb, DollarSign, TrendingUp, Bot, MapPin, Battery, Sun, Download, Mail, Settings } from "lucide-react";
import SmartTESChat from "./smart-tes-chat";

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
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-8 w-8 text-solar-orange mr-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            SmartTES Solar Sizing Tool
          </h1>
          <div className="ml-3 flex space-x-2">
            <Badge className="bg-solar-blue text-white">AI-Powered</Badge>
            {proMode && <Badge className="bg-green-600 text-white">Pro Mode</Badge>}
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced AI-powered solar system sizing with geo-location optimization, 
          energy analytics, and professional-grade specifications.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Advanced Sizing Form */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Advanced System Configuration</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">Pro Mode</span>
                  <Switch checked={proMode} onCheckedChange={setProMode} />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChat(!showChat)}
                  className="flex items-center space-x-2"
                >
                  <Bot className="h-4 w-4" />
                  <span>SmartTES AI</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <div className="flex items-center space-x-2">
                                <Home className="h-4 w-4" />
                                <span>Residential</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="commercial">
                              <div className="flex items-center space-x-2">
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
                          <Input
                            placeholder="e.g., Harare, Zimbabwe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            placeholder="15.5"
                            {...field}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budgetMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range Min (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5000"
                            {...field}
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
                        <FormLabel>Budget Range Max (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="15000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Pro Mode Options */}
                {proMode && (
                  <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300">Pro Mode Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <SelectItem value="Monocrystalline">Monocrystalline (High Efficiency)</SelectItem>
                                <SelectItem value="Polycrystalline">Polycrystalline (Cost Effective)</SelectItem>
                                <SelectItem value="Bifacial Monocrystalline">Bifacial Monocrystalline (Premium)</SelectItem>
                                <SelectItem value="Thin-film">Thin-film (Budget)</SelectItem>
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
                                <SelectItem value="LiFePO4">LiFePO4 (Best Performance)</SelectItem>
                                <SelectItem value="Li-ion">Li-ion (High Density)</SelectItem>
                                <SelectItem value="AGM">AGM (Reliable)</SelectItem>
                                <SelectItem value="Gel">Gel (Long Life)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your specific needs, critical appliances, installation constraints, etc."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isCalculating && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-solar-orange animate-spin" />
                      <span className="text-sm">SmartTES AI is analyzing your requirements...</span>
                    </div>
                    <Progress value={calculationProgress} className="w-full" />
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full bg-solar-orange hover:bg-orange-600 text-white py-3 font-semibold"
                >
                  {isCalculating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5" />
                      <span>Calculate Optimal System</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results or Chat */}
        <div>
          {showChat ? (
            <SmartTESChat 
              isFloating={false} 
              onSolarSizingRequest={handleAISizingRequest}
            />
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

function AdvancedSizingResults({ 
  result, 
  proMode, 
  onDownloadPDF, 
  onEmailReport 
}: { 
  result: AdvancedSizingResult; 
  proMode: boolean;
  onDownloadPDF: () => void;
  onEmailReport: () => void;
}) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg h-full">
      <CardHeader className="bg-gradient-to-r from-solar-orange to-solar-blue text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            SmartTES System Recommendation
          </h2>
          {proMode && <Badge className="bg-green-500">Pro Analysis</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-xl font-bold text-solar-orange">{result.systemSize}</div>
            <div className="text-xs text-muted-foreground">System Size</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xl font-bold text-solar-blue">{result.panelCount}</div>
            <div className="text-xs text-muted-foreground">Panels</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-xl font-bold text-green-600">{result.estimatedCost}</div>
            <div className="text-xs text-muted-foreground">Total Cost</div>
          </div>
        </div>

        {/* Location Analysis */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center mb-2">
            <MapPin className="h-4 w-4 mr-2 text-solar-orange" />
            <span className="font-semibold">Location Analysis: {result.location}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Solar Irradiance: {result.solarIrradiance} kWh/m²/day • 
            Annual CO₂ Savings: {result.co2Savings}
          </div>
        </div>

        {/* System Components */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Sun className="h-4 w-4 mr-2 text-solar-orange" />
              System Components
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {result.components.panels}</li>
              <li>• {result.components.inverter}</li>
              <li>• {result.components.battery}</li>
              <li>• {result.components.installation}</li>
            </ul>
          </div>

          {/* Pro Mode Details */}
          {proMode && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Pro Analysis</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Panel Type: {result.panelType}</div>
                <div>Battery Chemistry: {result.batteryChemistry}</div>
                <div>Price/Performance: {result.pricePerformanceRatio}:1</div>
                <div>ROI Period: {result.paybackPeriod}</div>
              </div>
            </div>
          )}

          {/* Financial Overview */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              Financial Analysis
            </h3>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Monthly Savings:</span>
                <span className="font-semibold">{result.monthlySavings}</span>
              </div>
              <div className="flex justify-between">
                <span>Payback Period:</span>
                <span className="font-semibold">{result.paybackPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span>Battery Capacity:</span>
                <span className="font-semibold">{result.batteryCapacity}</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-solar-orange" />
              SmartTES Recommendations
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {result.recommendations.map((rec, index) => (
                <li key={index}>• {rec}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={onDownloadPDF}
                variant="outline" 
                className="flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                onClick={onEmailReport}
                variant="outline" 
                className="flex items-center justify-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Report
              </Button>
            </div>
            <Button className="w-full bg-solar-orange hover:bg-orange-600 text-white">
              <DollarSign className="h-4 w-4 mr-2" />
              Request TES Engineering Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SizingPlaceholder({ proMode }: { proMode: boolean }) {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg h-full">
      <CardContent className="p-8 text-center">
        <Bot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          SmartTES AI Solar Sizing
        </h3>
        <p className="text-muted-foreground mb-6">
          Advanced AI-powered system sizing with geo-location optimization, 
          energy analytics, and {proMode ? "professional-grade" : "standard"} specifications.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="h-4 w-4 text-solar-orange" />
            <span>Location-based solar irradiance analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Battery className="h-4 w-4 text-green-600" />
            <span>Advanced battery sizing with backup analysis</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span>Price-performance optimization</span>
          </div>
          {proMode && (
            <div className="flex items-center justify-center space-x-2">
              <Settings className="h-4 w-4 text-purple-600" />
              <span>Pro Mode: Advanced customization enabled</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
