import { Phone, Mail, Instagram, Facebook, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Logo placeholder - imagem não encontrada

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/90 text-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-xl text-white">
                    Elasa Viagens
                  </h3>
                  <p className="text-xs text-white/80">
                    Turismo e Experiências
                  </p>
                </div>
              </div>
            </div>
            <p className="font-inter text-white/80 mb-6 leading-relaxed">
              Especialistas em criar experiências autênticas e inesquecíveis 
              nos destinos mais paradisíacos do Nordeste brasileiro.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/elasaviagens?igsh=ZGY0cjgxbDl0OGkw" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/1TLDsMwQHh/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Navegação</h4>
            <ul className="space-y-3 font-inter">
              <li>
                <a href="/loja" className="text-white/80 hover:text-white transition-colors duration-300">
                  Destinos
                </a>
              </li>
              <li>
                <a href="#pacotes" className="text-white/80 hover:text-white transition-colors duration-300">
                  Pacotes Personalizados
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-white/80 hover:text-white transition-colors duration-300">
                  Sobre
                </a>
              </li>
              <li>
                <a href="/sobre#contato" className="text-white/80 hover:text-white transition-colors duration-300">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Contato</h4>
            <div className="space-y-4 font-inter">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-white/80">
                  <p>(19) 9 9802-0759</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div className="text-white/80">
                  <p>contato@elasaviagens.com.br</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/5519998020759?text=Olá! Gostaria de conhecer os pacotes e destinos da ElasaViagens. Podem me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
            >
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white/80 text-sm font-inter mb-4 md:mb-0">
              © 2025 ElasaViagens. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm font-inter">
              <a href="/politica-privacidade" className="text-white/80 hover:text-white transition-colors duration-300">
                Política de Privacidade
              </a>
              <a href="/termos-de-uso" className="text-white/80 hover:text-white transition-colors duration-300">
                Termos de Uso
              </a>
              <a href="/faq" className="text-white/80 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;