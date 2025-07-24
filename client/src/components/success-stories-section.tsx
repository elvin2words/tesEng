import { Card, CardContent } from "@/components/ui/card";
import { Star, Building2, Stethoscope, School } from "lucide-react";

const testimonials = [
  {
    icon: Building2,
    company: "Masvingo Agro-Processors",
    location: "Masvingo, Zimbabwe",
    quote:
      "With TES, our cold storage now runs on clean, uninterrupted power. We’ve reduced generator usage by over 70% due to adaptive analytics — a game-changer for our operations.",
    rating: 5,
    metric: "70%",
    metricLabel: "Diesel Savings"
  },
  {
    icon: School,
    company: "Chinhoyi High School",
    location: "Mash West, Zimbabwe",
    quote:
      "TES installed a hybrid solar solution that powers our computer labs and lighting. Learners now study without interruptions, even during load shedding.",
    rating: 5,
    metric: "2.4kW",
    metricLabel: "System Size"
  },
  {
    icon: Stethoscope,
    company: "Mutasa Rural Clinic",
    location: "Manicaland, Zimbabwe",
    quote:
      "Our patients rely on refrigeration for vaccines and essential devices. TES’s solar backup has kept us online through every outage for over 2 years.",
    rating: 5,
    metric: "730+ Days",
    metricLabel: "Uninterrupted Service"
  }
];

const stats = [
  { value: "15+", label: "Sites Electrified" },
  { value: "220kWh+", label: "Daily Energy Offset" },
  { value: "4", label: "Provinces Served" }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-500 to-blue-600 dark:from-orange-600 dark:to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up">
            {/* SmartTES in Action */}
            Client Stories - TES in Action
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto opacity-90 animate-slide-in-left">
            "You can't light the future in the dark. From classrooms to clinics, power drives progress — and every community in Zimbabwe deserves it."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-effect hover:bg-white/20 transition-all duration-300 border-0 card-hover"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 animate-bounce-in">
                      <testimonial.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base sm:text-lg">{testimonial.company}</h4>
                      <p className="text-xs sm:text-sm opacity-80">{testimonial.location}</p>
                    </div>
                  </div>

                  <blockquote className="text-sm sm:text-lg italic mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-xs sm:text-sm opacity-80">5.0 Rating</span>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-400 animate-pulse-glow">
                    {testimonial.metric}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">{testimonial.metricLabel}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-8 text-xl sm:text-2xl font-bold">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="text-center animate-bounce-in" style={{ animationDelay: `${index * 0.3}s` }}>
                  <div className="text-3xl sm:text-4xl text-yellow-400 mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm opacity-80">{stat.label}</div>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block h-16 w-px bg-white/30 mx-6 md:mx-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
