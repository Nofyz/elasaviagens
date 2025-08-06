import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Destination = Database['public']['Tables']['destinations']['Row'];
type DestinationInsert = Database['public']['Tables']['destinations']['Insert'];
type DestinationUpdate = Database['public']['Tables']['destinations']['Update'];

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

type Admin = Database['public']['Tables']['admins']['Row'];
type AdminInsert = Database['public']['Tables']['admins']['Insert'];

type Favorite = Database['public']['Tables']['favorites']['Row'];
type FavoriteInsert = Database['public']['Tables']['favorites']['Insert'];

// Funções para Destinos
export const destinationsApi = {
  // Buscar todos os destinos
  async getAll(): Promise<Destination[]> {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('destinationsApi.getAll: Erro:', error);
      throw error;
    }
    
    return data || [];
  },

  // Buscar destino por ID
  async getById(id: string): Promise<Destination | null> {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo destino
  async create(destination: DestinationInsert): Promise<Destination> {
    const { data, error } = await supabase
      .from('destinations')
      .insert(destination)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar destino
  async update(id: string, updates: DestinationUpdate): Promise<Destination> {
    const { data, error } = await supabase
      .from('destinations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar destino
  async delete(id: string): Promise<void> {
    console.log('API: Tentando deletar destino com ID:', id);
    
    // Primeiro, vamos verificar se o destino existe
    const { data: existingDestination, error: fetchError } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();
    
    console.log('API: Destino encontrado antes de deletar:', existingDestination);
    
    if (fetchError) {
      console.error('API: Erro ao buscar destino:', fetchError);
      throw fetchError;
    }
    
    if (!existingDestination) {
      throw new Error('Destino não encontrado');
    }
    
    // Tentar deletar (sem .select() para evitar problemas)
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);
    
    console.log('API: Resposta do Supabase DELETE:', { error });
    
    if (error) {
      console.error('API: Erro ao deletar destino:', error);
      console.error('API: Detalhes do erro:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }
    
    console.log('API: Destino deletado com sucesso');
  },

  // Buscar destinos por localização
  async getByLocation(location: string): Promise<Destination[]> {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .ilike('location', `%${location}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar destinos por faixa de preço
  async getByPriceRange(minPrice: number, maxPrice: number): Promise<Destination[]> {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .gte('price', minPrice)
      .lte('price', maxPrice)
      .order('price', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};

// Funções para Usuários
export const usersApi = {
  // Buscar todos os usuários
  async getAll(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar usuário por ID
  async getById(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Buscar usuário por email
  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo usuário
  async create(user: UserInsert): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar usuário
  async update(id: number, updates: UserUpdate): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar usuário
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Funções para Admins
export const adminsApi = {
  // Buscar admin por email
  async getByEmail(email: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Buscar admin por username ou email
  async getByUsernameOrEmail(identifier: string): Promise<Admin | null> {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .or(`username.eq.${identifier},email.eq.${identifier}`)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo admin
  async create(admin: AdminInsert): Promise<Admin> {
    const { data, error } = await supabase
      .from('admins')
      .insert(admin)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Funções para Favoritos
export const favoritesApi = {
  // Buscar favoritos de um usuário
  async getByUserId(userId: number): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar destinos favoritos de um usuário com dados completos
  async getDestinationsByUserId(userId: number): Promise<Destination[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        destination_id,
        destinations (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data?.map(item => item.destinations).filter(Boolean) || [];
  },

  // Adicionar destino aos favoritos
  async add(userId: number, destinationId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        destination_id: destinationId
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Remover destino dos favoritos
  async remove(userId: number, destinationId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('destination_id', destinationId);
    
    if (error) throw error;
  },

  // Verificar se um destino está nos favoritos
  async isFavorite(userId: number, destinationId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destinationId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
};

// Função para testar a conexão
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro na conexão com Supabase:', error);
    return false;
  }
};

export { supabase }; 