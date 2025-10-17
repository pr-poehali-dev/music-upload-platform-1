import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Upload() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Трек загружен!',
      description: `"${formData.title}" успешно добавлен в библиотеку`,
    });

    setFormData({ title: '', artist: '', genre: '', description: '' });
    setSelectedFile(null);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Загрузить трек</h2>
          <p className="text-muted-foreground text-lg">Поделитесь своей музыкой с миром</p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-primary/20 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/60 hover:glow-red transition-all cursor-pointer bg-gradient-to-br from-primary/5 to-secondary/5">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" className="w-16 h-16 mx-auto mb-4 text-primary" />
                {selectedFile ? (
                  <div>
                    <p className="font-semibold text-lg mb-2">{selectedFile.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-lg mb-2">Перетащите файл сюда</p>
                    <p className="text-muted-foreground">или нажмите для выбора</p>
                    <p className="text-xs text-muted-foreground mt-2">MP3, WAV, FLAC до 100MB</p>
                  </div>
                )}
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название трека *</Label>
                <Input
                  id="title"
                  placeholder="Введите название"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist">Артист *</Label>
                <Input
                  id="artist"
                  placeholder="Имя артиста"
                  value={formData.artist}
                  onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                  className="bg-background border-primary/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Жанр *</Label>
              <Input
                id="genre"
                placeholder="Например: House, EDM, Jazz"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="bg-background border-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашем треке..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-background border-primary/20 min-h-32"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg" className="flex-1 glow-red">
                <Icon name="Upload" className="w-5 h-5 mr-2" />
                Загрузить трек
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={() => {
                  setFormData({ title: '', artist: '', genre: '', description: '' });
                  setSelectedFile(null);
                }}
                className="border-primary/20"
              >
                <Icon name="X" className="w-5 h-5 mr-2" />
                Очистить
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-card/50 border border-primary/10">
            <Icon name="Shield" className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Безопасно</h3>
            <p className="text-xs text-muted-foreground">Защита авторских прав</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-card/50 border border-secondary/10">
            <Icon name="Zap" className="w-8 h-8 mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold mb-1">Быстро</h3>
            <p className="text-xs text-muted-foreground">Мгновенная публикация</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-card/50 border border-primary/10">
            <Icon name="Globe" className="w-8 h-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Доступно</h3>
            <p className="text-xs text-muted-foreground">Для всего мира</p>
          </div>
        </div>
      </div>
    </section>
  );
}
