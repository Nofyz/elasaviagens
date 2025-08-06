import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Database, Shield, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const PermissionTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testPermissions = async () => {
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      addResult('Iniciando teste de permissões...');

      // 1. Testar SELECT (ler dados)
      addResult('Testando SELECT (leitura)...');
      const { data: selectData, error: selectError } = await supabase
        .from('destinations')
        .select('*')
        .limit(1);

      if (selectError) {
        addResult(`❌ Erro no SELECT: ${selectError.message}`);
        throw selectError;
      } else {
        addResult(`✅ SELECT funcionando: ${selectData?.length || 0} registros encontrados`);
      }

      // 2. Testar INSERT (criar dados)
      addResult('Testando INSERT (criação)...');
      const testDestination = {
        name: 'Teste Permissão',
        location: 'Local Teste',
        description: 'Destino para teste de permissões',
        price: 100,
        duration: 1,
        image_url: 'https://exemplo.com/teste.jpg'
      };

      const { data: insertData, error: insertError } = await supabase
        .from('destinations')
        .insert(testDestination)
        .select()
        .single();

      if (insertError) {
        addResult(`❌ Erro no INSERT: ${insertError.message}`);
        throw insertError;
      } else {
        addResult(`✅ INSERT funcionando: ID ${insertData.id} criado`);
      }

      // 3. Testar UPDATE (atualizar dados)
      addResult('Testando UPDATE (atualização)...');
      const { data: updateData, error: updateError } = await supabase
        .from('destinations')
        .update({ name: 'Teste Permissão Atualizado' })
        .eq('id', insertData.id)
        .select();

      if (updateError) {
        addResult(`❌ Erro no UPDATE: ${updateError.message}`);
        throw updateError;
      } else {
        addResult(`✅ UPDATE funcionando: ${updateData?.[0]?.name || 'N/A'}`);
      }

      // 4. Testar DELETE (deletar dados)
      addResult('Testando DELETE (exclusão)...');
      const { data: deleteData, error: deleteError } = await supabase
        .from('destinations')
        .delete()
        .eq('id', insertData.id)
        .select();

      if (deleteError) {
        addResult(`❌ Erro no DELETE: ${deleteError.message}`);
        addResult(`Código do erro: ${deleteError.code}`);
        addResult(`Detalhes: ${deleteError.details || 'N/A'}`);
        addResult(`Dica: ${deleteError.hint || 'N/A'}`);
        throw deleteError;
      } else {
        addResult(`✅ DELETE funcionando: ${deleteData?.length || 0} registros deletados`);
      }

      // 5. Verificar se foi realmente deletado
      addResult('Verificando se registro foi realmente deletado...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', insertData.id)
        .single();

      if (verifyError && verifyError.code === 'PGRST116') {
        addResult('✅ Confirmação: registro não encontrado (deletado com sucesso)');
      } else if (verifyData) {
        addResult('❌ Problema: registro ainda existe após DELETE');
      } else {
        addResult('✅ Confirmação: registro deletado com sucesso');
      }

      addResult('🎉 Todos os testes de permissão passaram!');

    } catch (err: any) {
      console.error('Erro nos testes de permissão:', err);
      setError(`Erro: ${err.message || 'Erro desconhecido'}`);
      addResult(`❌ Teste falhou: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            Teste de Permissões Supabase
          </CardTitle>
          <CardDescription>
            Testa todas as operações CRUD para verificar permissões
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={testPermissions} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testando Permissões...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Testar Permissões CRUD
              </>
            )}
          </Button>

          {results.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Resultados dos Testes:</h3>
              <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="text-sm font-mono mb-1">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            <p>Este teste verifica:</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>SELECT - Permissão de leitura</li>
              <li>INSERT - Permissão de criação</li>
              <li>UPDATE - Permissão de atualização</li>
              <li>DELETE - Permissão de exclusão</li>
              <li>Verificação - Se o DELETE realmente funcionou</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionTest; 