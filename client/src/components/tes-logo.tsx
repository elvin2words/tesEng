import { Building2, Zap } from "lucide-react";

export default function TESLogo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const logoSizes = {
    small: { 
      container: "text-lg", 
      icon: "w-5 h-5", 
      text: "text-lg",
      subtitle: "text-xs"
    },
    default: { 
      container: "text-xl md:text-2xl", 
      icon: "w-6 h-6 md:w-8 md:h-8", 
      text: "text-xl md:text-2xl",
      subtitle: "text-sm"
    },
    large: { 
      container: "text-2xl md:text-3xl", 
      icon: "w-8 h-8 md:w-10 md:h-10", 
      text: "text-2xl md:text-3xl",
      subtitle: "text-base"
    }
  };

  const currentSize = logoSizes[size];

  return (
    <div className={`${currentSize.container} font-bold flex items-center animate-fade-in`}>
      <div className="flex items-center mr-2">
        <div className="relative">
          <Building2 className={`${currentSize.icon} tes-teal mr-1`} />
          <Zap className="w-3 h-3 md:w-4 md:h-4 tes-gold absolute -top-1 -right-1" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          {/* <span className="tes-teal">T</span>
          <span className="tes-primary">E</span>
          <span className="tes-gold">S </span> */}
          <span className="tes-gold"> TES Engineering</span>
        </div>
        <div className={`${currentSize.subtitle} text-muted-foreground font-medium leading-tight hidden sm:block`}>
          Innovative Energy Solutions
        </div>
      </div>
    </div>
  );
}