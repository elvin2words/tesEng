import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ChevronDown, Bot, Search, Phone, 
  MapPin, Instagram, Facebook, Hammer, Wrench, Package, Cog, 
  ShieldCheck, Home, Building, Factory, Gem, Leaf, 
  Linkedin,
  Twitter} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TESLogo from "./tes-logo";
import { useRef } from "react";
import SmartLink from "./SmartLink";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<"services" | "projects" | "contact" | null>(null);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const mobilePopupRef = useRef<HTMLDivElement>(null);
  
  const servicesDropdown = [
    { name: "Installation", description: "Professional setup", link: "/installation#install", icon: Hammer },
    { name: "Maintenance", description: "System upkeep", link: "/maintenance#maintain", icon: Wrench },
    { name: "Equipment Supply", description: "Solar, LV, HV Systems gear ", link: "/supply#equipment", icon: Package },
    { name: "Generator Services", description: "Supply & care", link: "/genservs#generators", icon: Cog },
    { name: "Security Systems", description: "Digital protection", link: "/secsys#security", icon: ShieldCheck },
  ];

  const projectsDropdown = [
    { name: "Residential", description: "Homes & flats", link: "/residential#res", icon: Home },
    { name: "Commercial", description: "Shops & business", link: "/commercial#biz", icon: Building },
    { name: "Industrial", description: "Factories", link: "/industrial#industry", icon: Factory },
    { name: "Mining", description: "Heavy-duty", link: "/mining#mine", icon: Gem },
    { name: "Agricultural", description: "Farms & irrigation", link: "/agricultural#agric", icon: Leaf },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = location.startsWith("/#") ? location.substring(1) : null;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setLocation("/");
    }
  }, [location, setLocation]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
      if (mobilePopupRef.current && !mobilePopupRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // useEffect(() => {
  //   const handleKey = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") setShowSearch(false);
  //   };
  //   window.addEventListener("keydown", handleKey);
  //   return () => window.removeEventListener("keydown", handleKey);
  // }, []);

  const handleNavClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    if (location === "/") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation(`/${hash}`);
    }
  };

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    location === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : setLocation("/");
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? "glass-effect" : "glass-effect"}`
      // isScrolled ? "glass-effect border-b border-gray-100 dark:border-gray-800" : "glass-effect"
    }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <SmartLink to="/">
            <div className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200">
              <TESLogo size="default" />
            </div>
          </SmartLink>

          {/* <div className="flex items-center">
            <div className="text-xl md:text-2xl font-bold gradient-text flex items-center animate-fade-in">
              <Zap className="w-6 h-6 md:w-8 md:h-8 mr-2 text-solar-orange" />
              <div className="relative">
                <Building2 className={`${currentSize.icon} tes-teal mr-1`} />
                <Zap className="w-3 h-3 md:w-4 md:h-4 tes-gold absolute -top-1 -right-1" />
              </div>
              <span className="hidden sm:inline"> TES Engineering</span>
              <span className="sm:hidden">TES</span>
            </div>
          </div> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={handleHomeClick} className="transition-all hover:scale-105 active:scale-95 text-foreground hover:text-solar-orange text-sm font-medium">Home</button>

            {/* Services */}
            {/* <button
                onClick={() => handleNavClick("#services")}
                className="text-foreground hover:text-solar-orange px-3 py-2 text-sm font-medium transition-all hover:scale-105"
              >
                Services
              </button> */}
              {/* Services Dropdown */}
              {/* <div className="relative group">
                <button
                  onClick={() => handleNavClick("#services")}
                  onMouseEnter={() => setActiveDropdown("services")}
                  className="text-foreground hover:tes-primary px-3 py-2 text-sm font-medium transition-all hover:scale-105 flex items-center"
                >
                  Services
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                
                {activeDropdown === "services" && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {servicesDropdown.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleNavClick("#services");
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium text-foreground">{service.name}</div>
                          <div className="text-sm text-muted-foreground">{service.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>   */}
            <div className="relative group">
              <button 
                aria-haspopup="true"
                aria-expanded={activeDropdown === "services"}
                onClick={() => handleNavClick("#services")}
                className="flex items-center scroll-offset text-sm text-foreground hover:text-solar-orange transition-all hover:scale-105">
                Services <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  {servicesDropdown.map(({ name, description, link, icon: Icon }, i) => (
                    <SmartLink to={link} key={i}>
                      <button className="flex items-start w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105">
                        <Icon className="w-4 h-4 mr-2 mt-1 text-solar-blue" />
                        <div>
                          <div className="font-medium text-foreground">{name}</div>
                          <div className="text-sm text-muted-foreground">{description}</div>
                        </div>
                      </button>
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects */}
            {/* <button
                 onClick={() => handleNavClick("#projects")}
                 className="text-foreground hover:text-solar-orange px-3 py-2 text-sm font-medium transition-all hover:scale-105"
               >
                 Projects
               </button> */}
              {/* Projects Dropdown */}
              {/* <div className="relative group">
                <button
                  onClick={() => handleNavClick("#projects")}
                  onMouseEnter={() => setActiveDropdown("projects")}
                  className="text-foreground hover:tes-primary px-3 py-2 text-sm font-medium transition-all hover:scale-105 flex items-center"
                >
                  Projects
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                
                {activeDropdown === "projects" && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {projectsDropdown.map((project, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleNavClick("#projects");
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="font-medium text-foreground">{project.name}</div>
                          <div className="text-sm text-muted-foreground">{project.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div> */}
            <div className="relative group">
              <button 
                aria-haspopup="true"
                aria-expanded={activeDropdown === "projects"}
                onClick={() => handleNavClick("#projects")}
                className="flex items-center text-sm text-foreground hover:text-solar-orange transition-all hover:scale-105">
                Projects <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2">
                  {projectsDropdown.map(({ name, description, link, icon: Icon }, i) => (
                    <SmartLink to={link} key={i}>
                      <button className="flex items-start w-full text-left p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105">
                        <Icon className="w-4 h-4 mr-2 mt-1 text-solar-blue" />
                        <div>
                          <div className="font-medium text-foreground">{name}</div>
                          <div className="text-sm text-muted-foreground">{description}</div>
                        </div>
                      </button>
                    </SmartLink>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => handleNavClick("#about")} className="text-sm text-foreground hover:text-solar-orange transition-all hover:scale-105">About TES</button>

            <SmartLink to="/sizing-tool">
              <button className="flex items-center space-x-1 text-sm text-foreground hover:text-solar-orange transition-all hover:scale-105">
                <Bot className="w-4 h-4" />
                <span>SystemSizing</span>
                {/* <Badge className="bg-solar-blue text-white text-xs">AI</Badge> */}
              </button>
            </SmartLink>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground hover:text-solar-orange transition-all hover:scale-110">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="icon"onClick={() => setShowSearch(true)} className="text-foreground hover:text-solar-orange transition-all hover:scale-110">
              <Search className="w-5 h-5" />
            </Button>

            {/* <Button onClick={() => handleNavClick("#contact")} className="relative bg-solar-orange text-white px-6 py-2 rounded-full text-sm transition-all hover:scale-105 active:scale-95">
              Contact
              <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 p-3 space-y-2">
                <a href="https://wa.me/263xxxxxxx" target="_blank" rel="noopener" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><Bot className="w-4 h-4" /><span>WhatsApp</span></a>
                <a href="tel:+263xxxxxxx" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><Phone className="w-4 h-4" /><span>Call</span></a>
                <a href="https://maps.google.com" target="_blank" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><MapPin className="w-4 h-4" /><span>Location</span></a>
                <hr className="border-gray-200 dark:border-gray-700" />
                <a href="https://instagram.com" target="_blank" className="flex items-center space-x-2 hover:text-pink-500 transition-all hover:scale-105"><Instagram className="w-4 h-4" /><span>Instagram</span></a>
                <a href="https://facebook.com" target="_blank" className="flex items-center space-x-2 hover:text-blue-600 transition-all hover:scale-105"><Facebook className="w-4 h-4" /><span>Facebook</span></a>
              </div>
            </Button> */}

            {/* <div
              className="relative group"
              onMouseEnter={() => setShowContactDropdown(true)}
              onMouseLeave={() => setShowContactDropdown(false)}
            >
              <Button
                onClick={() => handleNavClick("#contact")}
                className="bg-solar-orange text-white hover:bg-orange-600 px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 animate-pulse-glow"
              >
                Contact
              </Button>
              {showContactDropdown && (
                <div className="dropdown">
                  <a href="https://wa.me/1234567890" target="_blank" className="dropdown-item">
                    <Phone className="w-4 h-4 text-green-500 mr-2" /> WhatsApp
                  </a>
                  <a href="tel:+1234567890" className="dropdown-item">
                    <Phone className="w-4 h-4 text-blue-500 mr-2" /> +123 456 7890
                  </a>
                  <a href="https://goo.gl/maps/example" target="_blank" className="dropdown-item">
                    <MapPin className="w-4 h-4 text-red-500 mr-2" /> Visit Us
                  </a>
                  <div className="border-t mt-2 pt-2">
                    <a href="https://facebook.com" target="_blank" className="dropdown-item">
                      <Facebook className="w-4 h-4 text-blue-600 mr-2" /> Facebook
                    </a>
                    <a href="https://twitter.com" target="_blank" className="dropdown-item">
                      <Twitter className="w-4 h-4 text-sky-500 mr-2" /> Twitter
                    </a>
                    <a href="https://linkedin.com" target="_blank" className="dropdown-item">
                      <Linkedin className="w-4 h-4 text-blue-700 mr-2" /> LinkedIn
                    </a>
                  </div>
                </div>
              )}
            </div> */}
            <div className="relative group">
              <button
                onClick={() => handleNavClick("#contact")}
                className="relative bg-solar-orange text-white px-6 py-2 rounded-full text-sm transition-all hover:scale-105 active:scale-95"
              >
                Contact
                {/* <ChevronDown className="w-4 h-4 ml-2 inline-block" /> */}
              </button>
              <div className="absolute top-full right-0 mt-1 w-36 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-3 space-y-2">
                <a href="https://wa.me/263712104928" target="_blank" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><Bot className="w-4 h-4" /><span>WhatsApp </span></a>
                <a href="tel:+263712104928" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><Phone className="w-4 h-4" /><span>Call</span></a>
                <a href="https://maps.google.com" target="_blank" className="flex items-center space-x-2 hover:text-solar-orange transition-all hover:scale-105"><MapPin className="w-4 h-4" /><span>Location</span></a>
                <hr className="border-gray-200 dark:border-gray-700" />
                <a href="https://instagram.com/tesEng/" target="_blank" className="flex items-center space-x-2 hover:text-pink-500 transition-all hover:scale-105"><Instagram className="w-4 h-4" /><span>Instagram</span></a>
                <a href="https://facebook.com" target="_blank" className="flex items-center space-x-2 hover:text-blue-600 transition-all hover:scale-105"><Facebook className="w-4 h-4" /><span>Facebook</span></a>
                <a href="https://linkedin.com/in/" target="_blank" className="flex items-center space-x-2 hover:text-cyan-600 transition-all hover:scale-105"><Linkedin className="w-4 h-4" /><span>Linked In</span></a>
                <a href="https://x.com/tesEng" target="_blank" className="flex items-center space-x-2 hover:text-green-600 transition-all hover:scale-105"><Twitter className="w-4 h-4" /><span>Twitter - X </span></a>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}><Search className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>{theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}</Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</Button>
          </div>
        </div>

        {/* Mobile Menu Popup */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)}>
            <div ref={mobilePopupRef} 
              className="md:hidden absolute inset-x-4 top-20 z-50" onClick={(e) => e.stopPropagation()}
            //  className="md:hidden w-full max-w-md bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 space-y-4 transition-all animate-fade-in-down"
             >
              <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 space-y-4 transition-all animate-fade-in-down">
                <div className="space-y-1">
                  {/* <button onClick={handleHomeClick} className="block w-full text-center text-lg font-semibold hover:text-solar-orange transition-all" > Home </button> */}
                  <button onClick={handleHomeClick} className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105">Home</button>
                </div>

                <div className="space-y-1">
                  <button onClick={() => {
                      // setIsServicesOpen(!isServicesOpen);
                      setActiveMobileDropdown(activeMobileDropdown === "services" ? null : "services");
                      const el = document.querySelector("#services");
                      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);                    
                    }} 
                    className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105">
                      Services
                  </button>
                  {activeMobileDropdown === "services" && (
                  // {/* {isServicesOpen && ( */}
                      <div className="bg-white/60 dark:bg-gray-800 rounded-xl border p-3 space-y-2">
                        {servicesDropdown.map(({ name, description, link, icon: Icon }, i) => (
                          <SmartLink to={link} key={i}>
                            <button onClick={() => setIsMobileMenuOpen(false)} 
                              className="flex items-start w-full px-2 py-2 text-left text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                              <Icon className="w-4 h-4 mr-2 mt-1 text-solar-blue" />
                              <div>
                                <div className="font-medium">{name}</div>
                                <div className="text-sm text-muted-foreground">{description}</div>
                              </div>
                            </button>
                          </SmartLink>
                        ))}
                      </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <button onClick={() => {
                      setActiveMobileDropdown(activeMobileDropdown === "projects" ? null : "projects");
                      // setIsProjectsOpen(!isProjectsOpen);
                      const el = document.querySelector("#projects");
                      if (el) {
                        setTimeout(() => {
                          el.scrollIntoView({ behavior: "smooth" });
                        }, 100); // slight delay for smoother UX
                      }
                    }} 
                    className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105">
                      Projects
                  </button>
                  {activeMobileDropdown === "projects" && (
                  // {/* {isProjectsOpen && ( */}
                      <div className="bg-white/60 dark:bg-gray-800 rounded-xl border p-3 space-y-2">
                        {projectsDropdown.map(({ name, description, link, icon: Icon }, i) => (
                          <SmartLink to={link} key={i}>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="flex items-start w-full px-2 py-2 text-left text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                              <Icon className="w-4 h-4 mr-2 mt-1 text-solar-blue" />
                              <div>
                                <div className="font-medium">{name}</div>
                                <div className="text-sm text-muted-foreground">{description}</div>
                              </div>
                            </button>
                          </SmartLink>
                        ))}
                      </div>
                  )}
                </div>

                <div className="space-y-1">
                  <button onClick={() => handleNavClick("#about")} 
                    className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105">
                      About TES
                  </button>
                </div>

                <div className="space-y-1">
                  <SmartLink to="/sizing-tool">
                    <button onClick={() => setIsMobileMenuOpen(false)} 
                      // className="flex justify-center items-center w-full py-2 rounded-xl hover:scale-105 transition-all border border-gray-300 dark:border-gray-700"
                      className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105"
                    >
                      {/* <Bot className="w-4 h-4 mr-2" /> */}
                      <span>SizingTool</span>
                      <Badge className="ml-2 bg-solar-blue text-white text-xs">AI</Badge>
                    </button>
                  </SmartLink>
                </div>

                <div className="space-y-1">
                  {/* <Button onClick={() => handleNavClick("#contact")} className="w-full justify-center bg-solar-orange text-white mt-2 rounded-xl hover:scale-105">Contact</Button> */}
                  <button onClick={() => {
                      // setShowContactDropdown(!showContactDropdown); 
                      setActiveMobileDropdown(activeMobileDropdown === "contact" ? null : "contact");
                      const el = document.querySelector("#contact");
                      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);                    
                    }} 
                    className="block w-full text-center py-3 text-base font-medium transition-all hover:scale-105">
                    Contact</button>
                  {activeMobileDropdown === "contact" && (
                  // {/* {showContactDropdown && ( */}
                    <div 
                    // className="flex flex-col items-center gap-2 mt-2 text-sm"
                      className="flex flex-col items-center gap-2 bg-white/60 dark:bg-gray-800 rounded-xl border p-3 space-y-2"
                    >
                      <a href="https://wa.me/263xxxxxxx" target="_blank" 
                        className="flex justify-center items-center gap-2 w-full py-2 rounded-md hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"><Bot className="w-4 h-4" />WhatsApp</a>
                      <a href="tel:+263xxxxxxx" 
                        className="flex justify-center items-center gap-2 w-full py-2 rounded-md hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"><Phone className="w-4 h-4" />Call</a>
                      <a href="https://maps.google.com" target="_blank" 
                        className="flex justify-center items-center gap-2 w-full py-2 rounded-md hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"><MapPin className="w-4 h-4" />Location</a>
                      <a href="https://instagram.com" target="_blank" 
                        className="flex justify-center items-center gap-2 w-full py-2 rounded-md hover:text-pink-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"><Instagram className="w-4 h-4" />Instagram</a>
                      <a href="https://facebook.com" target="_blank" 
                        className="flex justify-center items-center gap-2 w-full py-2 rounded-md hover:text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"><Facebook className="w-4 h-4" />Facebook</a>
                    </div>
                  )}                
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Search Popup */}
        {showSearch && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-50">
          {/* <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20"> */}
            <div ref={searchRef} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 backdrop-blur-md">
              <div className="flex items-center">
                <Search className="w-5 h-5 text-muted-foreground mr-2" />
                <input type="text" placeholder="Search for catalogs, services, projects...." className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground" autoFocus />
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)} className="ml-2 text-foreground hover:text-red-500">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
