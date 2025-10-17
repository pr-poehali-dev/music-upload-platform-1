import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <section className="container mx-auto px-4 py-12" id="about" itemScope itemType="https://schema.org/MusicGroup">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow" itemProp="name">О студии</h2>
          <p className="text-muted-foreground text-lg">Профессиональная музыкальная платформа</p>
        </div>

        <div className="mb-12 animate-fade-in">
          <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/20">
            <div className="prose prose-invert max-w-none" itemProp="description">
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                <span className="text-primary font-bold text-2xl">DM STUDIO PRODUCTION</span> — это современная музыкальная платформа, 
                созданная для артистов и любителей музыки. Мы предоставляем инструменты для создания, 
                публикации и продвижения музыки.
              </p>
              
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                Наша миссия — дать каждому талантливому музыканту возможность быть услышанным. 
                Мы создаём пространство, где творчество встречается с технологиями, а артисты 
                находят свою аудиторию.
              </p>

              <p className="text-lg text-foreground/90 leading-relaxed">
                С момента основания мы помогли тысячам артистов поделиться своей музыкой с миром. 
                Присоединяйтесь к нашему музыкальному сообществу!
              </p>
            </div>
          </Card>
        </div>
        <div itemScope itemType="https://schema.org/Organization" style={{ display: 'none' }}>
          <span itemProp="name">DM STUDIO PRODUCTION</span>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="addressLocality" content="Москва" />
            <meta itemProp="addressCountry" content="RU" />
          </div>
          <link itemProp="url" href="https://dm-studio-production.ru" />
          <meta itemProp="description" content="Профессиональная музыкальная студия: аренда студии звукозаписи, запись треков, продажа битов и минусов, сведение и мастеринг" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover:glow-red transition-all">
            <Icon name="Target" className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">Наша миссия</h3>
            <p className="text-foreground/80">
              Создать доступную и удобную платформу для всех, кто любит музыку. 
              Объединить артистов и слушателей в единое сообщество.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20 hover:glow-pink transition-all">
            <Icon name="Eye" className="w-12 h-12 mb-4 text-secondary" />
            <h3 className="text-2xl font-bold mb-3">Наше видение</h3>
            <p className="text-foreground/80">
              Стать ведущей платформой для независимых артистов, где талант и качество 
              музыки ценятся выше всего остального.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-card/50 border border-primary/10 animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <p className="text-sm text-muted-foreground">Треков</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 border border-secondary/10 animate-fade-in">
            <div className="text-4xl font-bold text-secondary mb-2">50+</div>
            <p className="text-sm text-muted-foreground">Артистов</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 border border-primary/10 animate-fade-in">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <p className="text-sm text-muted-foreground">Плейлистов</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 border border-secondary/10 animate-fade-in">
            <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
            <p className="text-sm text-muted-foreground">Слушателей</p>
          </div>
        </div>
      </div>
    </section>
  );
}