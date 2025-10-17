import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AdminSettings() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const savedPassword = localStorage.getItem('dm-studio-password');

    if (currentPassword !== savedPassword) {
      toast({
        title: 'Ошибка',
        description: 'Текущий пароль неверный',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: 'Слишком короткий пароль',
        description: 'Новый пароль должен содержать минимум 6 символов',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Пароли не совпадают',
        description: 'Проверьте правильность ввода нового пароля',
        variant: 'destructive',
      });
      return;
    }

    localStorage.setItem('dm-studio-password', newPassword);
    
    toast({
      title: 'Пароль изменён!',
      description: 'Новый пароль успешно сохранён',
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsOpen(false);
  };

  const handleResetData = () => {
    if (confirm('Вы уверены? Это удалит пароль и завершит сессию. Вам придётся создать новый пароль.')) {
      localStorage.removeItem('dm-studio-password');
      localStorage.removeItem('dm-studio-admin');
      toast({
        title: 'Данные сброшены',
        description: 'Страница будет перезагружена',
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 glow-red">
          <Icon name="Settings" className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Настройки администратора</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Управление паролем и доступом к загрузке музыки
          </p>

          <div className="space-y-3">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start border-primary/20">
                  <Icon name="KeyRound" className="w-4 h-4 mr-2" />
                  Изменить пароль
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Изменение пароля</DialogTitle>
                  <DialogDescription>
                    Введите текущий пароль и новый пароль для замены
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleChangePassword} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Текущий пароль</Label>
                    <Input
                      id="currentPassword"
                      type={showPasswords ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Введите текущий пароль"
                      className="bg-background border-primary/20"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Новый пароль</Label>
                    <Input
                      id="newPassword"
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Минимум 6 символов"
                      className="bg-background border-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                    <Input
                      id="confirmPassword"
                      type={showPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Повторите новый пароль"
                      className="bg-background border-primary/20"
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="text-xs"
                  >
                    <Icon name={showPasswords ? 'EyeOff' : 'Eye'} className="w-4 h-4 mr-2" />
                    {showPasswords ? 'Скрыть пароли' : 'Показать пароли'}
                  </Button>

                  <div className="flex gap-2 pt-2">
                    <Button type="submit" className="flex-1 glow-red">
                      <Icon name="Check" className="w-4 h-4 mr-2" />
                      Сохранить
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsOpen(false)}
                      className="border-primary/20"
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              onClick={handleResetData}
              className="w-full justify-start border-destructive/30 hover:bg-destructive/20 hover:border-destructive"
            >
              <Icon name="Trash2" className="w-4 h-4 mr-2" />
              Сбросить пароль
            </Button>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/10">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Icon name="Info" className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Пароль хранится локально в браузере. При сбросе вам нужно будет создать новый пароль.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
