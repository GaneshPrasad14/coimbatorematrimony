import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';
import { Button } from './ui/button';

// Global audio instance to persist across component re-mounts
let globalAudio: HTMLAudioElement | null = null;

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('musicPlaying') === 'true';
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Use global audio instance or create new one
    if (!globalAudio) {
      globalAudio = new Audio('/track.mpeg');
      globalAudio.loop = true;
      globalAudio.preload = 'auto';

      // Restore currentTime from localStorage
      const savedTime = localStorage.getItem('musicCurrentTime');
      if (savedTime) {
        globalAudio.currentTime = parseFloat(savedTime);
      }
    }

    // Set the ref to the global audio
    if (audioRef.current !== globalAudio) {
      audioRef.current = globalAudio;
    }

    const audio = globalAudio;

    const handleEnded = () => {
      setIsPlaying(false);
      localStorage.setItem('musicPlaying', 'false');
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem('musicPlaying', 'false');
      localStorage.setItem('musicCurrentTime', audio.currentTime.toString());
    };

    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem('musicPlaying', 'true');
    };

    const handleTimeUpdate = () => {
      localStorage.setItem('musicCurrentTime', audio.currentTime.toString());
    };

    // Add event listeners
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Restore playing state from localStorage
    const shouldBePlaying = localStorage.getItem('musicPlaying') === 'true';
    if (shouldBePlaying && audio.paused) {
      audio.play().catch(console.error);
    }

    return () => {
      // Don't remove listeners here as audio persists globally
      // Only remove them when the page unloads
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = globalAudio;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        localStorage.setItem('musicPlaying', 'false');
        setIsPlaying(false);
      } else {
        await audio.play();
        localStorage.setItem('musicPlaying', 'true');
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <Button
      onClick={togglePlayPause}
      variant="ghost"
      size="sm"
      className="fixed bottom-6 right-6 z-[60] bg-white hover:bg-gray-50 text-black border border-gray-300 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Pause className="w-5 h-5" />
      ) : (
        <Music className="w-5 h-5" />
      )}
    </Button>
  );
};

export default MusicPlayer;