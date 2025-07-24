import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, User, Zap, Home, Calculator, FileText, Settings, Download, Mail, MapPin, Battery, Sun, DollarSign, Bot } from "lucide-react";
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
{/* <div className="mb-8 animate-fade-in-up">
  <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-4">
    <Bot className="h-5 w-5 text-solar-yellow mr-2 animate-pulse" />
    <span className="text-white font-medium mr-3">Smart Energy. Smart Tools.</span>
    <Badge className="bg-solar-orange text-white">AI-Powered</Badge>
  </div>
  <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
    Meet SmartTES - Your intelligent solar assistant. Get instant system sizing, location optimization, 
    and personalized recommendations powered by advanced AI analytics.
  </p>
</div> */}

const SAMPLE_RESPONSES = {
  greeting: "Hello! I'm SmartTES, your AI-powered solar assistant. I can help you size a solar system with advanced analytics including geo-location optimization, daily energy analysis, and budget considerations. How can I assist you today?",
  solarSizing: "I'd be happy to help size a solar system for you! I'll need some information: your location, daily energy usage (kWh), desired backup duration, and optionally your budget range. I can provide professional system specifications with panel recommendations, battery sizing, and inverter ratings.",
  proMode: "Pro Mode unlocked! Now you can customize panel types (monocrystalline, polycrystalline, thin-film), battery chemistries (LiFePO4, Li-ion, AGM, Gel), and compare price-performance ratios. I'll provide detailed technical specifications and multiple system configurations.",
  quote: "Perfect! I can prepare a comprehensive quote with your system specifications and forward it to TES Engineering for professional review. Would you like me to generate a PDF proposal and email it to you?",
  location: "Please provide your location (city/country) so I can factor in solar irradiance, weather patterns, and local regulations for optimal system sizing.",
  default: "I specialize in advanced solar system design using AI-powered analytics. I can help with system sizing, location optimization, energy analysis, budget planning, and technical specifications. What would you like to explore?"
};

const QUICK_ACTIONS = [
  { icon: Calculator, text: "Advanced system sizing", action: "sizing" },
  { icon: MapPin, text: "Location optimization", action: "location" },
  { icon: Settings, text: "Enable Pro Mode", action: "promode" },
  { icon: FileText, text: "Generate quote", action: "quote" }
];

export default function SmartTESChat({ isFloating = true, onSolarSizingRequest, onQuoteRequest }: SmartTESChatProps) {
  const [isOpen, setIsOpen] = useState(!isFloating);
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
  const [isVisible, setIsVisible] = useState(false);
  const [proMode, setProMode] = useState(false);
  const [currentSpecs, setCurrentSpecs] = useState<SystemSpecs | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const popupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  //   const FloatingChatButton = () => (
  //   <div 
  //     className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
  //       isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
  //     }`}
  //     onMouseEnter={() => setIsVisible(true)}
  //   >
  //     <Dialog open={isOpen} onOpenChange={setIsOpen}>
  //       <DialogTrigger asChild>
  //         <Button 
  //           className="bg-solar-blue hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 group"
  //         >
  //           <Bot className="w-6 h-6 group-hover:animate-pulse" />
  //         </Button>
  //       </DialogTrigger>
  //       <DialogContent className="sm:max-w-md">
  //         <DialogHeader>
  //           <DialogTitle className="flex items-center space-x-2">
  //             <Bot className="w-5 h-5 text-solar-blue" />
  //             <span>SmartTES AI Assistant</span>
  //             <Badge className="bg-solar-blue text-white text-xs">AI</Badge>
  //           </DialogTitle>
  //         </DialogHeader>
  //         <ChatInterface />
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  // );
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isOpen) {
      setShowPopup(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isOpen && showPopup) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 10);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowPopup(false);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

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

  const generateResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = SAMPLE_RESPONSES.default;
    let suggestions: string[] = [];
    let systemSpecs: SystemSpecs | null = null;

    if (message.includes("pro mode") || message.includes("advanced")) {
      setProMode(true);
      response = SAMPLE_RESPONSES.proMode;
      suggestions = ["Customize panel types", "Compare battery chemistries", "Price-performance analysis"];
    } else if (message.includes("size") || message.includes("system") || message.includes("kwh") || message.includes("location")) {
      const sizingData = extractSizingData(userMessage);
      systemSpecs = calculateSystemSpecs(sizingData);
      setCurrentSpecs(systemSpecs);

      response = `Based on your requirements in ${systemSpecs.location}, I've calculated an optimal ${systemSpecs.panelCount}x${systemSpecs.panelWattage}W solar system with ${systemSpecs.batteryCapacity}kWh battery storage and ${systemSpecs.inverterRating}kW inverter. Total estimated cost: $${systemSpecs.totalCost.toLocaleString()}. ${proMode ? `Pro Mode analysis shows price-performance ratio of ${systemSpecs.pricePerformanceRatio}:1 with ${systemSpecs.panelType} panels and ${systemSpecs.batteryChemistry} batteries.` : 'Enable Pro Mode for detailed technical options.'}`;

      suggestions = ["Download PDF report", "Email specifications", "Request TES quote", proMode ? "Compare alternatives" : "Enable Pro Mode"];

      if (onSolarSizingRequest) {
        onSolarSizingRequest(userMessage);
      }
    } else if (message.includes("location") || message.includes("where")) {
      response = SAMPLE_RESPONSES.location;
      suggestions = ["Harare, Zimbabwe", "Cape Town, South Africa", "Gaborone, Botswana", "Windhoek, Namibia"];
    } else if (message.includes("quote") || message.includes("pdf") || message.includes("email")) {
      response = SAMPLE_RESPONSES.quote;
      suggestions = ["Generate PDF proposal", "Email to my address", "Forward to TES Engineering", "Schedule consultation"];

      if (onQuoteRequest && currentSpecs) {
        onQuoteRequest({ source: "smarttes", specs: currentSpecs, message: userMessage });
      }
    } else if (message.includes("hello") || message.includes("hi") || message.includes("help")) {
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

  const handleSendMessage = async () => {
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
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      sizing: "I need advanced solar system sizing with location optimization and energy analysis",
      location: "Analyze solar potential for my location",
      promode: "Enable Pro Mode for advanced customization options",
      quote: "Generate a comprehensive quote with PDF and email options"
    };

    setInputValue(actionMessages[action as keyof typeof actionMessages] || "");
  };

  const handleDownloadPDF = () => {
    if (currentSpecs) {
      // Simulate PDF generation
      alert("PDF proposal generated! This would normally download a detailed system specification document.");
    }
  };

  const handleEmailSpecs = () => {
    if (currentSpecs) {
      // Simulate email functionality
      alert("System specifications sent to your email! This would normally send a detailed proposal.");
    }
  };

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

  if (isFloating) {
    return (
      <>
        {/* Floating Chat Button with Smart Popup */}
        {!isOpen && (
          <div 
            className="fixed bottom-6 right-6 z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Smart Popup */}
            {(showPopup || isHovered) && (
              <div className="fixed bottom-24 sm:right-1/2 sm:translate-x-1/2 z-50 animate-fade-in-up max-w-xs">
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 w-42 max-w-full sm:w-52">
                  
                  {/* Tooltip arrow */}
                  {/* <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b transform rotate-45"></div> */}
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45 z-0"></div>
                  {/* <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45 z-0"></div> */}
                  {/* <div className="absolute -bottom-2 right-6 sm:right-1/2 sm:translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div> */}
                  
                  <div className="flex flex-col items-center text-center space-y-0 w-15">
                    {/* Icon and title row */}
                    <div className="flex items-center space-x-1 mb-1">
                    {/* Bot icon */}
                    {/* <div className="flex-shrink-0 w-10 h-10 bg-solar-orange rounded-full flex items-center justify-center shadow-md"> */}
                      <div className="w-8 h-8 bg-solar-orange rounded-full flex items-center justify-center shadow-md">
                      <Bot className="h-4 w-4 text-white" />
                      </div>
                      {/* Text content */}
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white ">
                        Ask SmartTES 🤖
                      </h4>
                    </div>
                    {/* Description */}
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                        Not sure what you need? Chat with our AI assistant to size your system.
                      </p>
                      {/* Start Chat Button */}
                      <Button
                        onClick={handleOpenChat}
                        className="mt-2 bg-solar-orange hover:bg-orange-600 text-white text-xs font-medium h-7 px-4 rounded-md transition-all duration-200"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Floating Button */}
            <Button
              onClick={handleOpenChat}
              className="h-14 w-14 rounded-full bg-solar-orange hover:bg-orange-600 shadow-lg animate-pulse-glow relative overflow-hidden"
              size="lg"
            >
              <MessageCircle className="h-6 w-6 text-white" />
              {/* Notification dot when popup should show */}
              {showPopup && !isHovered && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-solar-yellow rounded-full border-2 border-white animate-ping"></div>
              )}
            </Button>
          </div>
        )}

        {/* Floating Chat Window */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} // click outside to close
            >
            <Card 
              className="relative w-full max-w-md sm:max-w-xl sm:w-[32rem] h-[90vh] sm:h-[600px] bg-white dark:bg-gray-800 shadow-2xl rounded-xl flex flex-col"
              onClick={(e) => e.stopPropagation()} // prevent click from bubbling up
            >
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-solar-orange to-solar-blue text-white p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  {/* Left: Pro Mode Badge */}
                  <div className="w-1/4 flex justify-start">
                    {proMode && (
                      <Badge className="bg-green-500 text-white text-xs">Pro Mode</Badge>
                    )}
                  </div>
                  
                  {/* Center: Icon + Title */}
                  {/* <div className="flex items-center space-x-3"> */}
                  {/* <div className="w-2/4 flex flex-col items-center">
                    <Zap className="h-6 w-6" />
                    <div>
                      <h3 className="text-lg font-bold">SmartTES</h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="mt-1">
                        <Badge className="bg-white/20 text-white text-xs">AI-Powered</Badge>
                        </div>
                        {proMode && (
                          <Badge className="bg-green-500 text-white text-xs">Pro Mode</Badge>
                        )}
                      </div>
                    </div>
                  </div> */}
                  <div className="w-2/4 flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <h3 className="text-base font-bold">SmartTES</h3>
                    </div>
                    <div className="mt-1">
                      <Badge className="bg-white/20 text-white text-xs">AI-Powered</Badge>
                    </div>
                  </div>                  

                  {/* Right: Close Button */}
                  <div className="w-1/4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat content */}
              <CardContent className="p-0 flex-1 overflow-hidden">
                <ChatInterface 
                  messages={messages}
                  isTyping={isTyping}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  handleSendMessage={handleSendMessage}
                  handleSuggestionClick={handleSuggestionClick}
                  handleQuickAction={handleQuickAction}
                  messagesEndRef={messagesEndRef}
                  proMode={proMode}
                  currentSpecs={currentSpecs}
                  onDownloadPDF={handleDownloadPDF}
                  onEmailSpecs={handleEmailSpecs}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </>
    );
  }

  // Embedded chat interface for pages
  return (
    <Card className="w-full h-[600px] bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-solar-orange to-solar-blue text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <div>
              <h3 className="text-xl font-bold">SmartTES Assistant</h3>
              <div className="flex items-center space-x-2">
                <Badge className="bg-white/20 text-white text-sm">AI-Powered</Badge>
                {proMode && <Badge className="bg-green-500 text-white text-sm">Pro Mode</Badge>}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setProMode(!proMode)}
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-4 w-4 mr-2" />
            {proMode ? "Standard" : "Pro Mode"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-full">
        <ChatInterface 
          messages={messages}
          isTyping={isTyping}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          handleSuggestionClick={handleSuggestionClick}
          handleQuickAction={handleQuickAction}
          messagesEndRef={messagesEndRef}
          proMode={proMode}
          currentSpecs={currentSpecs}
          onDownloadPDF={handleDownloadPDF}
          onEmailSpecs={handleEmailSpecs}
        />
      </CardContent>
    </Card>
  );
}

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleQuickAction: (action: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  proMode: boolean;
  currentSpecs: SystemSpecs | null;
  onDownloadPDF: () => void;
  onEmailSpecs: () => void;
}

