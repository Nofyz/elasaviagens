import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

// Import destination images
import jericoacoaraImg from '@/assets/destination-jericoacoara.jpg';
import salvadorImg from '@/assets/destination-salvador.jpg';
import portoGalinhasImg from '@/assets/destination-porto-galinhas.jpg';
import natalImg from '@/assets/destination-natal.jpg';
import maragogiImg from '@/assets/destination-maragogi.jpg';
import fernadoNoronhaImg from '@/assets/hero-fernando-noronha.jpg';
import canoaQuebradaImg from '@/assets/destination-canoa-quebrada.jpg';
import praiaDoForteImg from '@/assets/destination-praia-do-forte.jpg';
import saoLuisImg from '@/assets/destination-sao-luis.jpg';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  duration: number;
  highlights: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Fallback images for destinations without images
const fallbackImages = [
  jericoacoaraImg, salvadorImg, portoGalinhasImg, natalImg, 
  maragogiImg, fernadoNoronhaImg, canoaQuebradaImg, praiaDoForteImg, saoLuisImg
];

const DestinationsSection = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  
  const destinationsPerGroup = 3;
  const totalGroups = Math.ceil(destinations.length / destinationsPerGroup);

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
          setDestinations(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const toggleFavorite = (destinationId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(destinationId)) {
      newFavorites.delete(destinationId);
    } else {
      newFavorites.add(destinationId);
    }
    setFavorites(newFavorites);
  };

  const handleDestinationClick = (destination: Destination) => {
    navigate(`/destino/${destination.id}`);
  };

  const nextGroup = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevGroup = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getCurrentDestinations = () => {
    const startIndex = currentGroup * destinationsPerGroup;
    return destinations.slice(startIndex, startIndex + destinationsPerGroup);
  };

  const getDestinationImage = (destination: Destination, index: number) => {
    return destination.image_url || fallbackImages[index % fallbackImages.length];
  };

  if (loading) {
    return (
      <section id="destinos" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
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
      <section id="destinos" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
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
    <section id="destinos" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block font-dancing text-accent text-2xl mb-4">
            Destinos Exclusivos
          </div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            Descubra o Melhor do Nordeste
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Cada destino é cuidadosamente selecionado para oferecer experiências autênticas 
            e momentos inesquecíveis no paraíso nordestino.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevGroup}
            disabled={isAnimating}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentGroup(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentGroup
                    ? 'bg-primary scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextGroup}
            disabled={isAnimating}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="relative overflow-hidden mb-12">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
              isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
            }`}
          >
            {getCurrentDestinations().map((destination, index) => (
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
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                >
                  <Heart 
                    className={`h-5 w-5 transition-colors duration-300 ${
                      favorites.has(destination.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-sm font-semibold text-primary">
                      R$ {destination.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Novo</span>
                  </div>
                </div>

                {/* Destination Name */}
                <h3 className="font-montserrat font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                  {destination.name}
                </h3>

                {/* Category & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-accent font-medium">
                    Destino Turístico
                  </span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.duration} dias</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1 mb-6">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full group-hover:bg-primary/90 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDestinationClick(destination);
                  }}
                >
                  Ver Detalhes
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
            ))}
          </div>
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

export default DestinationsSection;