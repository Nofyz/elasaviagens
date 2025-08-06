import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const SimpleTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Não testado');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Testando...');
    
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('count')
        .limit(1);
      
      if (error) {
        setStatus(`Erro: ${error.message}`);
      } else {
        setStatus('Conexão OK!');
      }
    } catch (err) {
      setStatus(`Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teste Simples de Conexão</h1>
      <button 
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testando...' : 'Testar Conexão'}
      </button>
      <p className="mt-4">Status: {status}</p>
    </div>
  );
}; 