import { useState } from "react";
import { Button } from "../components/ui/button";
import SplitLayoutReveal from "./SplitLayoutReveal";

const Hero = () => {
  const [showSplitLayout, setShowSplitLayout] = useState(false);

  const handleButtonClick = () => {
    setShowSplitLayout(true);
  };

  const handleSplitComplete = () => {
    setShowSplitLayout(false);
  };

  return (
    <>
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/h1.jpg)` }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">

            {/* Main Heading */}
            <h1 className="font-luxury text-5xl md:text-7xl font-bold leading-tight text-white">
              Because Love Has{" "}
              <span className="text-white">No Age</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Find Your Perfect Match After 30
            </p>
            <p className="text-lg text-white/90">
              Exclusive Matrimony Platform for Proud Singles aged 30 and above
            </p>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                className="bg-black text-white font-semibold text-lg px-8 py-6 hover:bg-gray-800 transition-smooth"
                onClick={handleButtonClick}
              >
                Find Your Match
              </Button>
            </div>
          </div>
        </div>
      </section>

      {showSplitLayout && (
        <SplitLayoutReveal onComplete={handleSplitComplete} />
      )}
    </>
  );
};

export default Hero;
