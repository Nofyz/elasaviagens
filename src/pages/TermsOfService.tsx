

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">      
      <main className="pt-12 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="font-montserrat font-bold text-3xl text-gradient-ocean mb-8">
              Termos de Uso
            </h1>
            
            <div className="prose prose-lg max-w-none font-inter text-gray-700 space-y-6">
              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao utilizar os serviços da ElasaViagens, você concorda com estes Termos de Uso. 
                  Se não concordar, não utilize nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  2. Serviços Oferecidos
                </h2>
                <p>
                  A ElasaViagens oferece:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Consultoria e planejamento de viagens</li>
                  <li>Pacotes turísticos personalizados</li>
                  <li>Reservas de hospedagem, transporte e passeios</li>
                  <li>Suporte durante a viagem</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  3. Responsabilidades do Cliente
                </h2>
                <p>
                  O cliente se compromete a:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Efetuar pagamentos nos prazos acordados</li>
                  <li>Cumprir as condições dos fornecedores (hotéis, companhias aéreas, etc.)</li>
                  <li>Possuir documentação válida para viagem</li>
                  <li>Contratar seguro viagem quando recomendado</li>
                </ul>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  4. Reservas e Pagamentos
                </h2>
                <p>
                  As reservas são confirmadas mediante:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Pagamento do sinal ou valor integral conforme acordado</li>
                  <li>Disponibilidade dos serviços solicitados</li>
                  <li>Apresentação da documentação necessária</li>
                </ul>
                <p className="mt-4">
                  Os preços podem variar conforme disponibilidade e condições de mercado.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  5. Cancelamentos e Reembolsos
                </h2>
                <p>
                  Cancelamentos estão sujeitos às políticas dos fornecedores e podem incorrer em taxas. 
                  Reembolsos serão processados conforme as condições contratuais específicas de cada reserva.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  6. Limitação de Responsabilidade
                </h2>
                <p>
                  A ElasaViagens atua como intermediária entre o cliente e os fornecedores de serviços. 
                  Nossa responsabilidade limita-se aos serviços diretamente prestados por nós, não 
                  respondendo por atos de terceiros, casos fortuitos ou força maior.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  7. Propriedade Intelectual
                </h2>
                <p>
                  Todo conteúdo do website (textos, imagens, logos) é propriedade da ElasaViagens 
                  ou licenciado por terceiros, sendo protegido por direitos autorais.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  8. Alterações dos Termos
                </h2>
                <p>
                  Estes termos podem ser alterados a qualquer momento. As mudanças serão comunicadas 
                  através do website e entrarão em vigor imediatamente.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  9. Lei Aplicável
                </h2>
                <p>
                  Estes termos são regidos pela legislação brasileira. Conflitos serão resolvidos 
                  no foro da comarca de domicílio da ElasaViagens.
                </p>
              </section>

              <section>
                <h2 className="font-montserrat font-semibold text-xl text-primary mb-4">
                  10. Contato
                </h2>
                <p>
                  Para dúvidas sobre estes Termos de Uso:
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

export default TermsOfService;