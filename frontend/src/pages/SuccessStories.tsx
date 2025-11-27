import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      couple: "Sarah & Michael",
      age: "34 & 36",
      location: "New York, NY",
      story: "We both had busy careers and thought finding love after 30 was impossible. coimbatore matrimony proved us wrong! We connected over our shared love for travel and within 6 months, we knew we were meant to be together.",
      matchDate: "Matched: January 2024",
      weddingDate: "Married: July 2024",
    },
    {
      id: 2,
      couple: "Priya & Rajesh",
      age: "35 & 38",
      location: "San Francisco, CA",
      story: "After years of focusing on our careers, we were ready for a serious relationship. The platform's verification process gave us confidence, and we found each other! Our families couldn't be happier.",
      matchDate: "Matched: March 2024",
      weddingDate: "Engaged: September 2024",
    },
    {
      id: 3,
      couple: "Emma & David",
      age: "33 & 37",
      location: "Chicago, IL",
      story: "As a single parent, I was hesitant about dating again. David was understanding and patient. coimbatore matrimony's community helped us build a strong foundation based on trust and respect.",
      matchDate: "Matched: February 2024",
      weddingDate: "Married: August 2024",
    },
    {
      id: 4,
      couple: "Lisa & James",
      age: "31 & 35",
      location: "Los Angeles, CA",
      story: "We were both tired of casual dating apps. Finding coimbatore matrimony was a blessing! Everyone here is serious about finding a life partner, and that made all the difference.",
      matchDate: "Matched: April 2024",
      weddingDate: "Planning Wedding: 2025",
    },
    {
      id: 5,
      couple: "Anita & Marcus",
      age: "36 & 39",
      location: "Houston, TX",
      story: "The compatibility matching system was spot on! We aligned on values, life goals, and even our quirky hobbies. We're grateful to coimbatore matrimony for bringing us together.",
      matchDate: "Matched: May 2024",
      weddingDate: "Married: October 2024",
    },
    {
      id: 6,
      couple: "Nina & Alex",
      age: "32 & 34",
      location: "Seattle, WA",
      story: "We appreciate that everyone on this platform is mature and ready for commitment. Our relationship moved naturally from chatting to dating to getting engaged. Thank you, coimbatore matrimony!",
      matchDate: "Matched: June 2024",
      weddingDate: "Engaged: November 2024",
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
              Love <span className="text-gradient-gold">Success Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real couples who found their perfect match through coimbatore matrimony
            </p>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="text-center p-6 rounded-2xl glass-effect animate-scale-in">
              <div className="font-luxury text-4xl font-bold text-gradient-gold mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Successful Matches</div>
            </div>
            <div className="text-center p-6 rounded-2xl glass-effect animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="font-luxury text-4xl font-bold text-gradient-gold mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center p-6 rounded-2xl glass-effect animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="font-luxury text-4xl font-bold text-gradient-gold mb-2">6 months</div>
              <div className="text-sm text-muted-foreground">Average Time to Match</div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <Card
                key={story.id}
                className="overflow-hidden border-border hover:border-gold/50 hover:shadow-gold transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Couple Photo Placeholder */}
                <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <div className="text-7xl">💑</div>
                  <div className="absolute top-4 right-4 bg-gold/90 text-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    Just Married
                  </div>
                </div>

                <CardContent className="p-8 space-y-4">
                  {/* Couple Info */}
                  <div>
                    <h3 className="font-luxury text-2xl font-bold text-gradient-gold mb-2">
                      {story.couple}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>Ages: {story.age}</span>
                      <span>•</span>
                      <span>{story.location}</span>
                    </div>
                  </div>

                  {/* Story */}
                  <div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      {story.story}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="pt-4 border-t border-border space-y-1">
                    <p className="text-sm text-muted-foreground">{story.matchDate}</p>
                    <p className="text-sm font-semibold text-gold">{story.weddingDate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-12 rounded-2xl glass-effect max-w-3xl mx-auto animate-fade-in">
            <h2 className="font-luxury text-3xl font-bold mb-4">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of members who found their perfect match with coimbatore matrimony
            </p>
            <button className="px-8 py-4 gradient-gold text-foreground font-semibold rounded-lg shadow-gold hover:scale-105 transition-smooth">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;
