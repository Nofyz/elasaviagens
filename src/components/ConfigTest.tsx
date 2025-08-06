import React, { useState } from 'react';

export const ConfigTest: React.FC = () => {
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConfig = async () => {
    try {
      // Testar se o módulo pode ser importado
      const { createClient } = await import('@supabase/supabase-js');
      
      const SUPABASE_URL = "https://ypilrdiemldwlmiarzlg.supabase.co";
      const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaWxyZGllbWxkd2xtaWFyemxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTQyNDMsImV4cCI6MjA2OTU5MDI0M30.528n7o6P35FVkgeKDRfFuVocYzG6Bmr8rFDi56R7Sjo";

      const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      
      // Testar conexão
      const { data, error } = await client
        .from('destinations')
        .select('count')
        .limit(1);

      if (error) {
        setError(`Erro na conexão: ${error.message}`);
      } else {
        setConfig({
          url: SUPABASE_URL,
          key: SUPABASE_PUBLISHABLE_KEY.substring(0, 20) + '...',
          connection: 'OK',
          data: data
        });
      }
    } catch (err) {
      setError(`Erro na configuração: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teste de Configuração</h1>
      <button 
        onClick={testConfig}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Testar Configuração
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Erro:</strong> {error}
        </div>
      )}
      
      {config && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold">Configuração OK!</h3>
          <p>URL: {config.url}</p>
          <p>Key: {config.key}</p>
          <p>Status: {config.connection}</p>
        </div>
      )}
    </div>
  );
}; 