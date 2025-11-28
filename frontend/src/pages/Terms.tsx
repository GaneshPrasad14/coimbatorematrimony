import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
              Terms of <span className="text-gradient-gold">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Acceptance of Terms */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in">
              <h2 className="font-luxury text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using coimbatore matrimony, you accept and agree to be bound by the terms and provision of this agreement.
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Use License */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software) on coimbatore matrimony's website for personal, non-commercial transitory viewing only.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="space-y-2 text-muted-foreground mt-4">
                <li>• Modify or copy the materials</li>
                <li>• Use the materials for any commercial purpose or for any public display</li>
                <li>• Attempt to decompile or reverse engineer any software contained on our platform</li>
                <li>• Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                <p>You are responsible for safeguarding the password and for all activities that occur under your account.</p>
                <p>You agree not to disclose your password to any third party.</p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use the service:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>• To submit false or misleading information</li>
                <li>• To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            {/* Content */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material.
                You are responsible for content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>
            </section>

            {/* Termination */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall coimbatore matrimony, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation,
                loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            {/* Contact Information */}
            <section className="p-8 rounded-2xl glass-effect animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <h2 className="font-luxury text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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

export default Terms;