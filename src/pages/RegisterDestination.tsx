import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const destinationSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  location: z.string().min(2, "Localização é obrigatória"),
  price: z.string().min(1, "Preço é obrigatório"),
  originalPrice: z.string().optional(),
  duration: z.string().min(1, "Duração é obrigatória"),
  highlights: z.string().min(10, "Destaques devem ter pelo menos 10 caracteres"),
  minPeople: z.string().min(1, "Número mínimo de pessoas é obrigatório"),
  maxPeople: z.string().min(1, "Número máximo de pessoas é obrigatório"),
  rating: z.string().min(1, "Avaliação é obrigatória"),
  reviewCount: z.string().min(1, "Número de avaliações é obrigatório"),
  includedItems: z.string().min(10, "Itens inclusos devem ter pelo menos 10 caracteres"),
  image: z.any().optional(),
});

type DestinationForm = z.infer<typeof destinationSchema>;

export default function RegisterDestination() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const isFromAdmin = location.state?.fromAdmin || false;

  const form = useForm<DestinationForm>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      price: "",
      originalPrice: "",
      duration: "",
      highlights: "",
      minPeople: "",
      maxPeople: "",
      rating: "",
      reviewCount: "",
      includedItems: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: DestinationForm) => {
    console.log('🚀 FORM SUBMISSION STARTED');
    console.log('Form submitted with data:', data);
    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      // Upload da imagem se existir
      if (data.image) {
        const fileExt = data.image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('destinations')
          .upload(fileName, data.image);
          
        if (uploadError) {
          throw uploadError;
        }
        
        // Obter a URL pública da imagem
        const { data: { publicUrl } } = supabase.storage
          .from('destinations')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }
      
      // Preparar dados para inserção
      const highlightsArray = data.highlights
        .split(/[,\n]/)
        .map(h => h.trim())
        .filter(h => h.length > 0);
      
      const includedItemsArray = data.includedItems
        .split(/[,\n]/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      const destinationData = {
        name: data.name,
        location: data.location,
        description: data.description,
        price: parseFloat(data.price.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
        original_price: data.originalPrice ? parseFloat(data.originalPrice.replace(/[^\d.,]/g, '').replace(',', '.')) : null,
        duration: parseInt(data.duration.replace(/\D/g, '')) || 1,
        highlights: highlightsArray,
        min_people: parseInt(data.minPeople.replace(/\D/g, '')) || 1,
        max_people: parseInt(data.maxPeople.replace(/\D/g, '')) || 10,
        rating: parseFloat(data.rating.replace(/[^\d.,]/g, '').replace(',', '.')) || 5.0,
        review_count: parseInt(data.reviewCount.replace(/\D/g, '')) || 0,
        included_items: includedItemsArray,
        image_url: imageUrl
      };
      
      // Inserir no banco de dados
      console.log('Inserting data:', destinationData);
      const { data: insertResult, error: insertError } = await supabase
        .from('destinations')
        .insert([destinationData])
        .select();
        
      console.log('Insert result:', insertResult);
      console.log('Insert error:', insertError);
        
      if (insertError) {
        throw insertError;
      }
      
      toast({
        title: "Destino registrado com sucesso!",
        description: "O novo destino foi adicionado à plataforma.",
      });
      
      form.reset();
      setImagePreview(null);
      
      // Se veio do admin, redirecionar de volta
      if (isFromAdmin) {
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao registrar destino:', error);
      toast({
        title: "Erro ao registrar destino",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to={isFromAdmin ? "/admin/dashboard" : "/"} 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              {isFromAdmin ? "Voltar ao Dashboard" : "Voltar ao início"}
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Registrar Novo Destino
            </h1>
            <p className="text-muted-foreground">
              Adicione um novo destino turístico à nossa plataforma
            </p>
          </div>

          {/* Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Informações do Destino</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Nome */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Destino</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Jericoacoara" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Localização */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Ceará, Brasil" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Preço, Preço Original e Duração */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço Atual</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: R$ 1.200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço Original (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: R$ 1.500" {...field} />
                          </FormControl>
                          <FormDescription>
                            Preço antes do desconto (será mostrado riscado)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duração</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 5 dias" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Número de Pessoas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minPeople"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mínimo de Pessoas</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxPeople"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Máximo de Pessoas</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Avaliação */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avaliação (1-5)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 4.8" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reviewCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de Avaliações</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 150" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Descrição */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva o destino, suas principais características e atrativos..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Destaques */}
                  <FormField
                    control={form.control}
                    name="highlights"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Principais Destaques</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Liste os principais destaques e atividades disponíveis..."
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Separe os destaques por vírgula ou quebra de linha
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Itens Inclusos */}
                  <FormField
                    control={form.control}
                    name="includedItems"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Itens Inclusos</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hospedagem, Alimentação, Transporte, Passeios..."
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Separe os itens inclusos por vírgula ou quebra de linha
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Upload de Imagem */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem do Destino</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="cursor-pointer"
                            />
                            {imagePreview && (
                              <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            {!imagePreview && (
                              <div className="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground">
                                    Clique para fazer upload da imagem
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Botões */}
                  <div className="flex gap-4 pt-6">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Registrando..." : "Registrar Destino"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => form.reset()}
                      disabled={isSubmitting}
                    >
                      Limpar
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}