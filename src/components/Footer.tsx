import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary/95 to-secondary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
              Receba Ofertas Exclusivas
            </h3>
            <p className="font-inter text-white/80 mb-8 max-w-2xl mx-auto">
              Seja o primeiro a saber sobre novos destinos, promoções especiais 
              e experiências únicas no Nordeste brasileiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                Inscrever-se
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-4">
              Não enviamos spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl">
                  Nordeste Viagens
                </h1>
                <p className="text-sm text-white/80">Paraíso Brasileiro</p>
              </div>
            </div>
            <p className="font-inter text-white/80 mb-6 leading-relaxed">
              Especialistas em criar experiências autênticas e inesquecíveis 
              nos destinos mais paradisíacos do Nordeste brasileiro.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Destinos</h4>
            <ul className="space-y-3 font-inter">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Fernando de Noronha
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Jericoacoara
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Salvador
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Porto de Galinhas
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Maragogi
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Natal
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Serviços</h4>
            <ul className="space-y-3 font-inter">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Pacotes Personalizados
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Experiências Exclusivas
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Viagens em Grupo
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Lua de Mel
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Viagens Corporativas
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                  Consultoria de Viagem
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Contato</h4>
            <div className="space-y-4 font-inter">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-white/80">
                  <p>Av. Boa Viagem, 1234</p>
                  <p>Recife - PE, 51020-000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-white/80">
                  <p>(81) 3456-7890</p>
                  <p>(81) 99876-5432</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-white/80">
                  <p>contato@nordesteviagens.com.br</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <Button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white">
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/80 text-sm font-inter mb-4 md:mb-0">
              © 2024 Nordeste Viagens. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm font-inter">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm font-inter flex items-center">
              Feito com <Heart className="h-4 w-4 mx-1 text-red-400 fill-red-400" /> para os amantes do Nordeste
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;