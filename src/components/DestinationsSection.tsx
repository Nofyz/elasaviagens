import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDestinations } from '@/hooks/use-supabase';

import type { Database } from '@/integrations/supabase/types';

type Destination = Database['public']['Tables']['destinations']['Row'];

const DestinationsSection = () => {
  const navigate = useNavigate();
  // const [favorites, setFavorites] = useState<Set<string>>(new Set()); // Temporarily hidden
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { destinations, loading, error, fetchDestinations } = useDestinations();
  
  const destinationsPerGroup = 3;
  const validDestinations = destinations.filter(dest => 
    dest && dest.id && dest.name && dest.location
  );
  const totalGroups = Math.ceil(validDestinations.length / destinationsPerGroup);

  // Fetch destinations on component mount
  React.useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  // const toggleFavorite = (destinationId: string) => {
  //   const newFavorites = new Set(favorites);
  //   if (newFavorites.has(destinationId)) {
  //     newFavorites.delete(destinationId);
  //   } else {
  //     newFavorites.add(destinationId);
  //   }
  //   setFavorites(newFavorites);
  // };

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
    return validDestinations.slice(startIndex, startIndex + destinationsPerGroup);
  };

  const getDestinationImage = (destination: Destination, index: number) => {
    // Se o destino tem uma imagem no banco, usa ela
    if (destination.image_url) {
      return destination.image_url;
    }
    
    // Se não tem imagem, usa uma imagem padrão
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';
  };

  const openWhatsAppWithDestination = (destination: Destination) => {
    const phone = '5519998020759';
    const message = `Olá! Tenho interesse em fazer um orçamento para o destino ${destination.name}. Poderiam me enviar mais informações?`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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

  if (error) {
    return (
      <section id="destinos" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
              Erro ao carregar destinos
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {error}
            </p>
            <Button onClick={fetchDestinations} variant="outline">
              Tentar Novamente
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (validDestinations.length === 0) {
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

        {/* Destinations Grid with Navigation */}
        <div className="relative mb-12">
          {/* Left Arrow */}
          <button
            onClick={prevGroup}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextGroup}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Cards Container */}
          <div className="px-16">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
                isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
              }`}
            >
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out ${
              isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
            }`}
          >
            {getCurrentDestinations().map((destination, index) => (
            <div 
              key={destination.id}
              className="card-destination hover-lift cursor-pointer animate-scale-in group h-full flex flex-col"
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

                {/* Favorite Button - Temporarily hidden */}
                {/* <button 
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
                </button> */}

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
              <div className="p-6 flex flex-col h-full">
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

                {/* Description */}
                {destination.description && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {destination.description}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-1">
                  {destination.highlights && destination.highlights.length > 0 ? (
                    destination.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {highlight}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Destino incrível no Nordeste brasileiro
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button 
                  className="w-full group-hover:bg-primary/90 transition-all duration-300 mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    openWhatsAppWithDestination(destination);
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
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <Button asChild className="btn-explore-destinations">
            <Link to="/loja">
              <MapPin className="h-5 w-5 mr-2 icon-shift" />
              Ver Todos os Destinos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;