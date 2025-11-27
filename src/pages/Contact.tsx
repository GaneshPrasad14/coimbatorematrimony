import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-gradient-gold">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help you find your perfect match. Reach out to us for any queries or support
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl glass-effect animate-fade-in">
                <h2 className="font-luxury text-2xl font-bold mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground">support@30plusmatrimony.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+1 (800) MATCH-30</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 6PM EST</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">123 Love Street</p>
                    <p className="text-muted-foreground">Romance City, RC 12345</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp Support</h3>
                    <p className="text-muted-foreground">+1 (800) 555-0123</p>
                    <Button className="mt-2 bg-muted hover:bg-muted/80 text-foreground">
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="font-luxury text-xl font-bold mb-4">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-6">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" className="border-border" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="john.doe@example.com" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="How can we help you?" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us more about your query..."
                    rows={6}
                    className="border-border resize-none"
                  />
                </div>

                <Button className="w-full gradient-gold text-foreground font-semibold py-6 shadow-gold hover:scale-105 transition-smooth">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
