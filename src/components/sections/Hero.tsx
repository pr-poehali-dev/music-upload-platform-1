import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { playPianoNote, pianoNotes } from '@/utils/sound';

export default function Hero() {
  const handleCardClick = (section: string, note: number) => {
    playPianoNote(note);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (note: number) => {
    playPianoNote(note);
  };

  return (
    <section className="container mx-auto px-4 py-20" itemScope itemType="https://schema.org/MusicGroup">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="relative mb-8 animate-fade-in">
          <img 
            src="https://cdn.poehali.dev/files/61c1df8e-9bf0-4e18-b18c-7481fb417ce7.jpeg" 
            alt="DM STUDIO PRODUCTION - Профессиональная музыкальная студия Дмитрия Минского" 
            className="w-64 h-64 rounded-full glow-red animate-pulse-glow mx-auto"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-full"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow animate-fade-in" itemProp="name">
          DM STUDIO PRODUCTION
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl animate-fade-in">
          Студия <span className="font-bold text-primary">Дмитрия Минского</span> — поэта-песенника с 30-летним стажем
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl animate-fade-in leading-relaxed">
          Если вы здесь, значит вам нравятся мои музыкальные проекты. Я рад каждому! 🎵
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="glow-red text-lg px-8 py-6"
            onClick={() => {
              handleButtonClick(pianoNotes.C5);
              document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Icon name="Play" className="w-5 h-5 mr-2" />
            Слушать треки
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-primary/50 hover:glow-red"
            onClick={() => handleButtonClick(pianoNotes.E4)}
          >
            <Icon name="Upload" className="w-5 h-5 mr-2" />
            Загрузить музыку
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full max-w-4xl">
          <div 
            className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:glow-red transition-all cursor-pointer"
            onClick={() => handleCardClick('tracks', pianoNotes.C4)}
          >
            <Icon name="Music" className="w-12 h-12 mb-4 mx-auto text-primary" />
            <h3 className="text-xl font-bold mb-2">Хиты DM-STUDIO</h3>
            <p className="text-muted-foreground">Огромная коллекция музыки разных жанров</p>
          </div>

          <div 
            className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 border border-secondary/20 hover:glow-pink transition-all cursor-pointer"
            onClick={() => handleCardClick('tracks', pianoNotes.E4)}
          >
            <Icon name="Calendar" className="w-12 h-12 mb-4 mx-auto text-secondary" />
            <h3 className="text-xl font-bold mb-2">Анонсы</h3>
            <p className="text-muted-foreground">Будущие релизы и предстоящие проекты</p>
          </div>

          <div 
            className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:glow-red transition-all cursor-pointer"
            onClick={() => handleCardClick('tracks', pianoNotes.G4)}
          >
            <Icon name="Sparkles" className="w-12 h-12 mb-4 mx-auto text-primary" />
            <h3 className="text-xl font-bold mb-2">Премьеры</h3>
            <p className="text-muted-foreground">Новые треки и эксклюзивные композиции</p>
          </div>
        </div>
      </div>
    </section>
  );
}