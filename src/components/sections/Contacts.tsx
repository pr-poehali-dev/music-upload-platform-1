import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function Contacts() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Сообщение отправлено!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="container mx-auto px-4 py-12" id="contacts" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow" itemProp="name">Контакты</h2>
          <p className="text-muted-foreground text-lg">Свяжитесь с нами любым удобным способом</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:glow-red transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Mail" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground mb-2">Напишите нам на почту</p>
                  <a href="mailto:info@dm-studio.com" className="text-primary hover:underline" itemProp="email">
                    info@dm-studio.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-secondary/20 hover:glow-pink transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Phone" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Телефон</h3>
                  <p className="text-muted-foreground mb-2">Звоните в любое время</p>
                  <a href="tel:+79991234567" className="text-secondary hover:underline" itemProp="telephone">
                    +7 (999) 123-45-67
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:glow-red transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPin" className="w-6 h-6" />
                </div>
                <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <h3 className="font-bold text-lg mb-2">Адрес</h3>
                  <p className="text-muted-foreground mb-2">Посетите нашу студию</p>
                  <p className="text-foreground">
                    <span itemProp="addressLocality">г. Москва</span>, <span itemProp="streetAddress">ул. Музыкальная, д. 1</span>
                  </p>
                  <meta itemProp="addressCountry" content="RU" />
                </div>
              </div>
            </Card>
            <meta itemProp="name" content="DM STUDIO PRODUCTION" />
            <meta itemProp="description" content="Профессиональная музыкальная студия в Москве" />
            <link itemProp="url" href="https://dm-studio-production.ru" />

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button 
                size="lg" 
                className="glow-red w-full"
                onClick={() => window.open('https://t.me/dmstudioproduction', '_blank')}
              >
                <Icon name="Send" className="w-5 h-5 mr-2" />
                Telegram
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:glow-red w-full"
                onClick={() => window.location.href = 'mailto:info@dm-studio.com'}
              >
                <Icon name="Mail" className="w-5 h-5 mr-2" />
                Email
              </Button>
            </div>

            <div className="flex gap-4 justify-center pt-4">
              <Button size="icon" variant="outline" className="w-12 h-12 rounded-full border-primary/50 hover:glow-red">
                <Icon name="Instagram" className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="w-12 h-12 rounded-full border-primary/50 hover:glow-red">
                <Icon name="Youtube" className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="w-12 h-12 rounded-full border-primary/50 hover:glow-red">
                <Icon name="Facebook" className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="outline" className="w-12 h-12 rounded-full border-primary/50 hover:glow-red">
                <Icon name="Twitter" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20">
            <h3 className="text-2xl font-bold mb-6">Отправить сообщение</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Тема *</Label>
                <Input
                  id="subject"
                  placeholder="Тема сообщения"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Сообщение *</Label>
                <Textarea
                  id="message"
                  placeholder="Ваше сообщение..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background border-primary/20 min-h-32"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full glow-red">
                <Icon name="Send" className="w-5 h-5 mr-2" />
                Отправить
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}