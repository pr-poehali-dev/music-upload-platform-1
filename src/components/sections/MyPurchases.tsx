import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { playPianoNote, pianoNotes } from '@/utils/sound';

interface Purchase {
  id: number;
  trackId: number;
  trackTitle: string;
  trackArtist: string;
  amount: number;
  paymentId: string;
  status: string;
  createdAt: string;
  paidAt: string;
}

export default function MyPurchases() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('user-email');
    if (savedEmail) {
      setEmail(savedEmail);
      loadPurchases(savedEmail);
    }
  }, []);

  const loadPurchases = async (userEmail: string) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://functions.poehali.dev/da42fd24-5606-4c45-a8ee-5cf21e4aa3c2?email=${encodeURIComponent(userEmail)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to load purchases');
      }

      const data = await response.json();
      setPurchases(data.purchases || []);
      
      if (data.count === 0) {
        toast({
          title: 'Покупки не найдены',
          description: 'У вас пока нет купленных треков',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить покупки. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playPianoNote(pianoNotes.G4);
    localStorage.setItem('user-email', email);
    loadPurchases(email);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = async (purchase: Purchase) => {
    playPianoNote(pianoNotes.B4);
    try {
      const savedEmail = localStorage.getItem('user-email');
      if (!savedEmail) {
        toast({
          title: 'Ошибка',
          description: 'Не найден email',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Подготовка ссылки...',
        description: 'Пожалуйста, подождите',
      });

      const response = await fetch(
        `https://functions.poehali.dev/be87f3fa-058b-4a96-a4d1-881c58d84d1c?email=${encodeURIComponent(savedEmail)}&track_id=${purchase.trackId}`
      );

      if (!response.ok) {
        throw new Error('Не удалось получить ссылку');
      }

      const data = await response.json();
      
      const link = document.createElement('a');
      link.href = data.downloadUrl;
      link.download = data.filename;
      link.target = '_blank';
      link.click();

      toast({
        title: 'Скачивание начато!',
        description: `${purchase.trackTitle} - ${purchase.trackArtist}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка скачивания',
        description: 'Попробуйте позже',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Мои покупки</h2>
          <p className="text-muted-foreground text-lg">
            Все ваши купленные треки в одном месте
          </p>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-br from-card to-card/50 border-primary/20">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Icon name="Mail" className="w-4 h-4" />
                Email, использованный при покупке
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background border-primary/20 flex-1"
                  required
                />
                <Button type="submit" className="glow-red" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Icon name="Search" className="w-4 h-4 mr-2" />
                      Найти
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Введите email, который использовали при оплате треков
              </p>
            </div>
          </form>
        </Card>

        {isLoading ? (
          <div className="text-center py-12">
            <Icon name="Loader2" className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground text-lg">Загрузка покупок...</p>
          </div>
        ) : purchases.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                Найдено покупок: <span className="font-bold text-foreground">{purchases.length}</span>
              </p>
            </div>

            {purchases.map((purchase, index) => (
              <Card
                key={purchase.id}
                className="p-4 bg-gradient-to-r from-card to-card/50 border-primary/20 hover:glow-red transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
                    <Icon name="Music" className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{purchase.trackTitle}</h3>
                    <p className="text-muted-foreground text-sm truncate">{purchase.trackArtist}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" className="w-3 h-3" />
                        {formatDate(purchase.paidAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="CreditCard" className="w-3 h-3" />
                        {purchase.amount} ₽
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="glow-red"
                      onClick={() => handleDownload(purchase)}
                    >
                      <Icon name="Download" className="w-4 h-4 mr-2" />
                      Скачать
                    </Button>
                    <div className="flex items-center px-2">
                      <Icon name="CheckCircle2" className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-12">
            <Icon name="ShoppingBag" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg mb-2">Покупки не найдены</p>
            <p className="text-sm text-muted-foreground">
              Проверьте правильность email или купите первый трек
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Mail" className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              Введите email для просмотра покупок
            </p>
          </div>
        )}

        {purchases.length > 0 && (
          <Card className="p-6 mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-start gap-4">
              <Icon name="Info" className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold">Информация о покупках:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Все треки доступны для скачивания без ограничений</li>
                  <li>• Ссылки на скачивание действительны бессрочно</li>
                  <li>• Формат: MP3 320 kbps высокого качества</li>
                  <li>• Для возврата средств напишите в поддержку в течение 14 дней</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}