import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ProfileCard from './ProfileCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface Profile {
  id: string; // MongoDB _id
  name: string;
  age: number;
  location: string;
  occupation: string;
  image: string;
  bio: string;
}

interface ProfileGridProps {
  profiles: Profile[];
}

const ProfileGrid: React.FC<ProfileGridProps> = ({ profiles }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const calculateDistance = (cardRect: DOMRect, mouseX: number, mouseY: number) => {
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
    );
    return distance;
  };

  const getMagnetEffect = (cardElement: HTMLElement, mouseX: number, mouseY: number) => {
    const rect = cardElement.getBoundingClientRect();
    const distance = calculateDistance(rect, mouseX, mouseY);
    const maxDistance = 200; // Maximum distance for magnet effect

    if (distance > maxDistance) return { x: 0, y: 0 };

    const strength = (maxDistance - distance) / maxDistance;
    const angle = Math.atan2(mouseY - (rect.top + rect.height / 2), mouseX - (rect.left + rect.width / 2));

    return {
      x: Math.cos(angle) * strength * 20,
      y: Math.sin(angle) * strength * 20,
    };
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {profiles.map((profile, index) => (
              <CarouselItem key={profile.id}>
                <div className="p-4">
                  <ProfileCard profile={profile} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 text-black" />
          <CarouselNext className="right-4 top-1/2 -translate-y-1/2 text-black" />
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            className="relative"
            animate={hoveredCard === profile.id ? {
              x: getMagnetEffect(
                document.querySelector(`[data-card-id="${profile.id}"]`) as HTMLElement,
                mousePosition.x,
                mousePosition.y
              ).x,
              y: getMagnetEffect(
                document.querySelector(`[data-card-id="${profile.id}"]`) as HTMLElement,
                mousePosition.x,
                mousePosition.y
              ).y,
            } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onHoverStart={() => setHoveredCard(profile.id)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <div data-card-id={profile.id}>
              <ProfileCard profile={profile} index={index} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileGrid;