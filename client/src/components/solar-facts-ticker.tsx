
import { useState, useEffect } from 'react';
import { Sun, Zap, Leaf, Globe } from 'lucide-react'; 

const solarFacts = [
  {
    icon: Sun,
    fact: "The sun provides enough energy in one hour to power the world for a year",
    stat: "173,000 TW"
  },
  {
    icon: Zap,
    fact: "Solar energy is now the cheapest source of electricity in history",
    stat: "$0.048/kWh"
  },
  {
    icon: Leaf,
    fact: "1 MW of solar power prevents 1,500 tons of CO2 emissions annually",
    stat: "1,500 tons/year"
  },
  {
    icon: Globe,
    fact: "Solar capacity has grown 22% annually over the past decade",
    stat: "22% CAGR"
  },
  {
    icon: Sun,
    fact: "Africa receives 40% of global solar irradiation with huge potential",
    stat: "40% of global"
  },
  {
    icon: Zap,
    fact: "Solar panels can last 25-30 years with minimal maintenance",
    stat: "25-30 years"
  }
];

export default function SolarFactsTicker() {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % solarFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const fact = solarFacts[currentFact];

  return (
    <div className="bg-solar-blue text-white py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 animate-slide-in-right">
          <fact.icon className="h-5 w-5 text-solar-yellow flex-shrink-0" />
          <div className="flex items-center space-x-2 text-center">
            <span className="font-medium text-sm sm:text-base">{fact.fact}</span>
            <span className="text-solar-orange font-bold text-xs sm:text-base">({fact.stat})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
