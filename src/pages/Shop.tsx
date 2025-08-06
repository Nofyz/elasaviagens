import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '@/hooks/useFavorites';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, Star, Users, Clock, Heart, Plane, Filter, 
  Search, SlidersHorizontal, X 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


// Fallback images
const fallbackImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  original_price?: number;
  duration: number;
  min_people: number;
  max_people: number;
  rating: number;
  review_count: number;
  included_items: string[];
  highlights: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface FilterState {
  search: string;
  region: string;
  priceRange: [number, number];
  duration: string;
  groupSize: string;
  rating: string;
  includes: string[];
  sortBy: string;
  onlyFavorites: boolean;
}

const Shop = () => {
  const [showFilters, setShowFilters] = useState(true);
  const { favorites, toggleFavorite, isFavorite, isToggling } = useFavorites();
  const location = useLocation();
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    region: 'all',
    priceRange: [0, 5000],
    duration: 'all',
    groupSize: 'all',
    rating: 'all',
    includes: [],
    sortBy: 'name',
    onlyFavorites: false
  });

  // Check URL parameters to set initial filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get('filter');
    
    console.log('URL location:', location.pathname + location.search);
    console.log('Filter param:', filterParam);
    
    if (filterParam === 'favoritos') {
      console.log('Ativando filtro de favoritos');
      setFilters(prev => ({ ...prev, onlyFavorites: true }));
    } else {
      // Reset favorites filter if not in URL
      setFilters(prev => ({ ...prev, onlyFavorites: false }));
    }
  }, [location]);

  // Fetch destinations
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    if (!destinations.length) return { regions: [], includes: [] };
    
    const regions = Array.from(new Set(destinations.map((d: Destination) => 
      d.location.split(' - ')[0] || d.location
    ))).sort();
    
    const includes = Array.from(new Set(
      destinations.flatMap((d: Destination) => d.included_items || [])
    )).sort();

    return { regions, includes };
  }, [destinations]);

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let filtered = destinations.filter((dest: Destination) => {
      // Search filter
      if (filters.search && !dest.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !dest.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Region filter
      if (filters.region && filters.region !== 'all' && !dest.location.toLowerCase().includes(filters.region.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (dest.price < filters.priceRange[0] || dest.price > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      if (filters.duration && filters.duration !== 'all') {
        const duration = parseInt(filters.duration);
        if (duration === 3 && dest.duration > 3) return false;
        if (duration === 7 && (dest.duration < 4 || dest.duration > 7)) return false;
        if (duration === 14 && dest.duration < 8) return false;
      }

      // Group size filter
      if (filters.groupSize && filters.groupSize !== 'all') {
        const size = parseInt(filters.groupSize);
        if (size === 2 && dest.max_people < 2) return false;
        if (size === 4 && (dest.max_people < 4 || dest.min_people > 4)) return false;
        if (size === 8 && dest.max_people < 8) return false;
      }

      // Rating filter
      if (filters.rating && filters.rating !== 'all' && dest.rating < parseFloat(filters.rating)) {
        return false;
      }

      // Includes filter
      if (filters.includes.length > 0) {
        const hasInclude = filters.includes.some(include => 
          dest.included_items?.some(item => 
            item.toLowerCase().includes(include.toLowerCase())
          )
        );
        if (!hasInclude) return false;
      }

      // Favorites filter
      if (filters.onlyFavorites && !isFavorite(dest.id)) {
        return false;
      }

      return true;
    });

    // Sort destinations
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a: Destination, b: Destination) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a: Destination, b: Destination) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a: Destination, b: Destination) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a: Destination, b: Destination) => a.duration - b.duration);
        break;
      default:
        filtered.sort((a: Destination, b: Destination) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [destinations, filters]);



  const clearFilters = () => {
    setFilters({
      search: '',
      region: 'all',
      priceRange: [0, 5000],
      duration: 'all',
      groupSize: 'all',
      rating: 'all',
      includes: [],
      sortBy: 'name',
      onlyFavorites: false
    });
  };

  const getDestinationImage = (destination: Destination, index: number) => {
    return destination.image_url || fallbackImages[index % fallbackImages.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-muted/20 via-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando destinos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block font-dancing text-secondary text-2xl mb-4">
            {filters.onlyFavorites ? 'Meus Favoritos' : 'Nossa Loja'}
          </div>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-gradient-ocean">
            {filters.onlyFavorites ? 'Meus Destinos Favoritos' : 'Todos os Destinos'}
          </h1>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {filters.onlyFavorites 
              ? 'Seus destinos salvos para futuras viagens dos melhores lugares do Nordeste.'
              : 'Explore todos os nossos destinos incríveis do Nordeste brasileiro com filtros personalizados para encontrar a viagem perfeita para você.'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filtros</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Limpar
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Buscar</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Nome ou localização..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Region */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Região</Label>
                    <Select
                      value={filters.region}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as regiões" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as regiões</SelectItem>
                        {filterOptions.regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Preço: R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
                    </Label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      max={5000}
                      min={0}
                      step={100}
                      className="mt-2"
                    />
                  </div>

                  <Separator />

                  {/* Duration */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Duração</Label>
                    <Select
                      value={filters.duration}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Qualquer duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Qualquer duração</SelectItem>
                        <SelectItem value="3">Até 3 dias</SelectItem>
                        <SelectItem value="7">4-7 dias</SelectItem>
                        <SelectItem value="14">8+ dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Group Size */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tamanho do Grupo</Label>
                    <Select
                      value={filters.groupSize}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, groupSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Qualquer tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Qualquer tamanho</SelectItem>
                        <SelectItem value="2">Casal (2 pessoas)</SelectItem>
                        <SelectItem value="4">Família (até 4 pessoas)</SelectItem>
                        <SelectItem value="8">Grupo (8+ pessoas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Rating */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Avaliação Mínima</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            const newRating = filters.rating === star.toString() ? 'all' : star.toString();
                            setFilters(prev => ({ ...prev, rating: newRating }));
                          }}
                          className={`p-1 transition-all duration-200 hover:scale-110 ${
                            parseInt(filters.rating) >= star && filters.rating !== 'all'
                              ? 'text-blue-500 hover:text-blue-600'
                              : 'text-gray-300 hover:text-blue-400'
                          }`}
                        >
                          <Star 
                            className={`h-5 w-5 ${
                              parseInt(filters.rating) >= star && filters.rating !== 'all'
                                ? 'fill-current' 
                                : ''
                            }`} 
                          />
                        </button>
                      ))}
                      {filters.rating !== 'all' && (
                        <button
                          onClick={() => setFilters(prev => ({ ...prev, rating: 'all' }))}
                          className="ml-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    {filters.rating !== 'all' && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {filters.rating}+ estrelas ou mais
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Favorites Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Filtros Especiais</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="only-favorites"
                          checked={filters.onlyFavorites}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({ ...prev, onlyFavorites: !!checked }));
                          }}
                        />
                        <Label htmlFor="only-favorites" className="text-sm cursor-pointer flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          Apenas Favoritos ({favorites.length})
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Includes */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Incluso</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {filterOptions.includes.map((include) => (
                        <div key={include} className="flex items-center space-x-2">
                          <Checkbox
                            id={include}
                            checked={filters.includes.includes(include)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters(prev => ({
                                  ...prev,
                                  includes: [...prev.includes, include]
                                }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  includes: prev.includes.filter(i => i !== include)
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={include} className="text-sm cursor-pointer">
                            {include}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                
                <p className="text-muted-foreground">
                  {filteredDestinations.length} destino{filteredDestinations.length !== 1 ? 's' : ''} encontrado{filteredDestinations.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="rating">Melhor avaliação</SelectItem>
                    <SelectItem value="duration">Duração</SelectItem>
                  </SelectContent>
                </Select>


              </div>
            </div>

            {/* Results */}
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum destino encontrado</h3>
                  <p>Tente ajustar os filtros para encontrar mais resultados.</p>
                </div>
                <Button onClick={clearFilters} variant="outline">
                  Limpar todos os filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map((destination: Destination, index: number) => (
                  <Card 
                    key={destination.id} 
                    className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={getDestinationImage(destination, index)}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(destination.id)}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isFavorite(destination.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-white'
                          }`} 
                        />
                      </button>

                      {/* Price */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="text-lg font-bold text-primary">
                            R$ {destination.price.toFixed(2)}
                          </div>
                          {destination.original_price && (
                            <div className="text-sm text-muted-foreground line-through -mt-1">
                              R$ {destination.original_price.toFixed(2)}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            por pessoa
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 flex-1">
                      <div>
                        {/* Title & Location */}
                        <h3 className="font-montserrat font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                          {destination.name}
                        </h3>
                        
                        <div className="flex items-center text-muted-foreground mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{destination.location}</span>
                        </div>

                        {/* Details */}
                        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{destination.duration} dias</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{destination.min_people}-{destination.max_people} pessoas</span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm font-medium mr-1">{destination.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({destination.review_count} avaliações)
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {destination.description}
                        </p>

                        {/* Includes */}
                        {destination.included_items.length > 0 && (
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-2">Incluso:</div>
                            <div className="flex flex-wrap gap-1">
                              {destination.included_items.slice(0, 3).map((item, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                              {destination.included_items.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{destination.included_items.length - 3} mais
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 mt-auto">
                        <Button className="w-full group/btn hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300">
                          <Plane className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                          Ver Detalhes
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                        >
                          Fazer Orçamento
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;