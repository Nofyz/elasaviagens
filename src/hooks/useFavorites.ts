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
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
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
    } finally {
      setIsToggling(false);
    }
  };

  const isFavorite = (destinationId: string) => {
    return favorites.has(destinationId);
  };

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
    isToggling
  };
}; 