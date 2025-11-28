import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
              Cookie <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn about how we use cookies to improve your experience on our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* What Are Cookies */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in">
              <h2 className="font-luxury text-2xl font-bold mb-4">What Are Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                They allow us to remember your preferences and improve your browsing experience.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">How We Use Cookies</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">Required for the website to function properly. These cannot be disabled.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground">Help us understand how visitors interact with our website by collecting anonymous information.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                  <p className="text-muted-foreground">Remember your preferences and settings to enhance your experience.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground">Used to deliver relevant advertisements and track campaign effectiveness.</p>
                </div>
              </div>
            </section>

            {/* Types of Cookies We Use */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-gold pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Session Cookies</h3>
                  <p className="text-muted-foreground">Temporary cookies that expire when you close your browser.</p>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Persistent Cookies</h3>
                  <p className="text-muted-foreground">Remain on your device for a set period or until you delete them.</p>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <h3 className="font-semibold text-foreground mb-2">First-party Cookies</h3>
                  <p className="text-muted-foreground">Set directly by our website.</p>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <h3 className="font-semibold text-foreground mb-2">Third-party Cookies</h3>
                  <p className="text-muted-foreground">Set by third-party services we use, such as analytics providers.</p>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can control and manage cookies in various ways:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Most web browsers allow you to control cookies through their settings</li>
                <li>• You can delete all cookies that are already on your computer</li>
                <li>• You can set most browsers to prevent cookies from being placed</li>
                <li>• Note that disabling cookies may affect the functionality of our website</li>
              </ul>
            </section>

            {/* Cookie Consent */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Cookie Consent</h2>
              <p className="text-muted-foreground leading-relaxed">
                By using our website, you consent to the use of cookies in accordance with this Cookie Policy.
                If you do not agree to the use of cookies, you should adjust your browser settings accordingly
                or refrain from using our website.
              </p>
            </section>

            {/* Updates to This Policy */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational,
                legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.
              </p>
            </section>

            {/* Contact Us */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-muted-foreground">Email: cmatrimony.in@gmail.com</p>
                <p className="text-muted-foreground">Phone: +91 9092188796</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;