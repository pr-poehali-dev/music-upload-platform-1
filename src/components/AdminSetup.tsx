import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdminSetupProps {
  onSetupComplete: () => void;
}

export default function AdminSetup({ onSetupComplete }: AdminSetupProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: 'Слишком короткий пароль',
        description: 'Пароль должен содержать минимум 6 символов',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Пароли не совпадают',
        description: 'Проверьте правильность ввода',
        variant: 'destructive',
      });
      return;
    }

    localStorage.setItem('dm-studio-password', password);
    localStorage.setItem('dm-studio-admin', 'true');
    onSetupComplete();
    
    toast({
      title: 'Пароль установлен!',
      description: 'Теперь вы можете загружать музыку',
    });
  };

  return (
    <section className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-gradient-to-br from-card to-card/50 border-primary/20 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
            <Icon name="KeyRound" className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-glow">Создание админ-пароля</h2>
          <p className="text-muted-foreground">Установите пароль для доступа к загрузке музыки</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Новый пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                className="bg-background border-primary/20 pr-10"
                required
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                className="bg-background border-primary/20 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full glow-red">
              <Icon name="Check" className="w-5 h-5 mr-2" />
              Установить пароль
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-primary/10 space-y-3">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="ShieldCheck" className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
            <p>Пароль хранится локально в вашем браузере</p>
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="Info" className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Запомните пароль - восстановление невозможно. При утере нужно будет создать новый.</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
