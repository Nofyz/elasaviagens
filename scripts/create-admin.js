// Script para criar um admin de teste no Supabase
// Execute este script no console do navegador na página de teste

const createTestAdmin = async () => {
  try {
    // Importar o cliente Supabase
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
    
    const supabaseUrl = "https://ypilrdiemldwlmiarzlg.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaWxyZGllbWxkd2xtaWFyemxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMTQyNDMsImV4cCI6MjA2OTU5MDI0M30.528n7o6P35FVkgeKDRfFuVocYzG6Bmr8rFDi56R7Sjo";
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Dados do admin de teste
    const adminData = {
      username: 'admin',
      email: 'admin@elasaviagens.com',
      password: 'admin123',
      created_at: new Date().toISOString()
    };
    
    // Inserir admin
    const { data, error } = await supabase
      .from('admins')
      .insert(adminData)
      .select();
    
    if (error) {
      console.error('Erro ao criar admin:', error);
      return;
    }
    
    console.log('Admin criado com sucesso:', data);
    console.log('Credenciais de login:');
    console.log('Email: admin@elasaviagens.com');
    console.log('Senha: admin123');
    
  } catch (error) {
    console.error('Erro:', error);
  }
};

// Executar o script
createTestAdmin(); 