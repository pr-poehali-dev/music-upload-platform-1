import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const mockArtists = [
  { id: 1, name: 'DJ Nova', genre: 'House', tracks: 45, followers: '12.5K', verified: true },
  { id: 2, name: 'Echo Sound', genre: 'Synthwave', tracks: 32, followers: '8.2K', verified: true },
  { id: 3, name: 'Wave Master', genre: 'EDM', tracks: 58, followers: '15.7K', verified: true },
  { id: 4, name: 'Soul Fusion', genre: 'Jazz', tracks: 28, followers: '5.3K', verified: false },
  { id: 5, name: 'Heavy Beats', genre: 'Dubstep', tracks: 41, followers: '20.1K', verified: true },
  { id: 6, name: 'String Theory', genre: 'Acoustic', tracks: 24, followers: '9.8K', verified: false },
];

export default function Artists() {
  return (
    <section className="container mx-auto px-4 py-12" id="artists">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Исполнители</h2>
        <p className="text-muted-foreground text-lg">Познакомьтесь с талантливыми артистами</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtists.map((artist, index) => (
          <Card 
            key={artist.id}
            className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:glow-red transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            itemScope
            itemType="https://schema.org/MusicGroup"
          >
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 ring-2 ring-primary/50 ring-offset-2 ring-offset-background">
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary">
                  {artist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl" itemProp="name">{artist.name}</h3>
                {artist.verified && (
                  <Icon name="BadgeCheck" className="w-5 h-5 text-primary" />
                )}
              </div>

              <Badge variant="outline" className="mb-4 border-primary/50">
                <span itemProp="genre">{artist.genre}</span>
              </Badge>
              <meta itemProp="url" content={`https://dm-studio-production.ru/#artists/${artist.id}`} />

              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Icon name="Music" className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-lg">{artist.tracks}</p>
                  <p className="text-xs text-muted-foreground">треков</p>
                </div>

                <div className="bg-background/50 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Icon name="Users" className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-lg">{artist.followers}</p>
                  <p className="text-xs text-muted-foreground">подписчиков</p>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <Button className="flex-1 glow-red" size="sm">
                  <Icon name="Play" className="w-4 h-4 mr-2" />
                  Слушать
                </Button>
                <Button variant="outline" size="sm" className="border-primary/50">
                  <Icon name="Heart" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" variant="outline" className="border-primary/50 hover:glow-red">
          <Icon name="UserPlus" className="w-5 h-5 mr-2" />
          Стать артистом
        </Button>
      </div>
    </section>
  );
}