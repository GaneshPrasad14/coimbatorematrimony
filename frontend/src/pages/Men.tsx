import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileGrid from "../components/ProfileGrid";
import HeartPulse from "../components/HeartPulse";
import { useState, useEffect, useCallback } from "react";
import { useRegistration } from "../contexts/RegistrationContext";
import { api } from "../lib/api";

interface ApiProfile {
  _id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  occupation: string;
  images: string[];
  description: string;
}

interface DisplayProfile {
  id: string; // MongoDB _id
  name: string;
  age: number;
  location: string;
  occupation: string;
  image: string;
  bio: string;
}

const Men = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<DisplayProfile[]>([]);
  const { openRegistrationModal } = useRegistration();

  const fetchProfiles = useCallback(async () => {
    try {
      const response = await fetch(api.buildUrl('/api/profiles'));
      if (response.ok) {
        const data = await response.json();
        // Filter for male profiles and transform data structure
        const maleProfiles: DisplayProfile[] = data.data
          .filter((profile: ApiProfile) => profile.gender === 'male')
          .map((profile: ApiProfile) => ({
            id: profile._id, // Use MongoDB _id
            name: profile.name,
            age: profile.age,
            location: profile.location,
            occupation: profile.occupation,
            image: profile.images && profile.images.length > 0 ? profile.images[0] : '/g.jpg', // images are now base64 data URLs
            bio: profile.description
          }));
        setProfiles(maleProfiles);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

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
              style={{ backgroundImage: `url(/g.jpg)` }}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/30"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="text-center animate-fade-in">
              <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4 text-white">
                Groom Profiles
              </h1>
              <p className="text-lg text-white/90">
                Browse verified profiles of eligible bachelors aged 30+
              </p>
            </div>
          </div>
        </section>

        {/* Profiles Section */}
        <div className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <HeartPulse size={48} />
              </div>
            ) : (
              <ProfileGrid profiles={profiles} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Men;
