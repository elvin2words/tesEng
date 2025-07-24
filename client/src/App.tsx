import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/theme-context";
import Home from "@/pages/home";
import SizingTool from "@/pages/sizing-tool";
import ResidentialPage from "@/pages/residential";
import CommercialPage from "@/pages/commercial";
import IndustrialPage from "@/pages/industrial";
import MiningPage from "@/pages/mining";
import AgriculturalPage from "@/pages/agricultural";
import SmartTESChat from "@/components/smart-tes-chat";
import Installers from "@/pages/installers";
import Installation from "@/pages/installation";
import Maintenance from "@/pages/maintenance";
import Supply from "@/pages/supply";
import GeneratorServices from "@/pages/genservs";
import SecuritySystems from "@/pages/secsys";
import NotFound from "@/pages/not-found";
import smartTESpage from "@/pages/smartTESpage";
// import AdminDashboard from "./pages/admin-dashboard";
// import InstallersPage from "./pages/installers";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* <Route path="/sizing-tool" component={SizingTool} /> */}
      <Route path="/sizing-tool" component={smartTESpage} />
      <Route path="/residential" component={ResidentialPage} />
      <Route path="/commercial" component={CommercialPage} />
      <Route path="/industrial" component={IndustrialPage} />
      <Route path="/mining" component={MiningPage} />
      <Route path="/agricultural" component={AgriculturalPage} />
      <Route path="/installers" component={Installers} />
      <Route path="/installation" component={Installation} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/supply" component={Supply} />
      <Route path="/genservs" component={GeneratorServices} />
      <Route path="/secsys" component={SecuritySystems} />
      {/* <Route path="/admin" component={AdminDashboard} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          {/* Floating SmartTES Chat - Available on all pages */}
          <SmartTESChat isFloating={true} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
