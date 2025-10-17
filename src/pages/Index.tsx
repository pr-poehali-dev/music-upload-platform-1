import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { startAmbientMusic, stopAmbientMusic, isAmbientMusicPlaying } from '@/utils/ambientMusic';
import Hero from '@/components/sections/Hero';
import Tracks from '@/components/sections/Tracks';
import Upload from '@/components/sections/Upload';
import Playlists from '@/components/sections/Playlists';
import Artists from '@/components/sections/Artists';
import About from '@/components/sections/About';
import Contacts from '@/components/sections/Contacts';
import MyPurchases from '@/components/sections/MyPurchases';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    // Запустить фоновую музыку при загрузке страницы
    const timer = setTimeout(() => {
      startAmbientMusic();
      setIsMusicPlaying(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      stopAmbientMusic();
    };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      startAmbientMusic();
      setIsMusicPlaying(true);
    }
  };

  const menuItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'tracks', label: 'Треки', icon: 'Music' },
    { id: 'purchases', label: 'Мои покупки', icon: 'ShoppingBag' },
    { id: 'playlists', label: 'Плейлисты', icon: 'ListMusic' },
    { id: 'artists', label: 'Исполнители', icon: 'Mic2' },
    { id: 'upload', label: 'Загрузить', icon: 'Upload' },
    { id: 'about', label: 'О студии', icon: 'Building2' },
    { id: 'contacts', label: 'Контакты', icon: 'Mail' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'tracks':
        return <Tracks />;
      case 'purchases':
        return <MyPurchases />;
      case 'upload':
        return <Upload />;
      case 'playlists':
        return <Playlists />;
      case 'artists':
        return <Artists />;
      case 'about':
        return <About />;
      case 'contacts':
        return <Contacts />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pb-24">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg" 
                alt="DM STUDIO PRODUCTION" 
                className="w-12 h-12 rounded-full glow-red"
              />
              <h1 className="text-2xl font-bold text-glow hidden sm:block">DM STUDIO PRODUCTION</h1>
            </div>

            <div className="hidden md:flex gap-2 items-center">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(item.id)}
                  className={activeSection === item.id ? 'glow-red' : ''}
                >
                  <Icon name={item.icon as any} className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMusic}
                className="ml-2"
                title={isMusicPlaying ? 'Выключить музыку' : 'Включить музыку'}
              >
                <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMusic}
                title={isMusicPlaying ? 'Выключить музыку' : 'Включить музыку'}
              >
                <Icon name={isMusicPlaying ? 'Volume2' : 'VolumeX'} className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name={mobileMenuOpen ? 'X' : 'Menu'} className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-up">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <Icon name={item.icon as any} className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="pt-20">
        {renderSection()}
      </main>

      <footer className="bg-black/60 backdrop-blur-sm border-t border-primary/20 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">© 2024 DM STUDIO PRODUCTION. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}