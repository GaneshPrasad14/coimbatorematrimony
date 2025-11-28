import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="text-gradient-gold">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and handle your personal information.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in">
              <h2 className="font-luxury text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At coimbatore matrimony, we are committed to protecting your privacy and ensuring the security of your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>Name, email address, phone number, date of birth, location, and profile information you provide.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <p>How you interact with our platform, including pages visited, features used, and time spent.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Device Information</h3>
                  <p>IP address, browser type, operating system, and device identifiers.</p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• To provide and maintain our matchmaking services</li>
                <li>• To communicate with you about your account and our services</li>
                <li>• To improve our platform and develop new features</li>
                <li>• To ensure platform security and prevent fraud</li>
                <li>• To comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• With your explicit consent</li>
                <li>• To comply with legal requirements</li>
                <li>• To protect our rights and prevent harm</li>
                <li>• With trusted service providers who assist our operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
              </p>
            </section>

            {/* Your Rights */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Access and review your personal information</li>
                <li>• Correct inaccurate or incomplete information</li>
                <li>• Request deletion of your personal information</li>
                <li>• Object to or restrict certain processing activities</li>
                <li>• Data portability</li>
              </ul>
            </section>

            {/* Contact Us */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-muted-foreground">Email: cmatrimony.in@gmail.com</p>
                <p className="text-muted-foreground">Phone: +91 90921 88796</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;