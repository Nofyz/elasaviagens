
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Ana Carolina",
      location: "São Paulo, SP",
      rating: 5,
      text: "A viagem para Fernando de Noronha foi simplesmente perfeita! Cada detalhe foi pensado com carinho e profissionalismo. As águas cristalinas e a vida marinha exuberante superaram todas as minhas expectativas.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Carlos Eduardo",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      text: "Jericoacoara me conquistou completamente! A agência organizou tudo de forma impecável, desde o transfer até as experiências exclusivas. O pôr do sol na Duna do Pôr do Sol foi inesquecível.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Mariana Santos",
      location: "Belo Horizonte, MG",
      rating: 5,
      text: "Nossa lua de mel em Porto de Galinhas foi um sonho realizado! A equipe da agência cuidou de cada detalhe, proporcionando momentos únicos e românticos. As piscinas naturais são de outro mundo!",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Roberto Silva",
      location: "Brasília, DF",
      rating: 5,
      text: "A experiência gastronômica em Salvador foi incrível! Conhecer a cultura baiana através dos sabores e tradições foi uma jornada única. O atendimento personalizado fez toda a diferença.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 5,
      name: "Juliana Costa",
      location: "Curitiba, PR",
      rating: 5,
      text: "Maragogi é realmente o Caribe brasileiro! As águas azul-turquesa e os corais coloridos me deixaram sem palavras. A agência proporcionou uma experiência autêntica e inesquecível.",
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 6,
      name: "Felipe Oliveira",
      location: "Fortaleza, CE",
      rating: 5,
      text: "A aventura em Natal foi perfeita para nossa família! Desde as dunas do Genipabu até o aquário de Natal, cada momento foi especial. Meus filhos ainda falam sobre a viagem!",
      avatar: "/api/placeholder/80/80"
    }
  ];

  // Create infinite scroll effect by duplicating testimonials
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const startAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testimonials.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    startAutoSlide(); // Reset timer
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoSlide(); // Reset timer
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide;
    const visibleItems = [];
    
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % testimonials.length;
      visibleItems.push({
        ...testimonials[index],
        key: `${testimonials[index].id}-${Math.floor((startIndex + i) / testimonials.length)}`
      });
    }
    
    return visibleItems;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-ocean text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4" />
            Avaliações de Clientes
          </div>
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            Experiências Inesquecíveis
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Descobra o que nossos clientes dizem sobre suas jornadas pelo paraíso nordestino
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Fade overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
          </button>
          
          {/* Carousel container */}
          <div className="overflow-hidden py-12 pb-16">
            <div 
              className="flex transition-transform duration-1000 ease-in-out gap-8"
              style={{
                transform: `translateX(-${(currentSlide * (100 / 3))}%)`
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-full md:w-1/3 px-6"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 h-full">
                    {/* Quote icon */}
                    <div className="text-primary/20 mb-6">
                      <Quote className="h-8 w-8" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <p className="font-inter text-foreground/80 mb-6 leading-relaxed text-sm md:text-base">
                      "{testimonial.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                      <div className="w-12 h-12 rounded-full bg-gradient-sunset flex items-center justify-center text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-inter font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="font-inter text-sm text-muted-foreground">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                startAutoSlide(); // Reset timer
              }}
              className={`relative group transition-all duration-500 ease-out ${
                index === currentSlide 
                  ? 'w-8 h-3' 
                  : 'w-3 h-3 hover:scale-125'
              }`}
            >
              {/* Background dot */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'bg-gradient-ocean opacity-100'
                  : 'bg-muted-foreground/20 group-hover:bg-muted-foreground/40'
              }`} />
              
              {/* Active indicator glow */}
              {index === currentSlide && (
                <div className="absolute inset-0 rounded-full bg-gradient-ocean blur-sm opacity-50 animate-pulse" />
              )}
              
              {/* Hover ripple effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl md:text-4xl text-gradient-ocean mb-2">
              98%
            </div>
            <div className="font-inter text-muted-foreground">
              Satisfação dos Clientes
            </div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl md:text-4xl text-gradient-ocean mb-2">
              1.200+
            </div>
            <div className="font-inter text-muted-foreground">
              Viajantes Felizes
            </div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl md:text-4xl text-gradient-ocean mb-2">
              150+
            </div>
            <div className="font-inter text-muted-foreground">
              Experiências Únicas
            </div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-3xl md:text-4xl text-gradient-ocean mb-2">
              4.9★
            </div>
            <div className="font-inter text-muted-foreground">
              Avaliação Média
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
