import { Award, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // optional utility for conditional classes

export default function InstallersDirSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100); // trigger animation on mount
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 text-center bg-white/80 dark:bg-gray-900/70 backdrop-blur-md transition-all duration-700 ease-in-out",
            mounted ? "animate-in fade-in zoom-in" : "opacity-0 scale-95"
          )}
        >
          <h2 className="text-3xl font-bold mb-6">Meet Our Certified Installers</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Work with TES certified installation experts across Zimbabwe. Our trained professionals ensure
            quality installations backed by our warranty and support.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              {
                icon: <Award className="h-10 w-10 text-solar-orange" />,
                title: "TES Certified",
                desc: "All installers undergo rigorous training and certification",
                color: "solar-orange",
              },
              {
                icon: <MapPin className="h-10 w-10 text-solar-blue" />,
                title: "Nationwide Coverage",
                desc: "Find qualified installers in your region across Zimbabwe",
                color: "solar-blue",
              },
              {
                icon: <Star className="h-10 w-10 text-solar-yellow" />,
                title: "Proven Results",
                desc: "Track records with verified customer reviews and ratings",
                color: "solar-yellow",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl",
                  mounted ? "animate-in fade-in slide-in-from-bottom-10 delay-" + (i + 1) * 100 : "opacity-0"
                )}
              >
                <div
                  className={`w-20 h-20 bg-${item.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={() => (window.location.href = "/installers")}
            className="bg-solar-orange hover:bg-orange-600 text-white px-8 py-3 text-lg transition-transform duration-300 active:scale-95"
          >
            Find Your Installer
          </Button>
        </div>
      </div>
    </section>
  );
}
