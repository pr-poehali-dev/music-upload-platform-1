import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { playPianoNote, pianoNotes } from '@/utils/sound';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  plays: string;
  audioUrl: string;
}

interface PaymentDialogProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete?: (trackId: number) => void;
}

export default function PaymentDialog({ track, isOpen, onClose, onPurchaseComplete }: PaymentDialogProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const price = 299;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!track) return;

    playPianoNote(pianoNotes.C5);
    setIsProcessing(true);

    toast({
      title: 'Переход к оплате...',
      description: 'Сейчас откроется страница ЮKassa',
    });

    setTimeout(() => {
      if (onPurchaseComplete && track) {
        onPurchaseComplete(track.id);
      }
      
      const paymentUrl = `https://yookassa.ru/integration/simplepay/payment?sum=${price}&targets=${encodeURIComponent(`Покупка трека: ${track.title} - ${track.artist}`)}&quickpay-form=shop&paymentType=&writer=seller&targets-hint=&default-sum=${price}&button-text=11&payment-type-choice=on&mail=on&fio=on&successURL=${encodeURIComponent(window.location.href)}`;
      
      window.open(paymentUrl, '_blank');
      
      setIsProcessing(false);
      
      toast({
        title: 'Трек куплен!',
        description: 'Теперь вы можете слушать и скачивать этот трек',
      });
      
      onClose();
      setEmail('');
    }, 1000);
  };

  if (!track) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CreditCard" className="w-5 h-5 text-primary" />
            Оплата скачивания
          </DialogTitle>
          <DialogDescription>
            Оплатите для скачивания трека в высоком качестве
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-red">
                <Icon name="Music" className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg truncate">{track.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" className="w-3 h-3" />
                    {track.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Tag" className="w-3 h-3" />
                    {track.genre}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-primary/10">
              <span className="text-sm text-muted-foreground">Формат</span>
              <span className="font-semibold">MP3 320kbps</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-primary/10">
              <span className="text-sm text-muted-foreground">Размер файла</span>
              <span className="font-semibold">~12 MB</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
              <span className="font-bold text-lg">Стоимость</span>
              <span className="font-bold text-2xl text-primary">{price} ₽</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email для чека</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-primary/20"
                required
              />
              <p className="text-xs text-muted-foreground">
                На этот email придёт чек об оплате
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button 
                type="submit" 
                className="w-full glow-red text-lg py-6"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Icon name="CreditCard" className="w-5 h-5 mr-2" />
                    Оплатить {price} ₽
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Icon name="ShieldCheck" className="w-4 h-4" />
                <span>Безопасная оплата через ЮKassa</span>
              </div>
            </div>
          </form>

          <div className="pt-4 border-t border-primary/10">
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icon name="Check" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Скачивание доступно сразу после оплаты</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icon name="Check" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Неограниченное количество скачиваний</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icon name="Check" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Возврат средств в течение 14 дней</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}