import { Zap, Linkedin, Twitter, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
 
export default function Footer() {
  return (
    // <footer className="bg-solar-gray dark:bg-gray-950 text-white py-12 sm:py-16 transition-colors duration-300">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
    //       {/* Company Info */}
    //       <div className="animate-fade-in-up">
    //         <div className="text-xl sm:text-2xl font-bold gradient-text mb-4 flex items-center">
    //           <Zap className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-solar-orange" />
    //           TES Engineering
    //         </div>
    //         <p className="text-gray-300 mb-6 text-sm sm:text-base">
    //           Engineering tomorrow's energy solutions across Africa.
    //         </p>
    //         <div className="flex space-x-4">
    //           <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-solar-orange rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110">
    //             <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
    //           </a>
    //           <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-solar-orange rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110">
    //             <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
    //           </a>
    //           <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-solar-orange rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110">
    //             <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
    //           </a>
    //           <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-solar-orange rounded-full flex items-center justify-center hover:bg-orange-600 transition-all transform hover:scale-110">
    //             <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
    //           </a>
    //         </div>
    //       </div>
          
    //       {/* Services */}
    //       {/* <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
    //         <h4 className="text-base sm:text-lg font-semibold mb-4">Services</h4>
    //         <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Solar Energy Systems</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Industrial Engineering</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Energy Storage</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Maintenance & Support</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Consulting Services</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Training Programs</a></li>
    //         </ul>
    //       </div> */}
    //       <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
    //         <h3 className="text-lg font-semibold mb-4 text-solar-orange">Services</h3>
    //         <ul className="space-y-2 text-sm sm:text-base">
    //           <li><a href="/residential" className="text-gray-300 hover:text-white transition-colors">Residential Solar</a></li>
    //           <li><a href="/commercial" className="text-gray-300 hover:text-white transition-colors">Commercial Solar</a></li>
    //           <li><a href="/industrial" className="text-gray-300 hover:text-white transition-colors">Industrial Solutions</a></li>
    //           <li><a href="/mining" className="text-gray-300 hover:text-white transition-colors">Mining Systems</a></li>
    //           <li><a href="/agricultural" className="text-gray-300 hover:text-white transition-colors">Agricultural Power</a></li>
    //           <li><a href="/installers" className="text-gray-300 hover:text-white transition-colors">Find Installers</a></li>
    //         </ul>
    //       </div>
          
    //       {/* Quick Links */}
    //       {/* <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
    //         <h4 className="text-base sm:text-lg font-semibold mb-4">Company</h4>
    //         <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
    //           <li><a href="#about" className="hover:text-solar-orange transition-colors">About Us</a></li>
    //           <li><a href="#projects" className="hover:text-solar-orange transition-colors">Our Projects</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Careers</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">News & Updates</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Sustainability</a></li>
    //           <li><a href="#contact" className="hover:text-solar-orange transition-colors">Contact</a></li>
    //         </ul>
    //       </div> */}
    //       <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
    //         <h3 className="text-lg font-semibold mb-4 text-solar-orange">Quick Links</h3>
    //         <ul className="space-y-2 text-sm sm:text-base">
    //           <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
    //           <li><a href="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
    //           <li><a href="/#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
    //           <li><a href="/sizing-tool" className="text-gray-300 hover:text-white transition-colors">SmartTES Tool</a></li>
    //           <li><a href="/#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
    //           <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
    //         </ul>
    //       </div>          
          
    //       <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
    //         <h4 className="text-base sm:text-lg font-semibold mb-4">Resources</h4>
    //         <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Case Studies</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Technical Documentation</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Industry Reports</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">FAQs</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Support Center</a></li>
    //           <li><a href="#" className="hover:text-solar-orange transition-colors">Blog</a></li>
    //         </ul>
    //       </div>

    //       {/* Contact Info */}
    //       {/* <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
    //         <h3 className="text-lg font-semibold mb-4 text-solar-orange">Contact Info</h3>
    //         <div className="space-y-4 text-sm sm:text-base">
    //           <div className="flex items-start space-x-3">
    //             <MapPin className="w-5 h-5 text-solar-orange mt-1 flex-shrink-0" />
    //             <div>
    //               <p className="text-gray-300">Harare, Zimbabwe</p>
    //               <p className="text-gray-400 text-sm">Serving across Africa</p>
    //             </div>
    //           </div>
    //           <div className="flex items-center space-x-3">
    //             <Phone className="w-5 h-5 text-solar-orange flex-shrink-0" />
    //             <a href="tel:+263123456789" className="text-gray-300 hover:text-white transition-colors">
    //               +263 123 456 789
    //             </a>
    //           </div>
    //           <div className="flex items-center space-x-3">
    //             <Mail className="w-5 h-5 text-solar-orange flex-shrink-0" />
    //             <a href="mailto:info@tesengineering.co.zw" className="text-gray-300 hover:text-white transition-colors">
    //               info@tesengineering.co.zw
    //             </a>
    //           </div>
    //         </div>
    //       </div> */}

    //     </div>
        
    //     <div className="border-t border-gray-600 dark:border-gray-700 pt-6 sm:pt-8">
    //       <div className="flex flex-col md:flex-row justify-between items-center">
    //         <p className="text-gray-300 text-xs sm:text-sm">
    //           &copy; {new Date().getFullYear()} TES Engineering. All rights reserved.
    //         </p>
    //         <p className="text-gray-300 text-xs sm:text-sm">
    //           Made by 
    //           <a href="https://iqalinc.co.zw/" 
    //             className="text-blue-400 hover:text-blue-300 transition-colors font-medium"> IQAL Inc. </a> at 
    //           <a href="https://instagram.com/young_mazwi" 
    //             className="text-blue-400 hover:text-blue-300 transition-colors font-medium"> youngmazwi </a>
    //         </p>
    //         <div className="flex space-x-4 sm:space-x-6 mt-4 md:mt-0 text-xs sm:text-sm">
    //           <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Privacy Policy</a>
    //           <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Terms of Service</a>
    //           <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Cookie Policy</a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
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
              <a href={link} className="text-gray-300 hover:text-white transition-colors">{label}</a>
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
              <a href={link} className="text-gray-300 hover:text-white transition-colors">{label}</a>
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
              <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">{item}</a>
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
          <a href="https://iqalinc.co.zw/" className="text-blue-400 hover:text-blue-300 font-medium">IQAL Inc.</a>{" "}
          at{" "}
          <a href="https://instagram.com/young_mazwi" className="text-blue-400 hover:text-blue-300 font-medium">youngmazwi</a>
        </p>
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-6 text-xs sm:text-sm">
          <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-solar-orange transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
}
