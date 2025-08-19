import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle, X, Send, User, Zap, Calculator, FileText,
  Settings, Download, Mail, Sun, MapPin, Battery, DollarSign, Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


interface Message {
  id: string;
  text: string;
  sender: "user" | "smarttes";
  timestamp: Date;
  suggestions?: string[];
  systemSpecs?: SystemSpecs;
}

interface SystemSpecs {
  location: string;
  dailyEnergyUsage: number;
  backupDuration: number;
  budget?: { min: number; max: number };
  panelWattage: number;
  panelCount: number;
  batteryType: string;
  batteryCapacity: number;
  inverterRating: number;
  totalCost: number;
  panelType?: string;
  batteryChemistry?: string;
  pricePerformanceRatio?: number;
  installation: string;
  maintenance: string;
  roi: string;
  co2Savings: string;
}

interface SmartTESChatProps {
  isFloating?: boolean;
  onSolarSizingRequest?: (description: string) => void;
  onQuoteRequest?: (details: any) => void;
  context?: string;
  showFloating?: boolean;
}


{/* SmartTES AI Assistant Highlight - To use in AI Modal*/}
<div className="mb-8 animate-fade-in-up">
  <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-4">
    <Bot className="h-5 w-5 text-solar-yellow mr-2 animate-pulse" />
    <span className="text-white font-medium mr-3">Smart Energy. Smart Tools.</span>
    <Badge className="bg-solar-orange text-white">AI-Powered</Badge>
  </div>
  <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
    Meet SmartTES - Your intelligent solar assistant. Get instant system sizing, location optimization, 
    and personalized recommendations powered by advanced AI analytics.
  </p>
</div>

// ------------------ SAMPLE DATA -------------------
const SAMPLE_RESPONSES = {
  greeting: "Hello! I'm SmartTES, your AI-powered solar assistant. I can help you size a solar system with advanced analytics including geo-location optimization, daily energy analysis, and budget considerations. How can I assist you today?",
  solarSizing: "I'd be happy to help size a solar system for you! I'll need some information: your location, daily energy usage (kWh), desired backup duration, and optionally your budget range. I can provide professional system specifications with panel recommendations, battery sizing, and inverter ratings.",
  proMode: "Pro Mode unlocked! Now you can customize panel types (monocrystalline, polycrystalline, thin-film), battery chemistries (LiFePO4, Li-ion, AGM, Gel), and compare price-performance ratios. I'll provide detailed technical specifications and multiple system configurations.",
  quote: "Perfect! I can prepare a comprehensive quote with your system specifications and forward it to TES Engineering for professional review. Would you like me to generate a PDF proposal and email it to you?",
  location: "Please provide your location (city/country) so I can factor in solar irradiance, weather patterns, and local regulations for optimal system sizing.",
  default: "I specialize in advanced solar system design using AI-powered analytics. I can help with system sizing, location optimization, energy analysis, budget planning, and technical specifications. What would you like to explore?"
};

const QUICK_ACTIONS = [
  { icon: Calculator, text: "Advanced Sizing", action: "sizing" },
  { icon: MapPin, text: "Site Optimization", action: "location" },
  { icon: Settings, text: "Enable Pro Mode", action: "promode" },
  { icon: FileText, text: "Generate Quote", action: "quote" }
];

