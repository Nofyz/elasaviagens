import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Database, Settings, Copy } from 'lucide-react';

export const RLSFix: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Código copiado para a área de transferência!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            Solução para o Problema de DELETE
          </CardTitle>
          <CardDescription>
            O problema é Row Level Security (RLS) no Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <Alert>
            <AlertDescription>
              <strong>Problema Identificado:</strong> O DELETE retorna "0 registros deletados" porque o Supabase tem políticas RLS que impedem usuários anônimos de deletar registros.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Solução 1: Desabilitar RLS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Solução 1: Desabilitar RLS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  No Supabase Dashboard, vá para:
                </p>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>Authentication → Policies</li>
                  <li>Selecione a tabela "destinations"</li>
                  <li>Clique em "Disable RLS"</li>
                  <li>Confirme a ação</li>
                </ol>
                <div className="bg-muted p-3 rounded text-xs">
                  <p><strong>⚠️ Atenção:</strong> Isso remove toda a segurança da tabela.</p>
                  <p>Use apenas para desenvolvimento/teste.</p>
                </div>
              </CardContent>
            </Card>

            {/* Solução 2: Criar Política RLS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Solução 2: Criar Política RLS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Crie uma política que permite DELETE para usuários anônimos:
                </p>
                <div className="bg-muted p-3 rounded">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyToClipboard(`-- Política para permitir DELETE em destinations
CREATE POLICY "Enable delete for all users" ON destinations
FOR DELETE USING (true);`)}
                    className="mb-2"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar SQL
                  </Button>
                  <pre className="text-xs overflow-x-auto">
{`-- Política para permitir DELETE em destinations
CREATE POLICY "Enable delete for all users" ON destinations
FOR DELETE USING (true);`}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground">
                  Execute este SQL no SQL Editor do Supabase Dashboard.
                </p>
              </CardContent>
            </Card>

          </div>

          <Alert>
            <AlertDescription>
              <strong>Recomendação:</strong> Use a Solução 2 (Criar Política RLS) para manter a segurança e permitir DELETE apenas quando necessário.
            </AlertDescription>
          </Alert>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Passos para Corrigir:</h3>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Acesse o <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Supabase Dashboard</a></li>
              <li>Vá para seu projeto</li>
              <li>Navegue para <strong>Authentication → Policies</strong></li>
              <li>Selecione a tabela <strong>"destinations"</strong></li>
              <li>Clique em <strong>"New Policy"</strong></li>
              <li>Configure a política para permitir DELETE</li>
              <li>Ou simplesmente clique em <strong>"Disable RLS"</strong> para desenvolvimento</li>
            </ol>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
              className="w-full md:w-auto"
            >
              Abrir Supabase Dashboard
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default RLSFix; 