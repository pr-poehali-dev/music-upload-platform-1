import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

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
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track && audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, track]);

  useEffect(() => {
    if (track) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!track) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <Card className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-primary/30 glow-red animate-slide-up">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex-shrink-0 glow-red" />

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg truncate">{track.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Icon name="SkipBack" className="w-5 h-5" />
              </Button>

              <Button 
                size="icon" 
                className="w-12 h-12 rounded-full glow-red"
                onClick={togglePlay}
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} className="w-6 h-6" />
              </Button>

              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Icon name="SkipForward" className="w-5 h-5" />
              </Button>
            </div>

            <div className="hidden lg:flex items-center gap-3 w-48">
              <Icon name="Volume2" className="w-5 h-5 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground min-w-24">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                <Icon name="Heart" className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={onClose} className="hover:bg-primary/20">
                <Icon name="X" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Slider
              value={[currentTime]}
              onValueChange={handleSeek}
              max={duration || 100}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