// ------------------ MAIN COMPONENT -------------------
export default function SmartTESChat({
  isFloating = true,
  onSolarSizingRequest,
  onQuoteRequest, 
  onClose
}: SmartTESChatProps) {
  const [isOpen, setIsOpen] = useState(!isFloating);
  const modalRef = useRef(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: SAMPLE_RESPONSES.greeting,
      sender: "smarttes",
      timestamp: new Date(),
      suggestions: ["Size my solar system", "Enable Pro Mode", "Location analysis", "Generate quote"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [currentSpecs, setCurrentSpecs] = useState<SystemSpecs | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  // const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // safer timeout refs
  const popupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  const [vh, setVh] = useState(window.innerHeight);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const FloatingChatButton = () => (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      onMouseEnter={() => setIsVisible(true)}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-solar-blue hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 group"
          >
            <Bot className="w-6 h-6 group-hover:animate-pulse" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-solar-blue" />
              <span>SmartTES AI Assistant</span>
              <Badge className="bg-solar-blue text-white text-xs">AI</Badge>
            </DialogTitle>
          </DialogHeader>
          <ChatInterface />
        </DialogContent>
      </Dialog>
    </div>
  );

  useEffect(() => { scrollToBottom(); }, [messages]);

    // // Mobile detection
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);

  // Smart popup logic -periodically show and close
  // useEffect(() => {
  //   if (!isFloating || isOpen) return;
  //   const showSmartPopup = () => {
  //     setShowPopup(true);
  //     hideTimeoutRef.current = setTimeout(() => {
  //       if (!isHovered) {
  //         setShowPopup(false);
  //       }
  //     }, isMobile ? 3000 : 5000); // Hide after 3s on mobile, 5s on desktop
  //   };
  //   // Show popup periodically
  //   const interval = setInterval(() => {
  //     if (!isOpen && !showPopup) {
  //       showSmartPopup();
  //     }
  //   }, isMobile ? 15000 : 20000); // Every 15s on mobile, 20s on desktop
  //   // Initial popup after 5 seconds
  //   popupTimeoutRef.current = setTimeout(showSmartPopup, 5000);
  //   return () => {
  //     clearInterval(interval);
  //     if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
  //     if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  //   };
  // }, [isFloating, isOpen, isHovered, isMobile, showPopup]);

  const extractSizingData = (message: string) => {
    const locationMatch = message.match(/(?:location|area|city|country).*?([A-Za-z\s]+)/i);
    const energyMatch = message.match(/(\d+(?:\.\d+)?)\s*(?:kwh|kw)/i);
    const backupMatch = message.match(/(\d+)\s*(?:days?|hours?)/i);
    const budgetMatch = message.match(/(?:budget|cost).*?(\d+).*?(\d+)/i);
    return {
      location: locationMatch ? locationMatch[1].trim() : "Zimbabwe",
      dailyEnergyUsage: energyMatch ? parseFloat(energyMatch[1]) : 15,
      backupDuration: backupMatch ? parseInt(backupMatch[1]) : 2,
      budget: budgetMatch ? { min: parseInt(budgetMatch[1]), max: parseInt(budgetMatch[2]) } : undefined
    };
  };

  // ------------------ SYSTEM SIZING LOGIC -------------------
  const calculateSystemSpecs = (data: any): SystemSpecs => {
    const { location, dailyEnergyUsage, backupDuration, budget } = data;
    // Location-based solar irradiance factor (simplified)
    const locationFactors: { [key: string]: number } = {
      "zimbabwe": 5.5, "south africa": 5.2, "botswana": 6.0, "namibia": 6.2,
      "zambia": 5.0, "malawi": 5.3, "mozambique": 5.4, "default": 5.0
    };
    const solarIrradiance = locationFactors[location.toLowerCase()] || locationFactors.default;
    // Calculate panel requirements
    const systemEfficiency = 0.85;
    const requiredPanelCapacity = (dailyEnergyUsage / solarIrradiance) / systemEfficiency;
    let panelWattage = 450; // Default high-efficiency panels
    let panelType = "Monocrystalline";
    let batteryChemistry = "LiFePO4";
    if (proMode) {
      if (budget && budget.max < 8000) {
        panelWattage = 330;
        panelType = "Polycrystalline";
        batteryChemistry = "AGM";
      } else if (budget && budget.max > 15000) {
        panelWattage = 550;
        panelType = "Bifacial Monocrystalline";
        batteryChemistry = "Li-ion";
      }
    }
    const panelCount = Math.ceil(requiredPanelCapacity * 1000 / panelWattage);
    // Battery sizing
    const batteryCapacity = dailyEnergyUsage * backupDuration * 1.3; // 30% safety margin
    const batteryType = `${batteryChemistry} ${Math.ceil(batteryCapacity)}kWh Battery Bank`;
    // Inverter sizing
    const peakLoad = dailyEnergyUsage * 0.3; // Assume 30% of daily usage as peak load
    const inverterRating = Math.ceil(peakLoad * 1.25); // 25% safety margin
    // Cost calculation
    const panelCost = panelCount * panelWattage * (panelType.includes("Bifacial") ? 0.8 : 0.6);
    const batteryCost = batteryCapacity * (batteryChemistry === "LiFePO4" ? 300 : batteryChemistry === "Li-ion" ? 400 : 200);
    const inverterCost = inverterRating * 150;
    const installationCost = (panelCost + batteryCost + inverterCost) * 0.3;
    const totalCost = panelCost + batteryCost + inverterCost + installationCost;
    return {
      location,
      dailyEnergyUsage,
      backupDuration,
      budget,
      panelWattage,
      panelCount,
      batteryType,
      batteryCapacity: Math.ceil(batteryCapacity),
      inverterRating,
      totalCost: Math.round(totalCost),
      panelType,
      batteryChemistry,
      pricePerformanceRatio: proMode ? Math.round((dailyEnergyUsage * 365 * 25) / totalCost * 100) / 100 : undefined,
      installation: "Professional installation & commissioning",
      maintenance: "Annual maintenance contract recommended",
      roi: `${Math.round(totalCost / (dailyEnergyUsage * 25 * 365))} years`,
      co2Savings: `${Math.round(dailyEnergyUsage * 365 * 0.5)} kg CO₂/year`
    };
  };
  
  // ------------------ RESPONSE GENERATION -------------------
  const generateResponse = (userMessage: string): Message => {
    let response = SAMPLE_RESPONSES.default;
    let suggestions: string[] = [];
    let systemSpecs: SystemSpecs | null = null;

    if (userMessage.toLowerCase().includes("pro mode")
      || userMessage.toLowerCase().includes("advanced")) {
      setProMode(true);
      response = SAMPLE_RESPONSES.proMode;
      suggestions = ["Customize panel types", "Compare battery chemistries", "Price-performance analysis"];
    } else if (userMessage.toLowerCase().includes("size") || userMessage.toLowerCase().includes("system") || userMessage.toLowerCase().includes("kwh") || userMessage.toLowerCase().includes("location")) {
      const sizingData = extractSizingData(userMessage);
      systemSpecs = calculateSystemSpecs(sizingData);
      setCurrentSpecs(systemSpecs);
      response = `Based on your requirements in ${systemSpecs.location}, I've calculated an optimal ${systemSpecs.panelCount}x${systemSpecs.panelWattage}W solar system with ${systemSpecs.batteryCapacity}kWh battery storage and ${systemSpecs.inverterRating}kW inverter. Total estimated cost: $${systemSpecs.totalCost.toLocaleString()}. ${proMode ? `Pro Mode analysis shows price-performance ratio of ${systemSpecs.pricePerformanceRatio}:1 with ${systemSpecs.panelType} panels and ${systemSpecs.batteryChemistry} batteries.` : 'Enable Pro Mode for detailed technical options.'}`;
      suggestions = ["Download PDF report", "Email specifications", "Request TES quote", proMode ? "Compare alternatives" : "Enable Pro Mode"];
      if (onSolarSizingRequest) {
        onSolarSizingRequest(userMessage);
      }
    } else if (userMessage.toLowerCase().includes("location") || userMessage.toLowerCase().includes("where")) {
      response = SAMPLE_RESPONSES.location;
      suggestions = ["Harare, Zimbabwe", "Cape Town, South Africa", "Gaborone, Botswana", "Windhoek, Namibia"];
    } else if (userMessage.toLowerCase().includes("quote") || userMessage.toLowerCase().includes("pdf") || message.includes("email")) {
      response = SAMPLE_RESPONSES.quote;
      suggestions = ["Generate PDF proposal", "Email to my address", "Forward to TES Engineering", "Schedule consultation"];
      if (onQuoteRequest && currentSpecs) {
        onQuoteRequest({ source: "smarttes", specs: currentSpecs, message: userMessage });
      }
    } else if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi") || userMessage.toLowerCase().includes("help")) {
      response = SAMPLE_RESPONSES.greeting;
      suggestions = ["Size my solar system", "Enable Pro Mode", "Location analysis", "Generate quote"];
    }
    return {
      id: Date.now().toString(),
      text: response,
      sender: "smarttes",
      timestamp: new Date(),
      suggestions,
      systemSpecs
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (s: string) => setInputValue(s);

  const handleQuickAction = (a: string) => {
    if (a === "sizing") setInputValue("I need system sizing");
    if (a === "promode") setInputValue("Enable Pro Mode");
    if (a === "quote") setInputValue("Generate a quote");
  };

  const handleDdetailedQuickAction = (action: string) => {
    const actionMessages = {
      sizing: "I need advanced solar system sizing with location optimization and energy analysis",
      location: "Analyze solar potential for my location",
      promode: "Enable Pro Mode for advanced customization options",
      quote: "Generate a comprehensive quote with PDF and email options"
    };
    setInputValue(actionMessages[action as keyof typeof actionMessages] || "");
  };
  
  // ------------------ QUICK ACTIONS -------------------  
  const handleDownloadPDF = () => alert("PDF Generated!");
  const handleEmailSpecs = () => alert("System specifications sent to your email!");

  // -------------- POPUP EVENTS --------------
  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowPopup(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    hideTimeoutRef.current = setTimeout(() => setShowPopup(false), 200);
  };
  const handleOpenChat = () => { setIsOpen(true); setShowPopup(false); };

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // 🚫 Lock background scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // ✅ Restore scroll on close
    };
  },);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const handleOpenSmartTES = (event: CustomEvent) => {
      if (event.detail?.message) {
        setIsOpen(true);
        setInputValue(event.detail.message);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('openSmartTES', handleOpenSmartTES as EventListener);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('openSmartTES', handleOpenSmartTES as EventListener);
    };
  }, []);

  // ------------------ UI -------------------
  if (isFloating) {
    return (
      <>
        {/* Floating button */}
        {!isOpen && (
          <div
            className="fixed bottom-6 right-6 z-40"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              onClick={handleOpenChat}
              className="h-14 w-14 rounded-full bg-solar-orange hover:bg-orange-600 shadow-lg relative overflow-hidden"
              size="lg"
            >
              <MessageCircle className="h-6 w-6 text-white" />
              {showPopup && !isHovered && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-solar-yellow rounded-full border-2 border-white animate-ping"></div>
              )}
            </Button>
          </div>
        )}

        {/* Chat overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-0"
            onClick={() => setIsOpen(false)} // click outside to close
          >
            <Card
              className={cn(
                "relative flex flex-col bg-gray-300 dark:bg-gray-800 shadow-2xl transition-transform duration-300",
                "items-center rounded-t-2xl translate-y-0", // 📱 Mobile
                "sm:rounded-xl sm:w-[32rem] sm:h-[550px]" // 🖥 Desktop
              )}
              // style={{ height: vh * 0.8, maxHeight: vh - 32 }} // 70% of available viewport

              onClick={(e) => e.stopPropagation()} // prevent click from bubbling up
            >
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-solar-orange to-solar-blue text-white p-4 rounded-t-2xl sm:rounded-t-xl">
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <h3 className="text-lg font-bold">SmartTES Assistant</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white">
                    <X className="h-4 w-4" />
                  </Button>
                </div> */}
                
                <div className="flex items-center justify-between">
                  <div className="w-1/4 flex justify-start">
                    {proMode && (
                      <Badge className="bg-green-500 text-white text-xs">Pro Mode</Badge>
                    )}
                  </div>
                
                  <div className="w-2/4 flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <h3 className="text-lg font-bold">SmartTES Assistant</h3>
                    </div>
                  </div>

                  <div className="w-1/4 flex justify-end">
                    <Button variant="ghost" size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20" >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat content */}
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ChatInterface
                  {...{ messages, isTyping, inputValue, setInputValue,
                    handleSendMessage, handleSuggestionClick, handleQuickAction,
                    messagesEndRef, proMode, currentSpecs,
                    onDownloadPDF: handleDownloadPDF, onEmailSpecs: handleEmailSpecs }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </>
    );
  }

  // Embedded version
  return (
    <Card className="w-full h-[600px] bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-solar-orange to-solar-blue text-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Zap className="h-5 w-5" /> <span>SmartTES Assistant</span>
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setProMode(!proMode)} className="text-white">
            <Settings className="h-4 w-4 mr-1" /> {proMode ? "Standard" : "Pro Mode"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <ChatInterface
          {...{ messages, isTyping, inputValue, setInputValue,
            handleSendMessage, handleSuggestionClick, handleQuickAction,
            messagesEndRef, proMode, currentSpecs,
            onDownloadPDF: handleDownloadPDF, onEmailSpecs: handleEmailSpecs }}
        />
      </CardContent>
    </Card>
  );
}

