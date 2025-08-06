import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Plane, 
  Star,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomPackagesSection = () => {
  const benefits = [
    "Roteiro personalizado conforme seus interesses",
    "Escolha de hospedagem e transporte",
    "Atividades exclusivas e experiências únicas",
    "Suporte 24/7 durante toda a viagem",
    "Flexibilidade total de datas e duração",
    "Preços competitivos e transparentes"
  ];

  const examples = [
    {
      title: "Lua de Mel Romântica",
      description: "Praias paradisíacas, resorts exclusivos, jantares à luz de velas",
      icon: Heart,
      duration: "7-10 dias",
      price: "A partir de R$ 3.500"
    },
    {
      title: "Aventura em Família", 
      description: "Atividades para todas as idades, hotéis familiares, diversão garantida",
      icon: Users,
      duration: "5-7 dias", 
      price: "A partir de R$ 2.800"
    },
    {
      title: "Roteiro Cultural",
      description: "História, arquitetura, gastronomia e tradições locais",
      icon: Star,
      duration: "4-6 dias",
      price: "A partir de R$ 2.200"
    }
  ];

  return (
    <section id="pacotes-personalizados" className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient-ocean">Pacotes</span>{' '}
            <span className="text-gradient-sunset">Personalizados</span>
          </h2>
          
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Crie a viagem dos seus sonhos! Nossa equipe especializada desenvolve roteiros únicos 
            e exclusivos, pensados especialmente para você e sua família.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Benefits List */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-8 text-foreground">
              Por que escolher um pacote personalizado?
            </h3>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="font-inter text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border border-blue-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <h4 className="font-montserrat font-semibold text-lg text-foreground">
                  Processo Simples e Rápido
                </h4>
              </div>
              <p className="font-inter text-muted-foreground text-sm">
                Conte-nos seus sonhos e preferências. Em até 48h, nossa equipe criará 
                uma proposta completa e personalizada para sua aprovação.
              </p>
            </div>
          </div>

          {/* Right: Example Cards */}
          <div className="space-y-6">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl mb-6 text-foreground text-center lg:text-left">
              Exemplos de Pacotes
            </h3>
            
            {examples.map((example, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <example.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-montserrat font-bold text-lg mb-2 text-foreground group-hover:text-blue-600 transition-colors duration-200">
                        {example.title}
                      </h4>
                      <p className="font-inter text-muted-foreground mb-3 text-sm leading-relaxed">
                        {example.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{example.duration}</span>
                          </div>
                          <span className="font-semibold text-blue-600">{example.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block p-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl shadow-2xl">
            <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">
              Pronto para criar sua viagem ideal?
            </h3>
            <p className="font-inter text-blue-50 mb-8 max-w-2xl mx-auto">
              Nossa equipe está esperando para transformar seus sonhos em realidade. 
              Entre em contato e comece a planejar a experiência perfeita!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5519998020759?text=Ol%C3%A1%21%20Tenho%20interesse%20em%20criar%20um%20pacote%20de%20viagem%20personalizado%20para%20o%20Nordeste.%20Gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20funciona%20o%20processo%20e%20solicitar%20um%20or%C3%A7amento.%20Obrigado%21"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group">
                  Solicitar Orçamento
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </a>
              
              <Link 
                to="/loja"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-200"
                >
                  Ver Pacotes Prontos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPackagesSection; 