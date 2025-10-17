import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import AudioPlayer from '@/components/AudioPlayer';

const mockTracks = [
  { id: 1, title: 'Summer Vibes', artist: 'DJ Nova', genre: 'House', duration: '3:45', plays: '12.5K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Night Drive', artist: 'Echo Sound', genre: 'Synthwave', duration: '4:20', plays: '8.2K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Electric Dreams', artist: 'Wave Master', genre: 'EDM', duration: '5:10', plays: '15.7K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Midnight Jazz', artist: 'Soul Fusion', genre: 'Jazz', duration: '6:30', plays: '5.3K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Bass Drop', artist: 'Heavy Beats', genre: 'Dubstep', duration: '3:55', plays: '20.1K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'Acoustic Soul', artist: 'String Theory', genre: 'Acoustic', duration: '4:15', plays: '9.8K', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
];

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  plays: string;
  audioUrl: string;
}

export default function Tracks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const genres = ['all', 'House', 'Synthwave', 'EDM', 'Jazz', 'Dubstep', 'Acoustic'];

  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Треки</h2>
        <p className="text-muted-foreground text-lg">Слушайте лучшие треки от наших артистов</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Поиск по названию или артисту..." 
            className="pl-10 bg-card border-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {genres.map(genre => (
            <Button
              key={genre}
              variant={selectedGenre === genre ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGenre(genre)}
              className={selectedGenre === genre ? 'glow-red' : 'border-primary/20'}
            >
              {genre === 'all' ? 'Все жанры' : genre}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTracks.map((track, index) => (
          <Card 
            key={track.id} 
            className="p-4 bg-gradient-to-r from-card to-card/50 border-primary/20 hover:glow-red transition-all cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
                <Icon name="Music" className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{track.title}</h3>
                <p className="text-muted-foreground text-sm truncate">{track.artist}</p>
              </div>

              <div className="hidden md:block">
                <Badge variant="outline" className="border-primary/50">
                  {track.genre}
                </Badge>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" className="w-4 h-4" />
                {track.duration}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Play" className="w-4 h-4" />
                {track.plays}
              </div>

              <div className="flex gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-primary/20"
                  onClick={() => setCurrentTrack(track)}
                >
                  <Icon name="Play" className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                  <Icon name="Heart" className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-primary/20">
                  <Icon name="Download" className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Music" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Треки не найдены</p>
        </div>
      )}

      <AudioPlayer track={currentTrack} onClose={() => setCurrentTrack(null)} />
    </section>
  );
}