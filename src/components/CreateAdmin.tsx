import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { adminsApi } from '@/lib/supabase';

export const CreateAdmin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestAdmin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const adminData = {
        username: 'admin',
        email: 'admin@elasaviagens.com',
        password: 'admin123',
        created_at: new Date().toISOString()
      };

      await adminsApi.create(adminData);
      setSuccess(true);
    } catch (err: any) {
      if (err.message?.includes('duplicate')) {
        setError('Admin já existe no banco de dados');
      } else {
        setError('Erro ao criar admin: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Criar Admin de Teste</CardTitle>
          <CardDescription>
            Cria um usuário administrador para testar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Admin criado com sucesso!<br />
                <strong>Email:</strong> admin@elasaviagens.com<br />
                <strong>Senha:</strong> admin123
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 text-sm">
            <p><strong>Credenciais que serão criadas:</strong></p>
            <div className="bg-muted p-3 rounded-md font-mono text-xs">
              Email: admin@elasaviagens.com<br />
              Senha: admin123<br />
              Username: admin
            </div>
          </div>

          <Button 
            onClick={createTestAdmin} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando admin...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Criar Admin de Teste
              </>
            )}
          </Button>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/admin/login'}
              className="w-full"
            >
              Ir para Login Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdmin; 