# Configuração do Banco de Dados - Elas A Viagens

## Visão Geral

Este projeto utiliza o Supabase como banco de dados backend. A configuração está completa e pronta para uso.

## Estrutura do Banco

### Tabelas Principais

1. **`destinations`** - Destinos turísticos
   - `id` (uuid, PK)
   - `name` (text)
   - `location` (text)
   - `description` (text)
   - `price` (numeric)
   - `duration` (int4)
   - `highlights` (text[])
   - `image_url` (text, nullable)
   - `min_people` (int4)
   - `max_people` (int4)
   - `rating` (numeric)
   - `review_count` (int4)
   - `included_items` (text[])
   - `original_price` (numeric)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

2. **`users`** - Usuários do sistema
   - `id` (int4, PK)
   - `username` (text, unique)
   - `email` (text, unique)
   - `password` (text)
   - `first_name` (text)
   - `last_name` (text)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

3. **`admins`** - Administradores
   - `id` (int4, PK)
   - `username` (text, unique)
   - `email` (text, unique)
   - `password` (text)
   - `created_at` (timestamptz)

4. **`favorites`** - Favoritos dos usuários
   - `id` (uuid, PK)
   - `user_id` (int4, FK -> users.id)
   - `destination_id` (uuid, FK -> destinations.id)
   - `created_at` (timestamptz)

## Arquivos de Configuração

### 1. Cliente Supabase
**Arquivo:** `src/integrations/supabase/client.ts`
- Configuração do cliente Supabase
- URL e chave de API configuradas
- Configurações de autenticação

### 2. Tipos TypeScript
**Arquivo:** `src/integrations/supabase/types.ts`
- Tipos gerados automaticamente pelo Supabase
- Inclui todas as tabelas e relacionamentos
- Tipos para Row, Insert e Update

### 3. Utilitários da API
**Arquivo:** `src/lib/supabase.ts`
- Funções helpers para operações CRUD
- APIs organizadas por entidade (destinations, users, favorites, admins)
- Função de teste de conexão

### 4. Hooks React
**Arquivo:** `src/hooks/use-supabase.ts`
- Hooks personalizados para uso nos componentes
- Gerenciamento de estado (loading, error)
- Hooks específicos para cada entidade

## Como Usar

### 1. Importar o Cliente Supabase
```typescript
import { supabase } from '@/integrations/supabase/client';
```

### 2. Usar os Hooks nos Componentes
```typescript
import { useDestinations, useUsers, useFavorites } from '@/hooks/use-supabase';

const MyComponent = () => {
  const { destinations, loading, error, fetchDestinations } = useDestinations();
  
  // O hook já gerencia loading, error e dados
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {destinations.map(dest => (
        <div key={dest.id}>{dest.name}</div>
      ))}
    </div>
  );
};
```

### 3. Usar as APIs Diretamente
```typescript
import { destinationsApi } from '@/lib/supabase';

// Buscar todos os destinos
const destinations = await destinationsApi.getAll();

// Criar novo destino
const newDestination = await destinationsApi.create({
  name: "Fernando de Noronha",
  location: "Pernambuco",
  description: "Paraíso tropical",
  price: 5000,
  duration: 7,
  highlights: ["Praias", "Mergulho", "Passeios"]
});
```

### 4. Testar a Conexão
Acesse `/teste-banco` no navegador para verificar se a conexão está funcionando.

## Operações Disponíveis

### Destinos (`destinationsApi`)
- `getAll()` - Buscar todos os destinos
- `getById(id)` - Buscar destino por ID
- `create(destination)` - Criar novo destino
- `update(id, updates)` - Atualizar destino
- `delete(id)` - Deletar destino
- `getByLocation(location)` - Buscar por localização
- `getByPriceRange(min, max)` - Buscar por faixa de preço

### Usuários (`usersApi`)
- `getAll()` - Buscar todos os usuários
- `getById(id)` - Buscar usuário por ID
- `getByEmail(email)` - Buscar usuário por email
- `create(user)` - Criar novo usuário
- `update(id, updates)` - Atualizar usuário
- `delete(id)` - Deletar usuário

### Favoritos (`favoritesApi`)
- `getByUserId(userId)` - Buscar favoritos de um usuário
- `getDestinationsByUserId(userId)` - Buscar destinos favoritos com dados completos
- `add(userId, destinationId)` - Adicionar aos favoritos
- `remove(userId, destinationId)` - Remover dos favoritos
- `isFavorite(userId, destinationId)` - Verificar se é favorito

### Admins (`adminsApi`)
- `getByEmail(email)` - Buscar admin por email
- `create(admin)` - Criar novo admin

## Hooks Disponíveis

### `useDestinations()`
```typescript
const { 
  destinations, 
  loading, 
  error, 
  fetchDestinations,
  createDestination,
  updateDestination,
  deleteDestination 
} = useDestinations();
```

### `useDestination(id)`
```typescript
const { 
  destination, 
  loading, 
  error, 
  fetchDestination 
} = useDestination("destination-id");
```

### `useUsers()`
```typescript
const { 
  users, 
  loading, 
  error, 
  fetchUsers,
  createUser,
  updateUser,
  deleteUser 
} = useUsers();
```

### `useFavorites(userId)`
```typescript
const { 
  favorites,
  favoriteDestinations,
  loading, 
  error, 
  addToFavorites,
  removeFromFavorites,
  checkIsFavorite 
} = useFavorites(userId);
```

### `useConnectionTest()`
```typescript
const { 
  isConnected, 
  loading, 
  error, 
  testConnectionStatus 
} = useConnectionTest();
```

## Exemplo de Uso Completo

```typescript
import React from 'react';
import { useDestinations } from '@/hooks/use-supabase';

const DestinationsList = () => {
  const { destinations, loading, error, fetchDestinations } = useDestinations();

  React.useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {destinations.map(destination => (
        <div key={destination.id}>
          <h3>{destination.name}</h3>
          <p>{destination.location}</p>
          <p>R$ {destination.price}</p>
        </div>
      ))}
    </div>
  );
};
```

## Status da Configuração

✅ **Concluído:**
- Cliente Supabase configurado
- Tipos TypeScript atualizados
- APIs utilitárias criadas
- Hooks React implementados
- Componente de teste criado
- Integração com componente existente

🔧 **Próximos Passos:**
- Implementar autenticação de usuários
- Adicionar validação de dados
- Implementar cache de dados
- Adicionar paginação
- Implementar busca e filtros avançados

## Testando a Conexão

1. Execute o projeto: `npm run dev`
2. Acesse: `http://localhost:8080/teste-banco`
3. Verifique se a conexão está funcionando
4. Teste buscar destinos do banco

## Troubleshooting

### Erro de Conexão
- Verifique se as credenciais do Supabase estão corretas
- Confirme se o projeto está ativo no Supabase
- Verifique se as tabelas existem no banco

### Erro de Tipos
- Execute `npx supabase gen types typescript` para regenerar os tipos
- Verifique se o arquivo `types.ts` está atualizado

### Erro de CORS
- Configure as políticas de CORS no Supabase
- Verifique se o domínio está na lista de permitidos 