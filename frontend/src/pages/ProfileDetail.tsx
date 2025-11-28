import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ArrowLeft, MapPin, Briefcase, Calendar, Phone, Mail, Star } from 'lucide-react';
import { api } from '../lib/api';

interface Profile {
  _id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  images: string[];
  description: string;
  gender: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  dob?: string;
  contactNumber?: string;
  whatsappNumber?: string;
  salary?: string;
  company?: string;
  education?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  interests?: string[];
}

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSpotlightActive, setIsSpotlightActive] = useState(true);
  const [showSplitTransition, setShowSplitTransition] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(api.buildUrl(`/api/profiles/${id}`));
        if (response.ok) {
          const data = await response.json();
          setProfile(data.data);
        } else {
          console.error('Profile not found');
          navigate('/'); // Redirect to home if profile not found
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/'); // Redirect to home on error
      }
    };

    if (id) {
      fetchProfile();
    }

    // Spotlight animation sequence
    const timer1 = setTimeout(() => {
      setIsSpotlightActive(false);
    }, 1000);

    // Split transition sequence
    const timer2 = setTimeout(() => {
      setShowSplitTransition(false);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [id, navigate]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Split Screen Transition Overlay */}
      <AnimatePresence>
        {showSplitTransition && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Left Half */}
            <motion.div
              className="flex-1 bg-gradient-to-r from-primary to-primary/80"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Right Half */}
            <motion.div
              className="flex-1 bg-gradient-to-l from-accent to-accent/80"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Spotlight Overlay */}
        <AnimatePresence>
          {isSpotlightActive && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Spotlight effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-1">
          {/* Back Button */}
          <div className="container mx-auto px-4 py-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profiles
            </Button>
          </div>

          {/* Profile Content */}
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Profile Image Section */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={profile.images && profile.images.length > 0 ? profile.images[0] : '/gb.JPG'}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                </motion.div>

                {/* Profile Details Section */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {/* Name and Basic Info */}
                  <div>
                    <h1 className="font-luxury text-4xl md:text-5xl font-bold mb-4">
                      {profile.name}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        <span>{profile.occupation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About {profile.name.split(' ')[0]}</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{profile.description}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Age</p>
                          <p className="text-gray-600">{profile.age} years</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-600">{profile.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Occupation</p>
                          <p className="text-gray-600">{profile.occupation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Gender</p>
                          <p className="text-gray-600 capitalize">{profile.gender}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Date of Birth</p>
                          <p className="text-gray-600">{profile.dob ? new Date(profile.dob).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Company</p>
                          <p className="text-gray-600">{profile.company || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Salary</p>
                          <p className="text-gray-600">{profile.salary || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Education</p>
                          <p className="text-gray-600">{profile.education || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Address</p>
                          <p className="text-gray-600">{profile.address || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Father's Name</p>
                          <p className="text-gray-600">{profile.fatherName || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold">Mother's Name</p>
                          <p className="text-gray-600">{profile.motherName || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Images */}
                  {profile.images && profile.images.length > 1 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">More Photos</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {profile.images.slice(1).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${profile.name} ${index + 2}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interests */}
                  {profile.interests && profile.interests.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Interests & Hobbies</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => profile.contactNumber && window.open(`tel:${profile.contactNumber}`)}
                      disabled={!profile.contactNumber}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Now
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => profile.whatsappNumber && window.open(`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}`)}
                      disabled={!profile.whatsappNumber}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProfileDetail;