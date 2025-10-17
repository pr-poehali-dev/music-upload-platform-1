import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import AudioWaveform from '@/components/AudioWaveform';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
}

interface AudioPlayerProps {
  track: Track | null;
  onClose: () => void;
}

export default function AudioPlayer({ track, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isFavorite, setIsFavorite] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (!track || !audioRef.current) return;
    
    setIsPlaying(true);
    setCurrentTime(0);
    audioRef.current.load();
    audioRef.current.play().catch(() => setIsPlaying(false));
  }, [track]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      if (isPlaying) {
        const level = Math.random() * 0.5 + 0.5;
        setAudioLevel(level);
      }
    }
  }, [isPlaying]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((value: number[]) => {
    if (audioRef.current && !isNaN(value[0])) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAudioLevel(0);
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setAudioLevel(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying]);

  const formatTime = useMemo(() => {
    return (time: number) => {
      if (isNaN(time)) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
  }, []);

  if (!track) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <Card className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-primary/30 glow-red animate-slide-up">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-gradient-to-br from-primary to-secondary items-center justify-center flex-shrink-0 glow-red relative overflow-hidden group">
              <div 
                className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent transition-all duration-200"
                style={{ 
                  transform: `translateY(${100 - (audioLevel * 100)}%)`,
                  opacity: isPlaying ? 1 : 0
                }}
              />
              <Icon 
                name="Music" 
                className="w-6 h-6 lg:w-8 lg:h-8 relative z-10 transition-transform duration-200" 
                style={{ 
                  transform: isPlaying ? `scale(${1 + audioLevel * 0.2})` : 'scale(1)'
                }}
              />
              {isPlaying && (
                <div className="absolute inset-0 animate-pulse-glow" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-base md:text-lg truncate">{track.title}</h4>
              <p className="text-xs md:text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <Button 
                size="icon" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full glow-red"
                onClick={togglePlay}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>

            <div className="hidden lg:flex items-center gap-2 w-32 xl:w-40">
              <Icon name="Volume2" className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={5}
                className="flex-1"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary/20 h-8 w-8 md:h-10 md:w-10"
                onClick={toggleFavorite}
              >
                <Icon 
                  name="Heart" 
                  className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? 'fill-primary text-primary' : ''}`} 
                />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={onClose} 
                className="hover:bg-primary/20 h-8 w-8 md:h-10 md:w-10"
              >
                <Icon name="X" className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-2 md:mt-3 space-y-2">
            <div className="hidden md:block">
              <AudioWaveform 
                isPlaying={isPlaying} 
                currentTime={currentTime} 
                duration={duration} 
              />
            </div>
            <Slider
              value={[currentTime]}
              onValueChange={handleSeek}
              max={duration || 100}
              step={0.5}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </Card>
    </>
  );
}