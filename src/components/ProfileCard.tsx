import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';

interface ProfileCardProps {
  profile: {
    id: string; // MongoDB _id
    name: string;
    age: number;
    location: string;
    occupation: string;
    image: string;
    bio: string;
  };
  index: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));

  const handleCardClick = () => {
    navigate(`/profile/${profile.id}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      data-cursor="card"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-2xl">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-luxury text-xl font-bold mb-2">{profile.name}</h3>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{profile.occupation}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {profile.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;