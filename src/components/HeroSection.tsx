import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import heroImage from '@/assets/hero-fernando-noronha.jpg';
import heroJericoacoaraDunes from '@/assets/hero-jericoacoara-dunes.jpg';
import heroSalvadorPelourinho from '@/assets/hero-salvador-pelourinho.jpg';
import heroNatalBeach from '@/assets/hero-natal-beach.jpg';
import heroFernandoNoronha from '/fernando-noronha.png';
import heroLencoisMaranhenses from '/lencois-maranhenses.png';
import heroPraiaDeCarneiros from '/praia-de-carneiros.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Texto fixo global para todos os slides
  const heroContent = {
    title: "Descubra as Maravilhas do Nordeste",
    subtitle: "Destinos Únicos e Paisagens Inesquecíveis",
    description: "Do litoral paradisíaco ao sertão encantador, explore as belezas naturais, a rica cultura e a hospitalidade única do Nordeste brasileiro. Cada destino é uma experiência transformadora que vai marcar sua vida para sempre.",
    highlight: "Experiências Únicas e Inesquecíveis"
  };

  const heroSlides = [
    {
      image: heroFernandoNoronha,
      alt: "Fernando de Noronha - Morro Dois Irmãos e praia paradisíaca"
    },
    {
      image: heroLencoisMaranhenses,
      alt: "Lençóis Maranhenses - Dunas brancas e lagoas de água doce"
    },
    {
      image: heroPraiaDeCarneiros,
      alt: "Praia de Carneiros - Igreja na praia e coqueirais"
    },
    {
      image: heroImage,
      alt: "Fernando de Noronha - Praias paradisíacas e águas cristalinas"
    },
    {
      image: heroJericoacoaraDunes,
      alt: "Jericoacoara - Dunas douradas e lagoas azul-turquesa"
    },
    {
      image: heroSalvadorPelourinho,
      alt: "Salvador - História, cultura e arquitetura colonial"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // Increased duration for better image appreciation

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Crossfade Transition */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="w-full h-full object-cover scale-105 transition-transform duration-[8000ms] ease-out"
              style={{
                transform: index === currentSlide ? 'scale(1.02)' : 'scale(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Animated Content */}
            <div key={currentSlide} className="animate-fade-in-up">
              <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight">
                {heroContent.title}
              </h1>
              
              <div className="font-dancing text-2xl md:text-3xl text-accent mb-6">
                {heroContent.subtitle}
              </div>
              
              <p className="font-inter text-lg md:text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
                {heroContent.description}
              </p>
              
              <div className="font-inter font-semibold text-xl md:text-2xl text-accent mb-10">
                {heroContent.highlight}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button className="btn-hero animate-scale-in">
                <Search className="h-5 w-5 mr-2" />
                Explorar Destinos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float opacity-20">
        <div className="w-20 h-20 rounded-full bg-gradient-sunset" />
      </div>
      <div className="absolute bottom-32 left-10 animate-float opacity-30" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 rounded-full bg-gradient-ocean" />
      </div>
    </section>
  );
};

export default HeroSection;