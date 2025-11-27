import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
// import StatsCounter from "../components/StatsCounter";
import WhyUs from "../components/WhyUs";
import LiquidTransition from "../components/LiquidTransition";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LiquidTransition>
          {/* <StatsCounter /> */}
          <WhyUs />
        </LiquidTransition>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
