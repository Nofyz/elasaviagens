import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FavoriteTest = () => {
  const { favorites, toggleFavorite, isFavorite, isToggling } = useFavorites();

  const testDestinations = [
    { id: 'test-1', name: 'Teste 1' },
    { id: 'test-2', name: 'Teste 2' },
    { id: 'test-3', name: 'Teste 3' }
  ];

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Teste de Favoritos</h2>
      
      <div className="space-y-2">
        <p>Favoritos atuais: {favorites.join(', ')}</p>
        <p>Total de favoritos: {favorites.length}</p>
        <p>Status: {isToggling ? 'Carregando...' : 'Pronto'}</p>
      </div>

      <div className="space-y-2">
        {testDestinations.map(dest => (
          <div key={dest.id} className="flex items-center space-x-2 p-2 border rounded">
            <span>{dest.name}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => toggleFavorite(dest.id)}
              disabled={isToggling}
            >
              <Heart 
                className={`h-4 w-4 ${
                  isFavorite(dest.id) 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-400'
                }`} 
              />
            </Button>
            <span className="text-sm">
              {isFavorite(dest.id) ? 'Favoritado' : 'Não favoritado'}
            </span>
          </div>
        ))}
      </div>

      <Button 
        onClick={() => {
          console.log('Favoritos:', favorites);
          console.log('localStorage:', localStorage.getItem('favorites'));
        }}
      >
        Log Favoritos
      </Button>
    </div>
  );
};

export default FavoriteTest; 