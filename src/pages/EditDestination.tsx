import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const EditDestination: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destination, setDestination] = useState({
    name: '',
    location: '',
    description: '',
    price: 0,
    duration: 0,
    image_url: '',
    highlights: [] as string[],
    min_people: 1,
    max_people: 10,
    rating: 0,
    review_count: 0,
    included_items: [] as string[],
    original_price: 0
  });

  useEffect(() => {
    if (id) {
      loadDestination();
    }
  }, [id]);

  const loadDestination = async () => {
    try {
      setLoading(true);
      console.log('Carregando destino com ID:', id);
      
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();
      
      console.log('Resposta do Supabase:', { data, error });
      
      if (error) {
        console.error('Erro do Supabase:', error);
        setError('Erro ao carregar destino: ' + error.message);
        return;
      }
      
      if (data) {
        console.log('Destino carregado:', data);
        setDestination({
          name: data.name || '',
          location: data.location || '',
          description: data.description || '',
          price: data.price || 0,
          duration: data.duration || 0,
          image_url: data.image_url || '',
          highlights: data.highlights || [],
          min_people: data.min_people || 1,
          max_people: data.max_people || 10,
          rating: data.rating || 0,
          review_count: data.review_count || 0,
          included_items: data.included_items || [],
          original_price: data.original_price || 0
        });
      } else {
        setError('Destino não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar destino:', error);
      setError('Erro ao carregar destino');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      setError(null);

      console.log('=== INÍCIO DA ATUALIZAÇÃO ===');
      console.log('ID do destino:', id);
      console.log('Dados atuais:', destination);
      
      // Remover campos que podem causar problemas
      const updateData = {
        name: destination.name,
        location: destination.location,
        description: destination.description,
        price: destination.price,
        duration: destination.duration,
        image_url: destination.image_url,
        min_people: destination.min_people,
        max_people: destination.max_people,
        rating: destination.rating,
        review_count: destination.review_count,
        original_price: destination.original_price
      };
      
      console.log('Dados para atualização:', updateData);
      
      // Primeiro, vamos verificar se o destino existe
      console.log('Verificando se o destino existe...');
      const { data: checkData, error: checkError } = await supabase
        .from('destinations')
        .select('id, name')
        .eq('id', id)
        .single();
      
      console.log('Verificação de existência:', { checkData, checkError });
      
      if (checkError) {
        console.error('Erro ao verificar destino:', checkError);
        setError('Destino não encontrado no banco');
        return;
      }
      
      // Agora vamos fazer a atualização
      console.log('Fazendo a atualização...');
      const { data, error } = await supabase
        .from('destinations')
        .update(updateData)
        .eq('id', id);
      
      console.log('Resposta da atualização:', { data, error });
      
      if (error) {
        console.error('Erro do Supabase na atualização:', error);
        setError('Erro ao atualizar destino: ' + error.message);
        return;
      }
      
      // Vamos verificar se a atualização foi bem-sucedida
      console.log('Verificando se a atualização foi bem-sucedida...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();
      
      console.log('Verificação pós-atualização:', { verifyData, verifyError });
      
      if (verifyError) {
        console.error('Erro ao verificar atualização:', verifyError);
        setError('Erro ao verificar se a atualização foi bem-sucedida');
        return;
      }
      
      console.log('=== ATUALIZAÇÃO CONCLUÍDA ===');
      console.log('Dados finais no banco:', verifyData);
      
      alert('Destino atualizado com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar destino:', error);
      setError('Erro ao atualizar destino. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setDestination(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando destino...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Editar Destino</h1>
              <p className="text-sm text-muted-foreground">
                Atualize as informações do destino
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informações do Destino</CardTitle>
              <CardDescription>
                Preencha os campos abaixo para atualizar o destino
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Destino</Label>
                    <Input
                      id="name"
                      value={destination.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Ex: Fernando de Noronha"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={destination.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      placeholder="Ex: Pernambuco - Fernando de Noronha"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={destination.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Descreva o destino..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço Atual (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={destination.price}
                      onChange={(e) => handleChange('price', Number(e.target.value))}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="original_price">Preço Original (R$)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={destination.original_price}
                      onChange={(e) => handleChange('original_price', Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (dias)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={destination.duration}
                      onChange={(e) => handleChange('duration', Number(e.target.value))}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min_people">Mínimo de Pessoas</Label>
                    <Input
                      id="min_people"
                      type="number"
                      value={destination.min_people}
                      onChange={(e) => handleChange('min_people', Number(e.target.value))}
                      placeholder="1"
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max_people">Máximo de Pessoas</Label>
                    <Input
                      id="max_people"
                      type="number"
                      value={destination.max_people}
                      onChange={(e) => handleChange('max_people', Number(e.target.value))}
                      placeholder="10"
                      min="1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Avaliação (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={destination.rating}
                      onChange={(e) => handleChange('rating', Number(e.target.value))}
                      placeholder="4.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review_count">Número de Avaliações</Label>
                    <Input
                      id="review_count"
                      type="number"
                      value={destination.review_count}
                      onChange={(e) => handleChange('review_count', Number(e.target.value))}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">URL da Imagem</Label>
                  <Input
                    id="image_url"
                    value={destination.image_url}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/admin/dashboard')}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditDestination; 