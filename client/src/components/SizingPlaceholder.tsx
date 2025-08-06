import { Sparkles, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, Battery, MapPin, Settings, TrendingUp } from "lucide-react";

export function SizingPlaceholder({ proMode }: { proMode: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground">
      <Sparkles className="w-10 h-10 text-solar-orange mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Ready to Size Your Solar System
      </h3>
      <p className="max-w-md text-sm sm:text-base">
        Fill in the form on the left to generate a recommended solar system based on your energy needs, budget, and preferences.
      </p>
      {proMode && (
        <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-blue-500">
          <Lightbulb className="h-4 w-4" />
          Pro Mode enabled — more accurate and detailed outputs!
        </div>
      )}

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
    </div>
  );
}