// ------------------ SUB COMPONENTS -------------------
interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (v: string) => void;
  handleSendMessage: () => void;
  handleSuggestionClick: (s: string) => void;
  handleQuickAction: (a: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  proMode: boolean;
  currentSpecs: SystemSpecs | null;
  onDownloadPDF: () => void;
  onEmailSpecs: () => void;
}

function ChatInterface({
  messages, isTyping, inputValue, setInputValue, handleSendMessage,
  handleSuggestionClick, handleQuickAction, messagesEndRef,
  proMode, currentSpecs, onDownloadPDF, onEmailSpecs
}: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="px-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.action}
              variant={action.action === "promode" && proMode ? "default" : "outline"}
              size="sm"
              className="text-xs h-8 justify-start"
              onClick={() => handleQuickAction(action.action)}
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.text}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <MessageBubble
            key={m.id} message={m} proMode={proMode}
            onDownloadPDF={onDownloadPDF} onEmailSpecs={onEmailSpecs}
            onSuggestionClick={handleSuggestionClick}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-solar-orange" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={proMode ? "Ask SmartTES Pro anything..." : "Ask SmartTES about solar sizing..."}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-solar-orange hover:bg-orange-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message, proMode, onDownloadPDF, onEmailSpecs, onSuggestionClick
}: {
  message: Message; proMode: boolean;
  onDownloadPDF: () => void; onEmailSpecs: () => void;
  onSuggestionClick: (s: string) => void;
}) {
  return (
    <div className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[80%] rounded-lg p-3",
        message.sender === "user"
          ? "bg-solar-orange text-white"
          : "bg-gray-100 dark:bg-gray-700 text-foreground"
      )}>
        <div className="flex items-start space-x-2">
          {message.sender === "user"
            ? <User className="h-4 w-4 mt-0.5 text-white" />
            : <Zap className="h-4 w-4 mt-0.5 text-solar-orange" />}
          <div className="flex-1">
            <p className="text-sm">{message.text}</p>

            {message.systemSpecs && (
              <SpecsCard specs={message.systemSpecs} proMode={proMode}
                onDownloadPDF={onDownloadPDF} onEmailSpecs={onEmailSpecs} />
            )}

            {message.suggestions && (
              <div className="mt-2 space-y-1">
                {message.suggestions.map((s, i) => (
                  <Button key={i} variant="outline" size="sm"
                    className="text-xs h-6 mr-1 mb-1"
                    onClick={() => onSuggestionClick(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecsCard({
  specs, proMode, onDownloadPDF, onEmailSpecs
}: { specs: SystemSpecs; proMode: boolean; onDownloadPDF: () => void; onEmailSpecs: () => void }) {
  return (
    <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
      <h4 className="font-semibold text-solar-orange mb-2 flex items-center">
        <Sun className="h-4 w-4 mr-1" /> System Specifications
      </h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><b>Location:</b> {specs.location}</div>
        <div><b>Daily Usage:</b> {specs.dailyEnergyUsage}kWh</div>
        <div><b>Panels:</b> {specs.panelCount}x{specs.panelWattage}W</div>
        <div><b>Battery Cap.:</b> {specs.batteryCapacity}kWh</div>
        <div><b>Inverter:</b> {specs.inverterRating}kW</div>
        <div><b>Total Cost:</b> ${specs.totalCost.toLocaleString()}</div>
        {proMode && (
          <>
            <div><b>Panel Type:</b> {specs.panelType}</div>
            <div><b>Battery Chem.:</b> {specs.batteryChemistry}</div>
            <div><b>P/P Ratio:</b> {specs.pricePerformanceRatio}:1</div>
            <div><b>ROI:</b> {specs.roi || "N/A"}</div>
          </>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" onClick={onDownloadPDF}>
          <Download className="h-3 w-3 mr-1" /> PDF
        </Button>
        <Button size="sm" variant="outline" onClick={onEmailSpecs}>
          <Mail className="h-3 w-3 mr-1" /> Email
        </Button>
        <Button size="sm" className="bg-solar-orange text-white">
          <FileText className="h-3 w-3 mr-1" /> Quote
        </Button>
      </div>
    </div>
  );
}
