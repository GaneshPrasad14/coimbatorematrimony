import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useRegistration } from "../contexts/RegistrationContext";

const About = () => {
  const { openRegistrationModal } = useRegistration();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/au.jpg)` }}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="font-luxury text-4xl md:text-6xl font-bold mb-6 text-white">
                About <span className="text-gradient-gold">coimbatore matrimony</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                A dedicated platform created for individuals who believe that meaningful
                relationships can begin at any age
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="font-luxury text-3xl md:text-4xl font-bold mb-4">
                  Our Mission
                </h2>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  coimbatore matrimony is built on the foundation that love, companionship, and meaningful
                  relationships are not bound by age. We understand that individuals aged 18 and above
                  have unique needs, expectations, and life experiences that deserve a specialized
                  platform dedicated to their journey toward finding a life partner.
                </p>

                <p className="text-lg leading-relaxed">
                  We focus on trust, emotional connection, genuine intentions, and secure matchmaking
                  for all members aged 18 and above. Our platform combines cutting-edge technology
                  with personalized service to ensure that every member receives the attention and
                  support they deserve in their search for a compatible partner.
                </p>

                <p className="text-lg leading-relaxed">
                  What sets us apart is our commitment to quality over quantity. Every profile on 
                  our platform is manually verified, ensuring that you connect with genuine individuals 
                  who share your values and are serious about finding a meaningful relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-luxury text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center p-8 rounded-2xl glass-effect animate-scale-in">
                <h3 className="font-luxury text-xl font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your personal information is protected with industry-leading security
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl glass-effect animate-scale-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="font-luxury text-xl font-semibold mb-2">Genuine Connections</h3>
                <p className="text-sm text-muted-foreground">
                  We foster authentic relationships based on shared values and goals
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl glass-effect animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <h3 className="font-luxury text-xl font-semibold mb-2">Quality Members</h3>
                <p className="text-sm text-muted-foreground">
                  Every profile is verified to ensure authentic and serious members
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl glass-effect animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <h3 className="font-luxury text-xl font-semibold mb-2">Premium Service</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized support and guidance throughout your journey
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-luxury text-3xl md:text-4xl font-bold mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of members who have found their perfect match with coimbatore matrimony
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openRegistrationModal}
                  className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:scale-105 transition-smooth"
                >
                  Register Now
                </button>
                <Link to="/contact">
                  <button className="px-8 py-4 border-2 border-primary text-foreground font-semibold rounded-lg hover:bg-primary/10 transition-smooth">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
