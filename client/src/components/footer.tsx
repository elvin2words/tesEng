import { Zap, Linkedin, Twitter, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import SmartLink from "@/components/SmartLink"; 

export default function Footer() {
  return (
    <footer className="bg-solar-gray dark:bg-gray-950 text-white py-12 sm:py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 text-center sm:text-left mb-12">
          {/* Company Info */}
          <div className="animate-fade-in-up">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-4 flex items-center justify-center sm:justify-start">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-solar-orange" />
              TES Engineering
            </div>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              Engineering tomorrow's energy solutions across Africa.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              {[Linkedin, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-solar-orange rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-semibold mb-4 text-solar-orange">Services</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                ["Residential Solar", "/residential"],
                ["Commercial Solar", "/commercial"],
                ["Industrial Solutions", "/industrial"],
                ["Mining Systems", "/mining"],
                ["Agricultural Power", "/agricultural"],
                ["Find Installers", "/installers"],
              ].map(([label, link], i) => (
                <li key={i}>
                  <SmartLink to={link} className="text-gray-300 hover:text-white transition-colors">{label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg font-semibold mb-4 text-solar-orange">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                ["Home", "/"],
                ["About Us", "/#about"],
                ["Projects", "/#projects"],
                ["SmartTES Tool", "/sizing-tool"],
                ["Contact", "/#contact"],
                ["Blog", "#"]
              ].map(([label, link], i) => (
                <li key={i}>
                  <SmartLink to={link} className="text-gray-300 hover:text-white transition-colors">{label}</SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-lg font-semibold mb-4 text-solar-orange">Resources</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                "Case Studies",
                "Technical Documentation",
                "Industry Reports",
                "FAQs",
                "Support Center",
                "Blog"
              ].map((item, i) => (
                <li key={i}>
                  <SmartLink to="#" className="text-gray-300 hover:text-solar-orange transition-colors">{item}</SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 dark:border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} TES Engineering. All rights reserved.
            </p>
            <p className="text-gray-300 text-xs sm:text-sm">
              Made by{" "}
              <a href="https://iqal.co.zw/" className="text-blue-400 hover:text-blue-300 font-medium">IQAL Inc.</a>{" "}
              at{" "}
              <a href="https://instagram.com/young_mazwi" className="text-blue-400 hover:text-blue-300 font-medium">youngmazwi</a>
            </p>
            <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-6 text-xs sm:text-sm">
              <SmartLink to="#" className="text-gray-300 hover:text-solar-orange transition-colors">Privacy Policy</SmartLink>
              <SmartLink to="#" className="text-gray-300 hover:text-solar-orange transition-colors">Terms of Service</SmartLink>
              <SmartLink to="#" className="text-gray-300 hover:text-solar-orange transition-colors">Cookie Policy</SmartLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
