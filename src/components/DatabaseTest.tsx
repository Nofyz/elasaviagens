import React from 'react';
import { useConnectionTest, useDestinations } from '@/hooks/use-supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, Database } from 'lucide-react';

export const DatabaseTest: React.FC = () => {
  const { isConnected, loading: connectionLoading, error: connectionError, testConnectionStatus } = useConnectionTest();
  const { destinations, loading: destinationsLoading, error: destinationsError, fetchDestinations } = useDestinations();

  const handleTestConnection = () => {
    testConnectionStatus();
  };

  const handleFetchDestinations = () => {
    fetchDestinations();
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Teste de Conexão com Banco de Dados
          </CardTitle>
          <CardDescription>
            Verifique se a conexão com o Supabase está funcionando corretamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status da Conexão */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status da Conexão:</span>
              {connectionLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isConnected ? (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Conectado</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600">
                  <XCircle className="h-4 w-4" />
                  <span>Desconectado</span>
                </div>
              )}
            </div>
            <Button onClick={handleTestConnection} disabled={connectionLoading}>
              {connectionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Testar Conexão'}
            </Button>
          </div>

          {/* Erro de Conexão */}
          {connectionError && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-700">
                <strong>Erro de Conexão:</strong> {connectionError}
              </p>
            </div>
          )}

          {/* Teste de Destinos */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Teste de Destinos</h3>
                <p className="text-sm text-gray-600">
                  Buscar destinos da tabela para testar a conexão
                </p>
              </div>
              <Button onClick={handleFetchDestinations} disabled={destinationsLoading}>
                {destinationsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Buscar Destinos'}
              </Button>
            </div>

            {/* Erro de Destinos */}
            {destinationsError && (
              <div className="rounded-md bg-red-50 p-3 mb-4">
                <p className="text-sm text-red-700">
                  <strong>Erro ao buscar destinos:</strong> {destinationsError}
                </p>
              </div>
            )}

            {/* Lista de Destinos */}
            {destinations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Destinos encontrados ({destinations.length}):</h4>
                <div className="grid gap-2">
                  {destinations.slice(0, 5).map((destination) => (
                    <div key={destination.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{destination.name}</p>
                        <p className="text-sm text-gray-600">{destination.location}</p>
                      </div>
                      <Badge variant="secondary">
                        R$ {destination.price.toLocaleString('pt-BR')}
                      </Badge>
                    </div>
                  ))}
                  {destinations.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      ... e mais {destinations.length - 5} destinos
                    </p>
                  )}
                </div>
              </div>
            )}

            {destinations.length === 0 && !destinationsLoading && !destinationsError && (
              <div className="text-center py-8 text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>Nenhum destino encontrado</p>
                <p className="text-sm">Clique em "Buscar Destinos" para testar</p>
              </div>
            )}
          </div>

          {/* Resumo do Status */}
          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Resumo do Status:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Conexão com Supabase:</span>
                <Badge variant={isConnected ? "default" : "destructive"}>
                  {isConnected ? "OK" : "Falha"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Tabela de Destinos:</span>
                <Badge variant={destinationsError ? "destructive" : "default"}>
                  {destinationsError ? "Erro" : "OK"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Destinos Carregados:</span>
                <Badge variant="outline">
                  {destinations.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Status Geral:</span>
                <Badge variant={isConnected && !destinationsError ? "default" : "destructive"}>
                  {isConnected && !destinationsError ? "Funcionando" : "Com Problemas"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 