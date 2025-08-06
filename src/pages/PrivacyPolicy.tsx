


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">      
      <main className="pt-12 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="font-montserrat font-bold text-3xl text-gradient-ocean mb-8">
              Política de Privacidade
            </h1>
            
            <div className="prose prose-lg max-w-none font-inter text-gray-700 space-y-6">
              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  1. Informações que Coletamos
                </h2>
                <p>
                  A ElasaViagens coleta informações quando você:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Preenche formulários de contato ou solicitação de orçamento</li>
                  <li>Se inscreve em nossa newsletter</li>
                  <li>Entra em contato conosco via WhatsApp, e-mail ou telefone</li>
                  <li>Navega em nosso website (cookies e dados de navegação)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  2. Como Utilizamos suas Informações
                </h2>
                <p>
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Responder suas dúvidas e solicitações</li>
                  <li>Elaborar orçamentos personalizados</li>
                  <li>Enviar ofertas e promoções (apenas se consentido)</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  3. Compartilhamento de Dados
                </h2>
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                  exceto quando necessário para prestação dos serviços (parceiros de viagem, hotéis, 
                  companhias aéreas) ou quando exigido por lei.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  4. Segurança dos Dados
                </h2>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger 
                  suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  5. Seus Direitos
                </h2>
                <p>
                  Você tem o direito de:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Acessar, corrigir ou excluir seus dados pessoais</li>
                  <li>Solicitar a portabilidade de seus dados</li>
                  <li>Retirar seu consentimento a qualquer momento</li>
                  <li>Apresentar reclamações à autoridade competente</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  6. Cookies
                </h2>
                <p>
                  Utilizamos cookies para melhorar sua experiência de navegação. Você pode 
                  gerenciar suas preferências de cookies nas configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  7. Contato
                </h2>
                <p>
                  Para questões sobre esta Política de Privacidade, entre em contato:
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mt-2">
                  <p><strong>E-mail:</strong> contato@elasaviagens.com.br</p>
                  <p><strong>WhatsApp:</strong> (19) 9 9802-0759</p>
                </div>
              </section>

              <div className="text-sm text-gray-500 mt-8 pt-6 border-t">
                <p>Última atualização: Janeiro de 2025</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;