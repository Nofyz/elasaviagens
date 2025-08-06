import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Save, Plus, X } from 'lucide-react';
import { destinationsApi } from '@/lib/supabase';
import type { Database } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';

type Destination = Database['public']['Tables']['destinations']['Row'];

export const EditDestination: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destination, setDestination] = useState<Partial<Destination>>({
    name: '',
    location: '',
    description: '',
    price: 0,
    duration: 0,
    image_url: '',
    highlights: [],
    min_people: 1,
    max_people: 10,
    rating: 0,
    review_count: 0,
    included_items: [],
    original_price: 0
  });

  // Estados para gerenciar arrays
  const [highlightsInput, setHighlightsInput] = useState('');
  const [includedItemsInput, setIncludedItemsInput] = useState('');

  useEffect(() => {
    if (id) {
      loadDestination();
    }
  }, [id]);

  const loadDestination = async () => {
    try {
      setLoading(true);
      const data = await destinationsApi.getById(id!);
      if (data) {
        setDestination(data);
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

      await destinationsApi.update(id, destination as any);
      alert('Destino atualizado com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar destino:', error);
      setError('Erro ao atualizar destino. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Destination, value: any) => {
    setDestination(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funções para gerenciar arrays
  const addHighlight = () => {
    if (highlightsInput.trim()) {
      setDestination(prev => ({
        ...prev,
        highlights: [...(prev.highlights || []), highlightsInput.trim()]
      }));
      setHighlightsInput('');
    }
  };

  const removeHighlight = (index: number) => {
    setDestination(prev => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index) || []
    }));
  };

  const addIncludedItem = () => {
    if (includedItemsInput.trim()) {
      setDestination(prev => ({
        ...prev,
        included_items: [...(prev.included_items || []), includedItemsInput.trim()]
      }));
      setIncludedItemsInput('');
    }
  };

  const removeIncludedItem = (index: number) => {
    setDestination(prev => ({
      ...prev,
      included_items: prev.included_items?.filter((_, i) => i !== index) || []
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
                    value={destination.description || ''}
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
                      value={destination.original_price || 0}
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
                      value={destination.min_people || 1}
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
                      value={destination.max_people || 10}
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
                      value={destination.rating || 0}
                      onChange={(e) => handleChange('rating', Number(e.target.value))}
                      placeholder="4.5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="review_count">Número de Avaliações</Label>
                    <Input
                      id="review_count"
                      type="number"
                      value={destination.review_count || 0}
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
                    value={destination.image_url || ''}
                    onChange={(e) => handleChange('image_url', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>

                {/* Destaques */}
                <div className="space-y-4">
                  <Label>Destaques do Destino</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={highlightsInput}
                        onChange={(e) => setHighlightsInput(e.target.value)}
                        placeholder="Adicionar destaque..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                      />
                      <Button type="button" onClick={addHighlight} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {destination.highlights && destination.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {highlight}
                            <button
                              type="button"
                              onClick={() => removeHighlight(index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Itens Inclusos */}
                <div className="space-y-4">
                  <Label>Itens Inclusos</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={includedItemsInput}
                        onChange={(e) => setIncludedItemsInput(e.target.value)}
                        placeholder="Adicionar item incluso..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncludedItem())}
                      />
                      <Button type="button" onClick={addIncludedItem} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {destination.included_items && destination.included_items.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {destination.included_items.map((item, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            {item}
                            <button
                              type="button"
                              onClick={() => removeIncludedItem(index)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
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