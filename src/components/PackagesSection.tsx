import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Heart, ChevronRight, ChevronLeft, Users, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

// Import images for fallback
import jericoacoaraImg from '@/assets/destination-jericoacoara.jpg';
import salvadorImg from '@/assets/destination-salvador.jpg';
import portoGalinhasImg from '@/assets/destination-porto-galinhas.jpg';
import fernadoNoronhaImg from '@/assets/hero-fernando-noronha.jpg';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  original_price: number | null;
  duration: number;
  min_people: number;
  max_people: number;
  rating: number;
  review_count: number;
  included_items: string[];
  highlights: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
  type: 'destination';
}

// Fallback images for destinations without images
const fallbackImages = [
  jericoacoaraImg, salvadorImg, portoGalinhasImg, fernadoNoronhaImg
];

const PackagesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const destinationsPerView = 3;
  const navigate = useNavigate();

  // Fetch destinations from Supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching destinations:', error);
        } else {
          const destinationsWithType: Destination[] = (data || []).map((dest: any) => ({
            id: dest.id,
            name: dest.name,
            location: dest.location,
            description: dest.description,
            price: dest.price,
            original_price: dest.original_price,
            duration: dest.duration,
            min_people: dest.min_people,
            max_people: dest.max_people,
            rating: Number(dest.rating),
            review_count: dest.review_count,
            included_items: dest.included_items,
            highlights: dest.highlights,
            image_url: dest.image_url,
            created_at: dest.created_at,
            updated_at: dest.updated_at,
            type: 'destination' as const
          }));
          
          setDestinations(destinationsWithType);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const toggleFavorite = (itemId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  const getDestinationImage = (destination: Destination, index: number) => {
    return destination.image_url || fallbackImages[index % fallbackImages.length];
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + destinationsPerView >= destinations.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, destinations.length - destinationsPerView) : prev - 1
    );
  };

  const handleDestinationClick = (destination: Destination) => {
    navigate(`/destino/${destination.id}`);
  };

  const visibleItems = destinations.slice(currentIndex, currentIndex + destinationsPerView);

  if (loading) {
    return (
      <section id="pacotes" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Carregando destinos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (destinations.length === 0) {
    return (
      <section id="pacotes" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
              Nenhum destino encontrado
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Seja o primeiro a adicionar um destino incrível!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pacotes" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block font-dancing text-secondary text-2xl mb-4">
            Destinos Exclusivos
          </div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            Experiências Curadas para Você
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Destinos únicos com roteiros personalizados, hospedagem premium 
            e experiências exclusivas que só nossa curadoria pode oferecer.
          </p>
        </div>

        {/* Navigation Controls */}
        {destinations.length > destinationsPerView && (
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(destinations.length / destinationsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * destinationsPerView)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / destinationsPerView) === index
                      ? 'bg-primary scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleItems.map((destination, index) => (
            <div 
              key={destination.id}
              className="card-destination hover-lift cursor-pointer animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDestinationClick(destination)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img 
                  src={getDestinationImage(destination, index)} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays and Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    Novo
                  </Badge>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                  <Heart 
                    className={`h-5 w-5 transition-all duration-300 ${
                      favorites.has(destination.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-lg font-bold text-primary">
                      R$ {destination.price.toLocaleString('pt-BR')}
                    </div>
                    {destination.original_price && (
                      <div className="text-sm text-muted-foreground line-through">
                        R$ {destination.original_price.toLocaleString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>

                {/* Destination Name */}
                <h3 className="font-montserrat font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                  {destination.name}
                </h3>

                {/* Duration & Group Size */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.duration} dias</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.min_people}-{destination.max_people} pessoas</span>
                  </div>
                </div>

                {/* Included Items */}
                {destination.included_items && destination.included_items.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium text-foreground mb-2">Incluso:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.included_items.slice(0, 4).map((include, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {include}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-1 mb-6">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full group/btn hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDestinationClick(destination);
                    }}
                  >
                    Ver Detalhes
                    <ChevronRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Aqui você pode adicionar a lógica para abrir um modal de orçamento
                      console.log('Solicitar orçamento para:', destination.name);
                    }}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Fazer Orçamento
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <Button className="btn-accent hover-glow">
            <MapPin className="h-5 w-5 mr-2" />
            Ver Todos os Destinos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;