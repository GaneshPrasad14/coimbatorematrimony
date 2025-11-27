import { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";

const StatsCounter = () => {
  const [counts, setCounts] = useState({
    profiles: 0,
    matches: 0,
    members: 0,
    premium: 0,
  });
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const startCounterAnimation = () => {
    const targetCounts = {
      profiles: 50000,
      matches: 12500,
      members: 35000,
      premium: 8500,
    };

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        profiles: Math.floor(targetCounts.profiles * progress),
        matches: Math.floor(targetCounts.matches * progress),
        members: Math.floor(targetCounts.members * progress),
        premium: Math.floor(targetCounts.premium * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounts(targetCounts);
      }
    }, stepTime);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (statsVisible) {
      startCounterAnimation();
    }
  }, [statsVisible]);

  const stats = [
    {
      label: "Verified Profiles",
      value: counts.profiles.toLocaleString() + "+",
      color: "text-gold",
    },
    {
      label: "Successful Matches",
      value: counts.matches.toLocaleString() + "+",
      color: "text-primary",
    },
    {
      label: "Active Members",
      value: counts.members.toLocaleString() + "+",
      color: "text-gold",
    },
    {
      label: "Premium Members",
      value: counts.premium.toLocaleString() + "+",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a premium community of verified singles aged 30+ finding meaningful connections
          </p>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-8 rounded-2xl glass-effect hover:scale-105 transition-smooth ${
                statsVisible ? 'animate-bounce-in' : 'opacity-0 scale-95'
              }`}
              style={{
                animationDelay: statsVisible ? `${index * 0.1}s` : '0s',
                transition: 'all 0.6s ease-out'
              }}
            >
              <div className="font-luxury text-4xl font-bold mb-2 text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