function ChatInterface({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleSuggestionClick,
  handleQuickAction,
  messagesEndRef,
  proMode,
  currentSpecs,
  onDownloadPDF,
  onEmailSpecs
}: ChatInterfaceProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
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
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex",
            message.sender === "user" ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.sender === "user"
                ? "bg-solar-orange text-white"
                : "bg-gray-100 dark:bg-gray-700 text-foreground"
            )}>
              <div className="flex items-start space-x-2">
                <Zap className="h-4 w-4 mt-0.5 text-solar-orange" />
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>

                  {/* System Specifications Display */}
                  {message.systemSpecs && (
                    <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                      <h4 className="font-semibold text-solar-orange mb-2 flex items-center">
                        <Sun className="h-4 w-4 mr-1" />
                        System Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="font-medium">Location:</span> {message.systemSpecs.location}</div>
                        <div><span className="font-medium">Daily Usage:</span> {message.systemSpecs.dailyEnergyUsage}kWh</div>
                        <div><span className="font-medium">Panels:</span> {message.systemSpecs.panelCount}x{message.systemSpecs.panelWattage}W</div>
                        <div><span className="font-medium">Battery:</span> {message.systemSpecs.batteryCapacity}kWh</div>
                        <div><span className="font-medium">Inverter:</span> {message.systemSpecs.inverterRating}kW</div>
                        <div><span className="font-medium">Total Cost:</span> ${message.systemSpecs.totalCost.toLocaleString()}</div>
                        {proMode && message.systemSpecs.panelType && (
                          <>
                            <div><span className="font-medium">Panel Type:</span> {message.systemSpecs.panelType}</div>
                            <div><span className="font-medium">Battery:</span> {message.systemSpecs.batteryChemistry}</div>
                            <div><span className="font-medium">P/P Ratio:</span> {message.systemSpecs.pricePerformanceRatio}:1</div>
                            <div><span className="font-medium">ROI:</span> {message.systemSpecs.roi}</div>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" onClick={onDownloadPDF}>
                          <Download className="h-3 w-3 mr-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline" onClick={onEmailSpecs}>
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button size="sm" className="bg-solar-orange text-white">
                          <FileText className="h-3 w-3 mr-1" />
                          Quote
                        </Button>
                      </div>
                    </div>
                  )}

                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 mr-1 mb-1"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-solar-orange" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-solar-orange hover:bg-orange-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {proMode && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <Settings className="h-3 w-3 mr-1" />
            Pro Mode: Advanced customization and analytics enabled
          </p>
        )}
      </div>
    </div>
  );
}