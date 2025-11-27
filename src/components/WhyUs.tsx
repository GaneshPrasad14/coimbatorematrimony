
import { useScrollAnimation } from "../hooks/use-scroll-animation";

const WhyUs = () => {
  const { elementRef: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  const features = [
    {
      title: "100% Privacy Protection",
      description: "Your personal information is completely secure with end-to-end encryption and strict privacy controls.",
    },
    {
      title: "Verified Genuine Profiles",
      description: "Every profile is manually verified to ensure authenticity and serious intent for marriage.",
    },
    {
      title: "Smart Compatibility Match",
      description: "Advanced AI algorithm matches you with compatible partners based on values, interests, and lifestyle.",
    },
    {
      title: "Exclusive 30+ Community",
      description: "Connect with mature, career-established individuals who value meaningful relationships.",
    },
    {
      title: "Premium Service Quality",
      description: "Dedicated relationship managers and personalized matchmaking support for premium members.",
    },
    {
      title: "Safe & Secure Platform",
      description: "Advanced security measures and fraud detection to ensure your safety throughout your journey.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient-gold">coimbatore matrimony?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our premium matrimony platform designed exclusively for ages 30 and above
          </p>
        </div>

        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl border border-border bg-card hover:border-gold/50 hover:shadow-gold transition-smooth ${
                featuresVisible ? 'animate-slide-in-up' : 'opacity-0 translate-y-10'
              }`}
              style={{
                animationDelay: featuresVisible ? `${index * 0.1}s` : '0s',
                transition: 'all 0.6s ease-out'
              }}
            >
              <h3 className="font-luxury text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
