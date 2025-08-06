import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sun, Battery, Download, Mail, TrendingUp } from "lucide-react";

interface AdvancedSizingResult {
  recommendedSystemSize: string;
  estimatedSolarOutput: string;
  batteryCapacity: string;
  estimatedCost: string;
  panelType?: string;
  batteryChemistry?: string;
}

interface Props {
  result: AdvancedSizingResult;
  proMode: boolean;
  onDownloadPDF: () => void;
  onEmailReport: () => void;
}

export function AdvancedSizingResults({
  result,
  proMode,
  onDownloadPDF,
  onEmailReport,
}: Props) {
  return (
    <Card className="bg-white dark:bg-gray-900 shadow-lg">
      <CardHeader className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
          Recommended System Specification
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your inputs and AI optimization
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base text-foreground">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span><strong>System Size:</strong> {result.recommendedSystemSize}</span>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span><strong>Solar Output:</strong> {result.estimatedSolarOutput}</span>
          </div>
          <div className="flex items-center gap-3">
            <Battery className="w-5 h-5 text-green-600" />
            <span><strong>Battery Capacity:</strong> {result.batteryCapacity}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-solar-orange">
              ${result.estimatedCost}
            </span>
            <span className="text-muted-foreground">Estimated Cost</span>
          </div>
        </div>

        {proMode && (
          <div className="border-t border-border pt-4 space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase">Pro Mode Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {result.panelType && (
                <div>
                  <Badge variant="outline" className="text-xs">Panel Type</Badge>
                  <p className="mt-1">{result.panelType}</p>
                </div>
              )}
              {result.batteryChemistry && (
                <div>
                  <Badge variant="outline" className="text-xs">Battery Chemistry</Badge>
                  <p className="mt-1">{result.batteryChemistry}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
          <Button onClick={onDownloadPDF} className="w-full sm:w-auto flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button onClick={onEmailReport} variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Report
          </Button>
        </div>
      </CardContent>

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
