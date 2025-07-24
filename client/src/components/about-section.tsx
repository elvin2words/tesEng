export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 sm:mb-8">
              About TES Engineering
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground">
              <p className="animate-fade-in-up">
                TES (The Engineering Specialist) is an engineering company specializing in sustainable energy solutions, primarily solar, and the supply and fix of quality engineering equipment.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                SmartTES seeks to provide real-time system sizing, AI-powered recommendations, and post-installation support — to boost-on-the-ground installations across residential, commercial, industrial, and agricultural sectors, we merge hardware, software, and human expertise into one seamless experience.
              </p>
              <p className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                With 15+ sites electrified across Zimbabwe and a growing network of accredited installers, TES is not just a solar company — we’re a digital-first energy transformation partner building Africa’s resilient, tech-driven energy future.
              </p>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-6 sm:gap-8">
              <div className="animate-bounce-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-solar-orange mb-2">2+</div>
                <div className="text-muted-foreground text-sm sm:text-base">Years Building Solutions in the Field</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-solar-orange mb-2">120+</div>
                <div className="text-muted-foreground text-sm sm:text-base">Homes & Small Businesses Powered</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: '1s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-solar-orange mb-2">15</div>
                <div className="text-muted-foreground text-sm sm:text-base">Certified Local Installers Growing Fast</div>
              </div>
              <div className="animate-bounce-in" style={{ animationDelay: '1.2s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-solar-orange mb-2">4.7/5</div>
                <div className="text-muted-foreground text-sm sm:text-base">Average Client Feedback Rating</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <img
              src="/images/solar-farm.jpg"
              alt="TES Engineers working a Solar Farm installation"
              className="rounded-2xl shadow-lg w-full hover-lift transition-all duration-300"
            />

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 card-hover">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                To engineer Africa’s energy independence by integrating intelligent solar systems, empowering customers with sustainble, efficient energy solutions that are accessible, affordable, and future-ready, tailored to meet your needs and requirments.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center animate-fade-in-up">
                  <div className="w-3 h-3 bg-solar-orange rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-foreground text-sm sm:text-base">Efficient Solar Systems</span>
                </div>
                <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="w-3 h-3 bg-solar-yellow rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-foreground text-sm sm:text-base">Quality HV, LV Equipment</span>
                </div>
                <div className="flex items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="w-3 h-3 bg-solar-blue rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-foreground text-sm sm:text-base">Smart tools for smarter living</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
