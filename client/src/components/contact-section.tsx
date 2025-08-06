import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Check, MessageCircle, Bot, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { insertContactSubmissionSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { z } from "zod";
import { useState, useEffect } from "react";

// type ContactFormData = z.infer<typeof insertContactSubmissionSchema>;

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};


export default function ContactSection() {
  const [mapOpen, setMapOpen] = useState(false);
  
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   company: "",
  //   message: "",
  //   service: ""
  // });

  // Handle context from URL parameters (e.g., from industry pages)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const context = urlParams.get("context");
    if (context) {
      setFormData(prev => ({
        ...prev,
        message: `${context}\n\nI used SmartTES to assess my needs and would love expert guidance on implementation.`,
        service:
          context.includes("Residential") ? "residential" :
          context.includes("Commercial") ? "commercial" :
          context.includes("Industrial") ? "industrial" :
          context.includes("Mining") ? "mining" :
          context.includes("Agricultural") ? "agricultural" :
          ""
      }));
    }
  }, []);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  // const form = useForm<ContactFormData>({
  //   resolver: zodResolver(insertContactSubmissionSchema),
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     company: "",
  //     projectType: "",
  //     message: ""
  //   }
  // });

  const form = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      projectType: "",
      message: ""
    }
  });


  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! We will get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up">
            Empower Your Energy Future Today
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-in-left">
            From your very first solar setup to scaling clean energy across communities, TES partners with you to deliver intelligent, reliable, and sustainable power solutions that grow with your vision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 card-hover animate-slide-in-left">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                Send us a message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solar">Solar Installation</SelectItem>
                              <SelectItem value="storage">Battery Storage</SelectItem>
                              <SelectItem value="agritech">Agricultural Solar Systems</SelectItem>
                              <SelectItem value="industrial">Industrial Solutions</SelectItem>
                              <SelectItem value="mining">Mining & Power Backup</SelectItem>
                              <SelectItem value="consulting">Consulting & Engineering</SelectItem>
                              <SelectItem value="maintenance">Maintenance & Upgrades</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your energy project, location, or sizing results from SmartTES..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-solar-orange text-white py-4 font-semibold hover:bg-orange-600 transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>

              {/* Social / Contact Buttons Section */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://wa.me/263771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
                  aria-label="Contact on WhatsApp"
                >
                  <Bot className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="https://twitter.com/tesafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                  Twitter
                </a>
                <a
                  href="https://facebook.com/tesafrica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center items-center gap-2 bg-yellow-800 hover:bg-blue-800 text-white px-4 py-2 rounded-md shadow-md transition"
                  aria-label="Visit us on Facebook"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>


          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 card-hover animate-slide-in-right">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className="flex items-start w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2"
                  >
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-solar-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Headquarters</h4>
                      <p className="text-sm text-muted-foreground">
                        48 Kwame Nkrumah Ave, Harare, Zimbabwe
                        <br />
                        P.O. Box 2947
                      </p>
                    </div>
                  </button>

                  <a
                    href="tel:+263771234567"
                    className="flex items-start w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-solar-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Phone</h4>
                      <p className="text-sm text-muted-foreground">
                        +263 77 123 4567
                        <br />
                        +263 71 987 6543
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@tesengineering.co.zw"
                    className="flex items-start w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2"
                  >
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-solar-yellow" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-sm text-muted-foreground">
                        contact@tesengineering.co.zw
                        <br />
                        support@tesengineering.co.zw
                      </p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-blue-600 text-white animate-fade-in-up">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Schedule a Free Consultation</h3>
                <p className="mb-6 text-sm sm:text-base opacity-90">
                  Our team is ready to assist you with system design, ROI analysis, and custom energy plans based on your SmartTES results.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-3 text-yellow-300" />
                    <span>Engineering advisory</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-3 text-yellow-300" />
                    <span>Smart sizing verification</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-3 text-yellow-300" />
                    <span>Financing options explained</span>
                  </div>
                </div>
                {/* <Button className="bg-white text-gray-900 hover:bg-gray-100 transition-all">
                  Schedule Consultation
                </Button> */}

                {/* Contact buttons */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <a
                    href="https://wa.me/263771234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2 bg-orange-600 hover:bg-green-700 px-4 py-2 rounded-md shadow-md transition w-full"
                  >
                    {/* <Bot className="w-5 h-5" /> */}
                    Schedule Consultation
                  </a>
                  {/* <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start"> */}
                  <div className="flex flex-wrap sm:flex-row gap-2 w-full justify-center sm:justify-start">
                    <a
                      href="https://facebook.com/tesafrica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center sm:w-auto gap-2 bg-blue-700 hover:bg-blue-800 px-2 py-2 rounded-md shadow-md transition"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </a>
                    <a
                      href="https://instagram.com/tesafrica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center sm:w-auto gap-2 bg-pink-600 hover:bg-pink-700 px-2 py-2 rounded-md shadow-md transition"
                    >
                      <Instagram className="w-5 h-5" />
                      Instagram
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Simple Map Modal */}
      {mapOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setMapOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMapOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Close map"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            {/* Replace the iframe src with your preferred map embed */}
            <iframe
              title="TES Headquarters Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.823437261845!2d31.042243315292512!3d-17.827737146011115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931f5b89b6bbbc7%3A0x3d4edb5b1b448fa3!2s48%20Kwame%20Nkrumah%20Ave%2C%20Harare!5e0!3m2!1sen!2szw!4v1690166055819!5m2!1sen!2szw"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
