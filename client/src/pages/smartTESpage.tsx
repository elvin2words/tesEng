import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SizingTool from "@/pages/sizing-tool";


export default function smartTESpage() {

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 transition-colors duration-300">
      <Navigation />
      <SizingTool />
      <Footer />
    </div>
  );
}