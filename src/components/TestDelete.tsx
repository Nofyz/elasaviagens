import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Trash2 } from 'lucide-react';
import { destinationsApi } from '@/lib/supabase';

export const TestDelete: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testDelete = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Primeiro, vamos buscar todos os destinos
      const destinations = await destinationsApi.getAll();
      console.log('Destinos encontrados:', destinations);

      if (destinations.length === 0) {
        setError('Nenhum destino encontrado para testar');
        return;
      }

      // Pegar o primeiro destino para testar
      const testDestination = destinations[0];
      console.log('Testando deletar destino:', testDestination);

      // Tentar deletar
      await destinationsApi.delete(testDestination.id);
      
      setResult(`Destino "${testDestination.name}" deletado com sucesso!`);
      
      // Verificar se realmente foi deletado
      setTimeout(async () => {
        try {
          const remainingDestinations = await destinationsApi.getAll();
          console.log('Destinos restantes após deletar:', remainingDestinations);
          
          const stillExists = remainingDestinations.find(d => d.id === testDestination.id);
          if (stillExists) {
            setError('Destino ainda existe no banco após tentativa de deletar');
          } else {
            setResult(prev => prev + ' - Confirmado: destino removido do banco');
          }
        } catch (verifyError) {
          console.error('Erro ao verificar se destino foi deletado:', verifyError);
        }
      }, 1000);

    } catch (err: any) {
      console.error('Erro no teste de deletar:', err);
      setError(`Erro: ${err.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Teste de Deletar</CardTitle>
          <CardDescription>
            Testa a funcionalidade de deletar destinos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <Alert>
              <AlertDescription>{result}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={testDelete} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Testar Deletar
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Este teste irá:</p>
            <ol className="list-decimal list-inside mt-2 text-left">
              <li>Buscar todos os destinos</li>
              <li>Deletar o primeiro destino</li>
              <li>Verificar se foi realmente deletado</li>
              <li>Mostrar o resultado no console</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestDelete; 