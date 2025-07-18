import { useState } from 'react';
import { Star, Calendar, Users, MapPin, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TravelButton } from '@/components/ui/travel-button';
import { Badge } from '@/components/ui/badge';

// Import destination images
import fernadoNoronhaImg from '@/assets/hero-fernando-noronha.jpg';
import jericoacoaraImg from '@/assets/destination-jericoacoara.jpg';
import salvadorImg from '@/assets/destination-salvador.jpg';
import portoGalinhasImg from '@/assets/destination-porto-galinhas.jpg';

interface Package {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: string;
  groupSize: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  includes: string[];
  highlights: string[];
  tag?: string;
  saving?: string;
}

const packages: Package[] = [
  {
    id: 'fernando-noronha-premium',
    title: 'Fernando de Noronha Premium',
    destination: 'Fernando de Noronha, PE',
    image: fernadoNoronhaImg,
    duration: '7 dias / 6 noites',
    groupSize: '2-8 pessoas',
    price: 'R$ 4.890',
    originalPrice: 'R$ 5.690',
    rating: 4.9,
    reviewCount: 89,
    includes: ['Voos', 'Hotel 5*', 'Mergulho', 'Transfers'],
    highlights: ['Mergulho com golfinhos', 'Trilhas exclusivas', 'Hotel frente ao mar'],
    tag: 'Mais Vendido',
    saving: 'Economize R$ 800'
  },
  {
    id: 'jericoacoara-adventure',
    title: 'Jericoacoara Aventura',
    destination: 'Jericoacoara, CE',
    image: jericoacoaraImg,
    duration: '5 dias / 4 noites',
    groupSize: '4-12 pessoas',
    price: 'R$ 2.390',
    rating: 4.8,
    reviewCount: 156,
    includes: ['Transfer 4x4', 'Pousada', 'Passeios', 'Guia'],
    highlights: ['Pôr do sol na duna', 'Kitesurf', 'Lagoa Azul', 'Tatajuba'],
    tag: 'Aventura'
  },
  {
    id: 'salvador-cultural',
    title: 'Salvador Cultural Experience',
    destination: 'Salvador, BA',
    image: salvadorImg,
    duration: '4 dias / 3 noites',
    groupSize: '2-15 pessoas',
    price: 'R$ 1.690',
    originalPrice: 'R$ 1.890',
    rating: 4.7,
    reviewCount: 203,
    includes: ['Hotel boutique', 'City tour', 'Aulas de capoeira', 'Gastronomia'],
    highlights: ['Pelourinho histórico', 'Terreiro de Jesus', 'Aula de culinária baiana'],
    tag: 'Cultural',
    saving: 'Oferta especial'
  },
  {
    id: 'porto-galinhas-family',
    title: 'Porto de Galinhas em Família',
    destination: 'Porto de Galinhas, PE',
    image: portoGalinhasImg,
    duration: '6 dias / 5 noites',
    groupSize: '2-10 pessoas',
    price: 'R$ 2.890',
    rating: 4.6,
    reviewCount: 124,
    includes: ['Resort All-Inclusive', 'Atividades kids', 'Passeios', 'Mergulho'],
    highlights: ['Piscinas naturais', 'Atividades para crianças', 'Mergulho iniciante'],
    tag: 'Família'
  },
  {
    id: 'nordeste-completo',
    title: 'Nordeste Completo',
    destination: 'Multi-destinos',
    image: fernadoNoronhaImg,
    duration: '12 dias / 11 noites',
    groupSize: '4-16 pessoas',
    price: 'R$ 6.890',
    originalPrice: 'R$ 8.190',
    rating: 4.9,
    reviewCount: 67,
    includes: ['Voos internos', 'Hotéis 4-5*', 'Todos os passeios', 'Guia especializado'],
    highlights: ['5 destinos incríveis', 'Experiência completa', 'Guia durante toda viagem'],
    tag: 'Exclusivo',
    saving: 'Super oferta'
  }
];

const PackagesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const packagesPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + packagesPerView >= packages.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, packages.length - packagesPerView) : prev - 1
    );
  };

  const visiblePackages = packages.slice(currentIndex, currentIndex + packagesPerView);

  return (
    <section id="pacotes" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block font-dancing text-secondary text-2xl mb-4">
            Pacotes Exclusivos
          </div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            Experiências Curadas para Você
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Pacotes completos com roteiros personalizados, hospedagem premium 
            e experiências exclusivas que só nossa curadoria pode oferecer.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-warm"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hover:shadow-warm"
            disabled={currentIndex + packagesPerView >= packages.length}
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Packages Grid */}
          <div className="mx-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePackages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="card-destination cursor-pointer animate-scale-in group relative transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Package Tag */}
                    {pkg.tag && (
                      <div className="absolute top-4 left-4">
                        <Badge className={`
                          ${pkg.tag === 'Mais Vendido' ? 'bg-secondary text-secondary-foreground' : 
                            pkg.tag === 'Exclusivo' ? 'bg-accent text-accent-foreground' : 
                            'bg-primary text-primary-foreground'}
                        `}>
                          {pkg.tag}
                        </Badge>
                      </div>
                    )}

                    {/* Saving Badge */}
                    {pkg.saving && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          {pkg.saving}
                        </Badge>
                      </div>
                    )}

                    {/* Price */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="text-lg font-bold text-primary">
                          {pkg.price}
                        </div>
                        {pkg.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through -mt-1">
                            {pkg.originalPrice}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          por pessoa
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title & Location */}
                    <h3 className="font-montserrat font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.destination}</span>
                    </div>

                    {/* Package Details */}
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{pkg.groupSize}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-medium mr-1">{pkg.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({pkg.reviewCount} avaliações)
                      </span>
                    </div>

                    {/* Includes */}
                    <div className="mb-4">
                      <div className="text-sm font-medium text-foreground mb-2">Incluso:</div>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includes.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1 mb-6">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-2">
                      <Button className="w-full">
                        <Plane className="h-4 w-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" className="w-full text-sm">
                        Solicitar Orçamento
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(packages.length / packagesPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * packagesPerView)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / packagesPerView) === index
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <TravelButton>
            Ver Todos os Pacotes
          </TravelButton>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;