import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Membership = () => {
  const plans = [
    {
      name: "Gold",
      price: "$29",
      period: "/month",
      features: [
        "Profile Boost (3x visibility)",
        "Direct Chat with 50 profiles",
        "View Contact Details",
        "Horoscope Matching",
        "Priority Customer Support",
        "Profile Verification Badge",
      ],
      popular: false,
      gradient: "from-gold/20 to-gold-light/20",
    },
    {
      name: "Diamond",
      price: "$49",
      period: "/month",
      features: [
        "Everything in Gold, plus:",
        "Profile Boost (5x visibility)",
        "Direct Chat with Unlimited profiles",
        "Video Introduction Feature",
        "Dedicated Relationship Manager",
        "Featured Profile Status",
        "Advanced Compatibility Reports",
      ],
      popular: true,
      gradient: "from-primary/20 to-accent/20",
    },
    {
      name: "Elite",
      price: "$99",
      period: "/month",
      features: [
        "Everything in Diamond, plus:",
        "Profile Boost (10x visibility)",
        "Personalized Matchmaking Service",
        "Profile Photo Shoot Session",
        "Background Verification Service",
        "Exclusive Elite Events Access",
        "VIP Customer Support",
        "Success Coach Consultation",
      ],
      popular: false,
      gradient: "from-secondary/20 to-primary/20",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
              Premium <span className="text-gradient-gold">Membership Plans</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to enhance your journey towards finding your ideal life partner
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden border-2 ${
                  plan.popular ? "border-gold shadow-gold scale-105" : "border-border"
                } hover:scale-105 transition-smooth animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-gold text-foreground px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`text-center pt-8 pb-6 bg-gradient-to-br ${plan.gradient}`}>
                  <h3 className="font-luxury text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="font-luxury text-5xl font-bold text-gradient-gold">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "gradient-gold text-foreground shadow-gold"
                        : "bg-primary hover:bg-primary/90"
                    } font-semibold py-6`}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include 100% privacy protection and verified profiles
            </p>
            <p className="text-sm text-muted-foreground">
              Cancel anytime • Secure payment • Money-back guarantee
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;
