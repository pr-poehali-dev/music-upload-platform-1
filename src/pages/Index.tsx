import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const tracks = [
    {
      id: 1,
      title: 'Neon Dreams',
      artist: 'DM Producer',
      duration: '3:45',
      genre: 'Electronic',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    },
    {
      id: 2,
      title: 'Red Pulse',
      artist: 'Studio Mix',
      duration: '4:12',
      genre: 'House',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    },
    {
      id: 3,
      title: 'Dark Beat',
      artist: 'DM Collective',
      duration: '3:28',
      genre: 'Techno',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    },
    {
      id: 4,
      title: 'Sound Wave',
      artist: 'DM Studio',
      duration: '5:01',
      genre: 'Ambient',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    },
    {
      id: 5,
      title: 'Bass Drop',
      artist: 'DM Beats',
      duration: '3:33',
      genre: 'Dubstep',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    },
    {
      id: 6,
      title: 'Synth City',
      artist: 'DM Producer',
      duration: '4:20',
      genre: 'Synthwave',
      cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg'
    }
  ];

  const playlists = [
    { id: 1, name: 'Лучшие хиты', tracks: 24, cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg' },
    { id: 2, name: 'Вечерний чилл', tracks: 18, cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg' },
    { id: 3, name: 'Танцпол', tracks: 32, cover: 'https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg' }
  ];

  const artists = [
    { id: 1, name: 'DM Producer', tracks: 45, followers: '12.5K' },
    { id: 2, name: 'Studio Mix', tracks: 32, followers: '8.2K' },
    { id: 3, name: 'DM Collective', tracks: 28, followers: '15.1K' },
    { id: 4, name: 'DM Beats', tracks: 39, followers: '10.8K' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                <Icon name="Music" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                DM-STUDIO
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['Главная', 'Треки', 'Плейлисты', 'Исполнители', 'Загрузить', 'О студии', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className="text-sm font-medium text-gray-300 hover:text-red-500 transition-colors relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold glow-red">
              <Icon name="Upload" size={18} className="mr-2" />
              Загрузить трек
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 blur-3xl opacity-50 animate-pulse-glow" />
            <img 
              src="https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg" 
              alt="DM Studio Logo" 
              className="relative w-64 h-64 mx-auto object-contain"
            />
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Музыка без границ
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Загружайте, слушайте и делитесь треками на самой яркой музыкальной платформе
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold glow-red text-lg px-8">
              <Icon name="Play" size={20} className="mr-2" />
              Слушать сейчас
            </Button>
            <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10 text-lg px-8">
              <Icon name="Upload" size={20} className="mr-2" />
              Загрузить трек
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card border border-white/10 mb-12">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500">
                Треки
              </TabsTrigger>
              <TabsTrigger value="playlists" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500">
                Плейлисты
              </TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500">
                Исполнители
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracks">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-white">Популярные треки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tracks.map((track, index) => (
                    <Card 
                      key={track.id} 
                      className="bg-card border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden group hover:glow-red cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={track.cover} 
                          alt={track.title} 
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <Button 
                          size="icon" 
                          className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 rounded-full w-12 h-12 glow-red opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="Play" size={20} />
                        </Button>
                      </div>
                      
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-white mb-1">{track.title}</h4>
                        <p className="text-sm text-gray-400 mb-3">{track.artist}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Music" size={14} />
                            {track.genre}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {track.duration}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="playlists">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-white">Популярные плейлисты</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {playlists.map((playlist) => (
                    <Card 
                      key={playlist.id} 
                      className="bg-card border-white/10 hover:border-pink-500/50 transition-all duration-300 overflow-hidden group hover:glow-pink cursor-pointer"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={playlist.cover} 
                          alt={playlist.name} 
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-xl font-bold text-white mb-1">{playlist.name}</h4>
                          <p className="text-sm text-gray-300">{playlist.tracks} треков</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="artists">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-6 text-white">Популярные исполнители</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {artists.map((artist) => (
                    <Card 
                      key={artist.id} 
                      className="bg-card border-white/10 hover:border-red-500/50 transition-all duration-300 p-6 text-center group hover:glow-red cursor-pointer"
                    >
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center glow-red">
                        <Icon name="User" size={40} className="text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{artist.name}</h4>
                      <p className="text-sm text-gray-400 mb-1">{artist.tracks} треков</p>
                      <p className="text-xs text-gray-500">{artist.followers} подписчиков</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-black to-red-950/20">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-card border-red-500/30 p-8 glow-red">
            <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Загрузить свой трек
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Название трека</label>
                <Input 
                  placeholder="Введите название..." 
                  className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Исполнитель</label>
                <Input 
                  placeholder="Имя исполнителя..." 
                  className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Жанр</label>
                <Input 
                  placeholder="Например: Electronic, House..." 
                  className="bg-black/50 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-red-500/50 transition-colors cursor-pointer">
                <Icon name="Upload" size={48} className="mx-auto mb-4 text-red-500" />
                <p className="text-gray-300 mb-2">Перетащите файл сюда или нажмите для выбора</p>
                <p className="text-sm text-gray-500">MP3, WAV, FLAC до 100MB</p>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-6 text-lg glow-red">
                <Icon name="Upload" size={20} className="mr-2" />
                Загрузить трек
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            О DM-STUDIO
          </h3>
          
          <Card className="bg-card border-white/10 p-8 mb-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                DM-STUDIO — это современная платформа для музыкантов, продюсеров и любителей электронной музыки. 
                Мы создали пространство, где каждый может делиться своим творчеством и находить вдохновение.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-black/50 rounded-lg border border-white/10">
                  <div className="text-4xl font-bold text-red-500 mb-2">10K+</div>
                  <div className="text-sm text-gray-400">Треков загружено</div>
                </div>
                <div className="text-center p-6 bg-black/50 rounded-lg border border-white/10">
                  <div className="text-4xl font-bold text-pink-500 mb-2">5K+</div>
                  <div className="text-sm text-gray-400">Активных артистов</div>
                </div>
                <div className="text-center p-6 bg-black/50 rounded-lg border border-white/10">
                  <div className="text-4xl font-bold text-red-500 mb-2">50K+</div>
                  <div className="text-sm text-gray-400">Слушателей</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-t from-black to-transparent">
        <div className="container mx-auto max-w-2xl">
          <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Контакты
          </h3>
          
          <Card className="bg-card border-white/10 p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center glow-red">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-medium">contact@dm-studio.music</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center glow-pink">
                  <Icon name="Phone" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Телефон</div>
                  <div className="text-white font-medium">+7 (999) 123-45-67</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center glow-red">
                  <Icon name="MapPin" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Адрес</div>
                  <div className="text-white font-medium">Москва, Россия</div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <div className="flex gap-4 justify-center">
                  {['Instagram', 'Facebook', 'Youtube', 'Twitter'].map((social) => (
                    <Button 
                      key={social}
                      size="icon" 
                      className="bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full w-12 h-12 glow-red"
                    >
                      <Icon name={social as any} size={20} />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">
            © 2024 DM-STUDIO. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
