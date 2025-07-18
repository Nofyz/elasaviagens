import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Calendar, Clock, Users, 
  Camera, Waves, Mountain, Utensils, Heart, Share2,
  Sun, Thermometer, Plane, Car, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import images
import fernadoNoronhaImg from '@/assets/hero-fernando-noronha.jpg';
import jericoacoaraImg from '@/assets/destination-jericoacoara.jpg';
import salvadorImg from '@/assets/destination-salvador.jpg';
import portoGalinhasImg from '@/assets/destination-porto-galinhas.jpg';
import natalImg from '@/assets/destination-natal.jpg';
import maragogiImg from '@/assets/destination-maragogi.jpg';

interface Destination {
  id: string;
  name: string;
  state: string;
  region: string;
  images: string[];
  heroImage: string;
  rating: number;
  reviewCount: number;
  bestTime: string;
  duration: string;
  description: string;
  highlights: string[];
  activities: {
    name: string;
    icon: React.ElementType;
    description: string;
  }[];
  climate: {
    temperature: string;
    season: string;
    rainfall: string;
  };
  howToGet: {
    flight: string;
    drive: string;
    transfer: string;
  };
  tips: string[];
  packages: {
    id: string;
    title: string;
    duration: string;
    price: string;
    includes: string[];
  }[];
}

