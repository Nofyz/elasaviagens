import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Heart, Plane, Calendar, Phone, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroJericoacoaraDunes from '@/assets/hero-jericoacoara-dunes.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block font-dancing text-secondary text-2xl mb-4">
            Nossa História
          </div>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            Sobre a ElasaViagens
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            Somos apaixonados pelo Nordeste brasileiro e dedicados a criar experiências 
            inesquecíveis para nossos viajantes. Conheça nossa missão, valores e equipe.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-montserrat font-bold text-3xl mb-6 text-gradient-ocean">
              Nossa Missão
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Conectar pessoas às belezas naturais, cultura rica e hospitalidade única do Nordeste brasileiro, 
              criando experiências autênticas e transformadoras que valorizam o turismo sustentável e 
              fortalecem as comunidades locais.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-blue-600" />
                </div>
                <span className="font-medium">Experiências autênticas e personalizadas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-teal-600" />
                </div>
                <span className="font-medium">Valorização das comunidades locais</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium">Turismo sustentável e responsável</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroJericoacoaraDunes}
              alt="Jericoacoara - Dunas douradas e lagoas azul-turquesa"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>



        {/* Values Section */}
        <div className="mb-16">
          <h2 className="font-montserrat font-bold text-3xl text-center mb-12 text-gradient-ocean">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Paixão</h3>
                <p className="text-muted-foreground">
                  Amamos o que fazemos e isso se reflete em cada detalhe das nossas viagens, 
                  desde o planejamento até a execução.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Respeito</h3>
                <p className="text-muted-foreground">
                  Valorizamos a cultura local, o meio ambiente e criamos conexões genuínas 
                  entre viajantes e comunidades.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Excelência</h3>
                <p className="text-muted-foreground">
                  Buscamos sempre a excelência em nossos serviços, garantindo qualidade 
                  e satisfação em cada experiência.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contato" className="mb-16">
          <h2 className="font-montserrat font-bold text-3xl text-center mb-12 text-gradient-ocean">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-12">
            Estamos aqui para ajudar você a planejar a viagem dos seus sonhos pelo Nordeste brasileiro.
          </p>

          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-2xl mb-4 text-gradient-ocean">
                    Fale Conosco Agora
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Nossa equipe está pronta para ajudar você a planejar sua próxima aventura pelo Nordeste brasileiro.
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="https://wa.me/5519998020759?text=Olá! Gostaria de conhecer os pacotes e destinos da ElasaViagens. Podem me ajudar?"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      <Phone className="h-4 w-4 inline mr-2" />
                      WhatsApp: (19) 9 9802-0759
                    </a>
                    <a 
                      href="mailto:contato@elasaviagens.com.br"
                      className="block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      <Mail className="h-4 w-4 inline mr-2" />
                      contato@elasaviagens.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="font-montserrat font-bold text-3xl mb-4">
            Pronto para sua próxima aventura?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Descubra os destinos mais incríveis do Nordeste brasileiro conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/loja"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Plane className="h-5 w-5 inline mr-2" />
              Ver Destinos
            </a>
            <a 
              href="https://wa.me/5519998020759?text=Olá! Gostaria de conhecer os pacotes e destinos da ElasaViagens. Podem me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Falar Conosco
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;