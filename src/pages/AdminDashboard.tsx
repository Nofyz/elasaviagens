import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MapPin, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2,
  BarChart3,
  Calendar
} from 'lucide-react';
import { destinationsApi, usersApi } from '@/lib/supabase';
import type { Database } from '@/integrations/supabase/types';

type Destination = Database['public']['Tables']['destinations']['Row'];
type User = Database['public']['Tables']['users']['Row'];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<any>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDestinations: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Verificar se o admin está logado
    const adminData = localStorage.getItem('admin');
    
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    setAdmin(JSON.parse(adminData));
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Carregar destinos
      const destinationsData = await destinationsApi.getAll();
      setDestinations(destinationsData);
      
      // Carregar usuários
      const usersData = await usersApi.getAll();
      setUsers(usersData);
      
      // Calcular estatísticas
      setStats({
        totalDestinations: destinationsData.length,
        totalUsers: usersData.length
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const handleDeleteDestination = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este destino?')) {
      try {
        console.log('Tentando deletar destino com ID:', id);
        await destinationsApi.delete(id);
        console.log('Destino deletado com sucesso');
        
        setDestinations(prev => prev.filter(dest => dest.id !== id));
        // Atualizar estatísticas após deletar
        setStats(prev => ({
          ...prev,
          totalDestinations: prev.totalDestinations - 1
        }));
        
        alert('Destino deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar destino:', error);
        alert(`Erro ao deletar destino: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      try {
        await usersApi.delete(id);
        setUsers(prev => prev.filter(user => user.id !== id));
        // Atualizar estatísticas após deletar
        setStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Erro ao deletar usuário. Tente novamente.');
      }
    }
  };

  const handleEditDestination = (destination: Destination) => {
    navigate(`/admin/destinations/edit/${destination.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Dashboard Administrativo</h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, {admin?.username || admin?.email}
                </p>
              </div>
            </div>
                         <Button 
               variant="outline" 
               onClick={handleLogout}
               className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
             >
               <LogOut className="h-4 w-4 mr-2" />
               Sair
             </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Destinos</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDestinations}</div>
              <p className="text-xs text-muted-foreground">
                Destinos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Usuários registrados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="destinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="destinations">Destinos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Destinos</h2>
                             <Button 
                 onClick={() => navigate('/registrar-destino', { state: { fromAdmin: true } })}
                 className="hover:scale-105 transition-all duration-200"
               >
                 <Plus className="h-4 w-4 mr-2" />
                 Novo Destino
               </Button>
            </div>

            <div className="grid gap-4">
              {destinations.map((destination) => (
                <Card key={destination.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{destination.name}</h3>
                          <p className="text-sm text-muted-foreground">{destination.location}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">
                              {destination.duration} dias
                            </Badge>
                            <Badge variant="outline">
                              R$ {destination.price.toLocaleString('pt-BR')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                                             <div className="flex gap-2">
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => handleEditDestination(destination)}
                           className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                         >
                           <Edit className="h-4 w-4" />
                         </Button>
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => handleDeleteDestination(destination.id)}
                           className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105"
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
            </div>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {user.first_name} {user.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Username: {user.username}
                          </p>
                        </div>
                      </div>
                                             <div className="flex gap-2">
                         <Button 
                           variant="outline" 
                           size="sm"
                           onClick={() => handleDeleteUser(user.id)}
                           className="hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105"
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Analytics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estatísticas Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Destinos Ativos:</span>
                      <Badge variant="secondary">{stats.totalDestinations}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Usuários Registrados:</span>
                      <Badge variant="secondary">{stats.totalUsers}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Atividade Recente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Novo destino adicionado</span>
                      <span className="text-muted-foreground">2h atrás</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Novo usuário registrado</span>
                      <span className="text-muted-foreground">4h atrás</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Destino atualizado</span>
                      <span className="text-muted-foreground">1d atrás</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard; 