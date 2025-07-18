import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import destination images
import jericoacoaraImg from '@/assets/destination-jericoacoara.jpg';
import salvadorImg from '@/assets/destination-salvador.jpg';
import portoGalinhasImg from '@/assets/destination-porto-galinhas.jpg';
import natalImg from '@/assets/destination-natal.jpg';
import maragogiImg from '@/assets/destination-maragogi.jpg';
import fernadoNoronhaImg from '@/assets/hero-fernando-noronha.jpg';

interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: string;
  originalPrice?: string;
  highlights: string[];
  category: string;
  popular?: boolean;
  exclusive?: boolean;
}

const destinations: Destination[] = [
  {
    id: 'fernando-noronha',
    name: 'Fernando de Noronha',
    state: 'Pernambuco',
    image: fernadoNoronhaImg,
    rating: 4.9,
    reviewCount: 312,
    duration: '5-7 dias',
    price: 'R$ 2.890',
    originalPrice: 'R$ 3.490',
    highlights: ['Mergulho com golfinhos', 'Praias paradisíacas', 'Vida marinha única'],
    category: 'Paraíso Natural',
    popular: true,
    exclusive: true
  },
  {
    id: 'jericoacoara',
    name: 'Jericoacoara',
    state: 'Ceará',
    image: jericoacoaraImg,
    rating: 4.8,
    reviewCount: 287,
    duration: '4-6 dias',
    price: 'R$ 1.690',
    highlights: ['Dunas de areia', 'Pôr do sol na duna', 'Kitesurf'],
    category: 'Aventura & Relax',
    popular: true
  },
  {
    id: 'salvador',
    name: 'Salvador',
    state: 'Bahia',
    image: salvadorImg,
    rating: 4.7,
    reviewCount: 431,
    duration: '3-5 dias',
    price: 'R$ 1.290',
    highlights: ['Pelourinho histórico', 'Cultura afro-brasileira', 'Gastronomia baiana'],
    category: 'Cultura & História'
  },
  {
    id: 'porto-galinhas',
    name: 'Porto de Galinhas',
    state: 'Pernambuco',
    image: portoGalinhasImg,
    rating: 4.6,
    reviewCount: 356,
    duration: '4-6 dias',
    price: 'R$ 1.590',
    highlights: ['Piscinas naturais', 'Mergulho com peixes', 'Resorts de qualidade'],
    category: 'Praia & Família'
  },
  {
    id: 'natal',
    name: 'Natal',
    state: 'Rio Grande do Norte',
    image: natalImg,
    rating: 4.5,
    reviewCount: 298,
    duration: '4-5 dias',
    price: 'R$ 1.390',
    highlights: ['Dunas de Genipabu', 'Forte dos Reis Magos', 'Passeio de buggy'],
    category: 'Aventura & Cultura'
  },
  {
    id: 'maragogi',
    name: 'Maragogi',
    state: 'Alagoas',
    image: maragogiImg,
    rating: 4.8,
    reviewCount: 203,
    duration: '3-5 dias',
    price: 'R$ 1.790',
    highlights: ['Galés de Maragogi', 'Águas cristalinas', 'Caribe brasileiro'],
    category: 'Paraíso Natural',
    exclusive: true
  }
];

const DestinationsSection = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {destinations.map((destination, index) => (
            <div 
              key={destination.id}
              className="card-destination hover-lift cursor-pointer animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDestinationClick(destination)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlays and Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {destination.popular && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      Mais Popular
                    </Badge>
                  )}
                  {destination.exclusive && (
                    <Badge className="bg-accent text-accent-foreground">
                      Exclusivo
                    </Badge>
                  )}
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
                      {destination.price}
                    </div>
                    {destination.originalPrice && (
                      <div className="text-xs text-muted-foreground line-through">
                        {destination.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.state}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">
                      ({destination.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Destination Name */}
                <h3 className="font-montserrat font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                  {destination.name}
                </h3>

                {/* Category & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-accent font-medium">
                    {destination.category}
                  </span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{destination.duration}</span>
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