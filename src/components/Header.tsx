import { useState, useEffect } from 'react';
import { MapPin, Menu, X, Plane, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-xl text-gradient-ocean">
                Nordeste Viagens
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Paraíso Brasileiro
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="#destinos" 
              className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Destinos
            </a>
            <a 
              href="#pacotes" 
              className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Pacotes
            </a>
            <a 
              href="#experiencias" 
              className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Experiências
            </a>
            <a 
              href="#sobre" 
              className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Sobre
            </a>
            <a 
              href="#contato" 
              className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              Contato
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hover-glow">
              <Heart className="h-4 w-4 mr-2" />
              Favoritos
            </Button>
            <Button variant="ghost" size="sm" className="hover-glow">
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
            <Button className="btn-hero">
              <Plane className="h-4 w-4 mr-2" />
              Planejar Viagem
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border">
            <nav className="py-4 space-y-3">
              <a 
                href="#destinos" 
                className="block px-4 py-2 font-inter font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinos
              </a>
              <a 
                href="#pacotes" 
                className="block px-4 py-2 font-inter font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pacotes
              </a>
              <a 
                href="#experiencias" 
                className="block px-4 py-2 font-inter font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiências
              </a>
              <a 
                href="#sobre" 
                className="block px-4 py-2 font-inter font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </a>
              <a 
                href="#contato" 
                className="block px-4 py-2 font-inter font-medium text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </a>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoritos
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button className="btn-hero justify-start">
                  <Plane className="h-4 w-4 mr-2" />
                  Planejar Viagem
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;