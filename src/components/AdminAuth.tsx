import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const ADMIN_PASSWORD = 'dm2024';

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('dm-studio-admin', 'true');
      onAuthenticated();
      toast({
        title: 'Добро пожаловать!',
        description: 'Вход выполнен успешно',
      });
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный пароль',
        variant: 'destructive',
      });
      setPassword('');
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-gradient-to-br from-card to-card/50 border-primary/20 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
            <Icon name="Lock" className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-glow">Вход для администратора</h2>
          <p className="text-muted-foreground">Введите пароль для загрузки музыки</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
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

          <Button type="submit" className="w-full glow-red">
            <Icon name="LogIn" className="w-5 h-5 mr-2" />
            Войти
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-primary/10">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Icon name="Info" className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Только администраторы могут загружать музыку на платформу</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
