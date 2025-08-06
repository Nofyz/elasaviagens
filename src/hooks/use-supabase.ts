import { useState, useEffect } from 'react';
import { destinationsApi, usersApi, favoritesApi, adminsApi, testConnection } from '@/lib/supabase';
import type { Database } from '@/integrations/supabase/types';

type Destination = Database['public']['Tables']['destinations']['Row'];
type User = Database['public']['Tables']['users']['Row'];
type Favorite = Database['public']['Tables']['favorites']['Row'];

// Hook para gerenciar estado de loading e erro
const useApiState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeWithState = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeWithState };
};

// Hook para destinos
export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const { loading, error, executeWithState } = useApiState();

  const fetchDestinations = async () => {
    const result = await executeWithState(() => destinationsApi.getAll());
    if (result) {
      setDestinations(result);
    }
  };

  const fetchByLocation = async (location: string) => {
    const result = await executeWithState(() => destinationsApi.getByLocation(location));
    if (result) {
      setDestinations(result);
    }
  };

  const fetchByPriceRange = async (minPrice: number, maxPrice: number) => {
    const result = await executeWithState(() => destinationsApi.getByPriceRange(minPrice, maxPrice));
    if (result) {
      setDestinations(result);
    }
  };

  const createDestination = async (destination: Database['public']['Tables']['destinations']['Insert']) => {
    const result = await executeWithState(() => destinationsApi.create(destination));
    if (result) {
      setDestinations(prev => [result, ...prev]);
    }
    return result;
  };

  const updateDestination = async (id: string, updates: Database['public']['Tables']['destinations']['Update']) => {
    const result = await executeWithState(() => destinationsApi.update(id, updates));
    if (result) {
      setDestinations(prev => prev.map(dest => dest.id === id ? result : dest));
    }
    return result;
  };

  const deleteDestination = async (id: string) => {
    const result = await executeWithState(() => destinationsApi.delete(id));
    if (result !== null) {
      setDestinations(prev => prev.filter(dest => dest.id !== id));
    }
    return result;
  };

  return {
    destinations,
    loading,
    error,
    fetchDestinations,
    fetchByLocation,
    fetchByPriceRange,
    createDestination,
    updateDestination,
    deleteDestination
  };
};

// Hook para um destino específico
export const useDestination = (id: string | null) => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const { loading, error, executeWithState } = useApiState();

  const fetchDestination = async () => {
    if (!id) return;
    const result = await executeWithState(() => destinationsApi.getById(id));
    if (result) {
      setDestination(result);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDestination();
    }
  }, [id]);

  return {
    destination,
    loading,
    error,
    fetchDestination
  };
};

// Hook para usuários
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { loading, error, executeWithState } = useApiState();

  const fetchUsers = async () => {
    const result = await executeWithState(() => usersApi.getAll());
    if (result) {
      setUsers(result);
    }
  };

  const createUser = async (user: Database['public']['Tables']['users']['Insert']) => {
    const result = await executeWithState(() => usersApi.create(user));
    if (result) {
      setUsers(prev => [result, ...prev]);
    }
    return result;
  };

  const updateUser = async (id: number, updates: Database['public']['Tables']['users']['Update']) => {
    const result = await executeWithState(() => usersApi.update(id, updates));
    if (result) {
      setUsers(prev => prev.map(user => user.id === id ? result : user));
    }
    return result;
  };

  const deleteUser = async (id: number) => {
    const result = await executeWithState(() => usersApi.delete(id));
    if (result !== null) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
    return result;
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};

// Hook para favoritos
export const useFavorites = (userId: number | null) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteDestinations, setFavoriteDestinations] = useState<Destination[]>([]);
  const { loading, error, executeWithState } = useApiState();

  const fetchFavorites = async () => {
    if (!userId) return;
    const result = await executeWithState(() => favoritesApi.getByUserId(userId));
    if (result) {
      setFavorites(result);
    }
  };

  const fetchFavoriteDestinations = async () => {
    if (!userId) return;
    const result = await executeWithState(() => favoritesApi.getDestinationsByUserId(userId));
    if (result) {
      setFavoriteDestinations(result);
    }
  };

  const addToFavorites = async (destinationId: string) => {
    if (!userId) return;
    const result = await executeWithState(() => favoritesApi.add(userId, destinationId));
    if (result) {
      setFavorites(prev => [result, ...prev]);
      // Recarregar destinos favoritos
      await fetchFavoriteDestinations();
    }
    return result;
  };

  const removeFromFavorites = async (destinationId: string) => {
    if (!userId) return;
    const result = await executeWithState(() => favoritesApi.remove(userId, destinationId));
    if (result !== null) {
      setFavorites(prev => prev.filter(fav => fav.destination_id !== destinationId));
      // Recarregar destinos favoritos
      await fetchFavoriteDestinations();
    }
    return result;
  };

  const checkIsFavorite = async (destinationId: string): Promise<boolean> => {
    if (!userId) return false;
    try {
      return await favoritesApi.isFavorite(userId, destinationId);
    } catch (err) {
      console.error('Erro ao verificar favorito:', err);
      return false;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
      fetchFavoriteDestinations();
    }
  }, [userId]);

  return {
    favorites,
    favoriteDestinations,
    loading,
    error,
    fetchFavorites,
    fetchFavoriteDestinations,
    addToFavorites,
    removeFromFavorites,
    checkIsFavorite
  };
};

// Hook para testar conexão
export const useConnectionTest = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { loading, error, executeWithState } = useApiState();

  const testConnectionStatus = async () => {
    const result = await executeWithState(() => testConnection());
    setIsConnected(result);
    return result;
  };

  useEffect(() => {
    testConnectionStatus();
  }, []);

  return {
    isConnected,
    loading,
    error,
    testConnectionStatus
  };
}; 