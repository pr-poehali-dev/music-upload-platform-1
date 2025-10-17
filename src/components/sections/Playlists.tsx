import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const mockPlaylists = [
  { id: 1, name: 'Вечерний чилл', tracks: 24, duration: '1ч 45м', cover: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'Утренняя энергия', tracks: 18, duration: '1ч 12м', cover: 'from-orange-500 to-red-500' },
  { id: 3, name: 'Тренировка', tracks: 32, duration: '2ч 15м', cover: 'from-green-500 to-teal-500' },
  { id: 4, name: 'Фокус и работа', tracks: 28, duration: '2ч 5м', cover: 'from-blue-500 to-indigo-500' },
  { id: 5, name: 'Ночной драйв', tracks: 20, duration: '1ч 30м', cover: 'from-violet-500 to-purple-500' },
  { id: 6, name: 'Летние хиты', tracks: 40, duration: '2ч 50м', cover: 'from-yellow-500 to-orange-500' },
];

export default function Playlists() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Плейлисты</h2>
        <p className="text-muted-foreground text-lg">Подборки для любого настроения</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlaylists.map((playlist, index) => (
          <Card 
            key={playlist.id}
            className="group overflow-hidden bg-card border-primary/20 hover:glow-red transition-all cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`h-48 bg-gradient-to-br ${playlist.cover} relative`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" className="w-16 h-16 rounded-full glow-red">
                  <Icon name="Play" className="w-8 h-8" />
                </Button>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                  {playlist.tracks} треков
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-xl mb-2">{playlist.name}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" className="w-4 h-4" />
                  {playlist.duration}
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Icon name="Heart" className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Icon name="Share2" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" variant="outline" className="border-primary/50 hover:glow-red">
          <Icon name="Plus" className="w-5 h-5 mr-2" />
          Создать свой плейлист
        </Button>
      </div>
    </section>
  );
}