const destinationsData: Record<string, Destination> = {
  'fernando-noronha': {
    id: 'fernando-noronha',
    name: 'Fernando de Noronha',
    state: 'Pernambuco',
    region: 'Nordeste',
    images: [fernadoNoronhaImg, fernadoNoronhaImg, fernadoNoronhaImg],
    heroImage: fernadoNoronhaImg,
    rating: 4.9,
    reviewCount: 312,
    bestTime: 'Março a Outubro',
    duration: '5-7 dias recomendados',
    description: 'Fernando de Noronha é um arquipélago brasileiro localizado no estado de Pernambuco, famoso por suas águas cristalinas, vida marinha exuberante e paisagens de tirar o fôlego. Considerado Patrimônio Mundial Natural da UNESCO, é um dos destinos mais exclusivos e preservados do Brasil.',
    highlights: [
      'Mergulho com golfinhos rotadores',
      'Praias paradisíacas e preservadas',
      'Vida marinha única no mundo',
      'Trilhas ecológicas espetaculares',
      'Pôr do sol no Forte do Boldró',
      'Projeto Tamar de preservação'
    ],
    activities: [
      {
        name: 'Mergulho e Snorkeling',
        icon: Waves,
        description: 'Explore as águas cristalinas e encontre tartarugas, golfinhos e peixes tropicais'
      },
      {
        name: 'Trilhas Ecológicas',
        icon: Mountain,
        description: 'Caminhe por trilhas preservadas com vistas espetaculares do arquipélago'
      },
      {
        name: 'Fotografia de Natureza',
        icon: Camera,
        description: 'Capture momentos únicos da fauna e flora local'
      },
      {
        name: 'Gastronomia Local',
        icon: Utensils,
        description: 'Saboreie pratos típicos com frutos do mar frescos e ingredientes locais'
      }
    ],
    climate: {
      temperature: '26°C a 30°C',
      season: 'Tropical oceânico',
      rainfall: 'Chuvas de dezembro a maio'
    },
    howToGet: {
      flight: 'Voos diretos saindo de Recife ou Natal',
      drive: 'Não há acesso terrestre',
      transfer: 'Transfer do aeroporto incluído nos pacotes'
    },
    tips: [
      'Reserve com antecedência - apenas 420 visitantes por dia',
      'Leve protetor solar biodegradável',
      'Respeite as regras de preservação ambiental',
      'Melhor época: março a outubro para mergulho'
    ],
    packages: [
      {
        id: 'noronha-premium',
        title: 'Fernando de Noronha Premium',
        duration: '7 dias / 6 noites',
        price: 'R$ 4.890',
        includes: ['Voos', 'Hotel 5*', 'Mergulho', 'Transfers', 'Passeios']
      },
      {
        id: 'noronha-essencial',
        title: 'Noronha Essencial',
        duration: '5 dias / 4 noites',
        price: 'R$ 3.290',
        includes: ['Voos', 'Pousada', 'Principais passeios', 'Transfers']
      }
    ]
  },
  'jericoacoara': {
    id: 'jericoacoara',
    name: 'Jericoacoara',
    state: 'Ceará',
    region: 'Nordeste',
    images: [jericoacoaraImg, jericoacoaraImg, jericoacoaraImg],
    heroImage: jericoacoaraImg,
    rating: 4.8,
    reviewCount: 287,
    bestTime: 'Julho a Janeiro',
    duration: '4-6 dias recomendados',
    description: 'Jericoacoara é uma vila de pescadores que se tornou um dos destinos mais famosos do Ceará. Conhecida por suas dunas douradas, lagoas cristalinas e ventos constantes que fazem dela um paraíso para os praticantes de esportes aquáticos.',
    highlights: [
      'Pôr do sol na Duna do Pôr do Sol',
      'Kitesurf e windsurfing',
      'Lagoa Azul e Lagoa do Paraíso',
      'Passeio de buggy pelas dunas',
      'Vila rústica e charmosa',
      'Carimã e outros pontos místicos'
    ],
    activities: [
      {
        name: 'Esportes Aquáticos',
        icon: Waves,
        description: 'Kitesurf, windsurfing e stand up paddle nas águas ideais'
      },
      {
        name: 'Passeio de Buggy',
        icon: Car,
        description: 'Explore dunas e lagoas em aventura off-road emocionante'
      },
      {
        name: 'Contemplação do Pôr do Sol',
        icon: Sun,
        description: 'Assista ao espetáculo diário na famosa Duna do Pôr do Sol'
      }
    ],
    climate: {
      temperature: '25°C a 32°C',
      season: 'Tropical semiárido',
      rainfall: 'Chuvas de janeiro a maio'
    },
    howToGet: {
      flight: 'Voo até Fortaleza + transfer de 4x4',
      drive: 'Carro até Jijoca + transfer 4x4',
      transfer: 'Transfer em veículo 4x4 obrigatório'
    },
    tips: [
      'Use protetor solar - o sol é muito forte',
      'Leve roupas leves e confortáveis',
      'Prepare-se para ruas de areia',
      'Melhor época para kitesurf: julho a janeiro'
    ],
    packages: [
      {
        id: 'jeri-adventure',
        title: 'Jericoacoara Aventura',
        duration: '5 dias / 4 noites',
        price: 'R$ 2.390',
        includes: ['Transfer 4x4', 'Pousada', 'Passeios', 'Guia']
      }
    ]
  }
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const destination = slug ? destinationsData[slug] : null;

  useEffect(() => {
    if (!destination) {
      navigate('/');
    }
  }, [destination, navigate]);

  if (!destination) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={destination.heroImage} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Button
          onClick={() => navigate('/')}
          className="absolute top-24 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {destination.state}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold">{destination.rating}</span>
                  <span className="text-white/80 ml-1">({destination.reviewCount} avaliações)</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
                  variant="outline"
                  size="sm"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30"
                  variant="outline"
                  size="sm"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <h1 className="font-montserrat font-bold text-5xl md:text-6xl mb-4">
              {destination.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{destination.region}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Melhor época: {destination.bestTime}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{destination.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="sobre" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sobre">Sobre</TabsTrigger>
                <TabsTrigger value="atividades">Atividades</TabsTrigger>
                <TabsTrigger value="clima">Clima</TabsTrigger>
                <TabsTrigger value="como-chegar">Como Chegar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sobre" className="mt-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-montserrat font-bold text-2xl mb-4">Sobre {destination.name}</h2>
                    <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                      {destination.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-montserrat font-semibold text-xl mb-4">Destaques</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span className="font-inter text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="atividades" className="mt-8">
                <div className="space-y-6">
                  <h2 className="font-montserrat font-bold text-2xl">O que fazer</h2>
                  <div className="grid gap-6">
                    {destination.activities.map((activity, index) => (
                      <Card key={index} className="hover-lift">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-primary/10 rounded-lg p-3">
                              <activity.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-montserrat font-semibold text-lg mb-2">
                                {activity.name}
                              </h4>
                              <p className="font-inter text-muted-foreground">
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="clima" className="mt-8">
                <div className="space-y-6">
                  <h2 className="font-montserrat font-bold text-2xl">Informações Climáticas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Thermometer className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Temperatura</h4>
                        <p className="text-muted-foreground">{destination.climate.temperature}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Sun className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Clima</h4>
                        <p className="text-muted-foreground">{destination.climate.season}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Waves className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Chuvas</h4>
                        <p className="text-muted-foreground">{destination.climate.rainfall}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="como-chegar" className="mt-8">
                <div className="space-y-6">
                  <h2 className="font-montserrat font-bold text-2xl">Como Chegar</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Plane className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-2">De Avião</h4>
                            <p className="text-muted-foreground">{destination.howToGet.flight}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Car className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-2">De Carro</h4>
                            <p className="text-muted-foreground">{destination.howToGet.drive}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Users className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h4 className="font-semibold mb-2">Transfer</h4>
                            <p className="text-muted-foreground">{destination.howToGet.transfer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-montserrat font-semibold text-lg mb-4">Dicas Importantes</h3>
                    <div className="space-y-2">
                      {destination.tips.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <Info className="h-5 w-5 text-accent mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-muted-foreground">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Quick Actions */}
              <Card className="card-gradient">
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-semibold text-lg mb-4">Planeje sua viagem</h3>
                  <div className="space-y-3">
                    <Button className="w-full btn-hero">
                      <Calendar className="h-4 w-4 mr-2" />
                      Solicitar Orçamento
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Falar com Especialista
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Packages */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-semibold text-lg mb-4">Pacotes Disponíveis</h3>
                  <div className="space-y-4">
                    {destination.packages.map((pkg, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                        <h4 className="font-semibold mb-2">{pkg.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{pkg.duration}</p>
                        <div className="text-lg font-bold text-primary mb-3">{pkg.price}</div>
                        <div className="text-xs text-muted-foreground mb-3">
                          Inclui: {pkg.includes.join(', ')}
                        </div>
                        <Button size="sm" className="w-full">Ver Detalhes</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gradient-ocean text-white">
                <CardContent className="p-6">
                  <h3 className="font-montserrat font-semibold text-lg mb-4">Precisa de ajuda?</h3>
                  <p className="text-white/90 mb-4">
                    Nossos especialistas estão prontos para criar a viagem perfeita para você.
                  </p>
                  <Button className="w-full bg-white text-primary hover:bg-gray-100">
                    WhatsApp: (81) 99876-5432
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;