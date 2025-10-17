import { useMemo } from 'react';

interface AudioWaveformProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

export default function AudioWaveform({ isPlaying, currentTime, duration }: AudioWaveformProps) {
  const bars = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
  
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="flex items-center justify-center gap-[2px] h-8 px-2">
      {bars.map((i) => {
        const isPast = i / bars.length <= progress;
        const delay = i * 0.05;
        const baseHeight = 20 + Math.sin(i * 0.5) * 15;
        
        return (
          <div
            key={i}
            className={`w-[2px] rounded-full transition-all duration-200 ${
              isPast 
                ? 'bg-primary' 
                : 'bg-muted-foreground/30'
            }`}
            style={{
              height: isPlaying 
                ? `${baseHeight + Math.sin(Date.now() / 200 + delay) * 10}%`
                : `${baseHeight * 0.6}%`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
