import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isToggling, setIsToggling] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      } catch (error) {
        console.error('Error loading favorites:', error);
        // Clear corrupted data
        localStorage.removeItem('favorites');
        setFavorites(new Set());
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    const favoritesArray = Array.from(favorites);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }, [favorites]);

  const toggleFavorite = async (destinationId: string) => {
    setIsToggling(true);
    
    try {
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(destinationId)) {
          newFavorites.delete(destinationId);
        } else {
          newFavorites.add(destinationId);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const isFavorite = (destinationId: string) => {
    return favorites.has(destinationId);
  };

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    isToggling,
    clearFavorites
  };
}; 