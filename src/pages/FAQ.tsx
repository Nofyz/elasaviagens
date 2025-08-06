
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona o processo de planejamento da viagem?",
      answer: "Primeiro, entramos em contato para entender suas preferências, orçamento e datas. Em seguida, elaboramos um roteiro personalizado com opções de hospedagem, transporte e passeios. Após sua aprovação, cuidamos de todas as reservas e fornecemos suporte completo."
    },
    {
      question: "Quais destinos vocês atendem?",
      answer: "Somos especialistas no Nordeste brasileiro, incluindo destinos como Fernando de Noronha, Jericoacoara, Salvador, Porto de Galinhas, Maragogi, Natal, entre outros. Também organizamos viagens para outros destinos nacionais e internacionais."
    },
    {
      question: "Como são os preços dos pacotes?",
      answer: "Nossos preços variam conforme o destino, época do ano, categoria de hospedagem e serviços inclusos. Cada pacote é personalizado, então elaboramos orçamentos específicos para cada cliente sem compromisso."
    },
    {
      question: "Posso parcelar o pagamento da viagem?",
      answer: "Sim! Oferecemos diversas formas de pagamento, incluindo parcelamento. As condições variam conforme o valor total e antecedência da viagem. Entre em contato para conhecer as opções disponíveis."
    },
    {
      question: "Vocês oferecem seguro viagem?",
      answer: "Recomendamos fortemente o seguro viagem e podemos auxiliar na contratação. É especialmente importante para viagens internacionais, mas também oferece proteção em viagens nacionais."
    },
    {
      question: "E se eu precisar cancelar a viagem?",
      answer: "As políticas de cancelamento variam conforme os fornecedores (hotéis, companhias aéreas, etc.) e a antecedência. Sempre informamos as condições antes da confirmação da reserva. Recomendamos o seguro viagem que pode cobrir cancelamentos."
    },
    {
      question: "Vocês oferecem suporte durante a viagem?",
      answer: "Sim! Oferecemos suporte 24h durante sua viagem através do WhatsApp. Estamos disponíveis para resolver qualquer imprevisto ou dúvida que possa surgir."
    },
    {
      question: "Como posso solicitar um orçamento?",
      answer: "É muito fácil! Entre em contato pelo WhatsApp (19) 9 9802-0759, e-mail contato@elasaviagens.com.br ou preencha nosso formulário no site. Responderemos rapidamente com um orçamento personalizado."
    },
    {
      question: "Vocês organizam viagens em grupo?",
      answer: "Sim! Temos experiência em organizar viagens para grupos de amigos, famílias, empresas e eventos especiais. Oferecemos condições especiais para grupos e cuidamos de todos os detalhes logísticos."
    },
    {
      question: "Quais documentos preciso para viajar?",
      answer: "Para viagens nacionais: RG ou CNH válidos. Para viagens internacionais: passaporte válido e, dependendo do destino, visto e certificado de vacinação. Sempre orientamos sobre a documentação necessária para cada destino."
    },
    {
      question: "Vocês trabalham com lua de mel?",
      answer: "Claro! Somos especialistas em viagens românticas e lua de mel. Criamos experiências únicas e inesquecíveis para casais, com atenção especial aos detalhes que tornam a viagem ainda mais especial."
    },
    {
      question: "Como escolher a melhor época para viajar?",
      answer: "Cada destino tem suas particularidades. Consideramos fatores como clima, alta/baixa temporada, eventos locais e suas preferências pessoais para recomendar a melhor época para sua viagem."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">      
      <main className="pt-12 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="font-montserrat font-bold text-3xl text-gradient-ocean mb-4">
              Perguntas Frequentes
            </h1>
            <p className="font-inter text-gray-600 mb-8">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="font-montserrat font-medium text-left hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-inter text-gray-700 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 text-center">
              <h3 className="font-montserrat font-semibold text-xl text-primary mb-4">
                Não encontrou sua resposta?
              </h3>
              <p className="font-inter text-gray-700 mb-6">
                Nossa equipe está pronta para esclarecer qualquer dúvida
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5519998020759?text=Olá! Tenho uma dúvida que não encontrei no FAQ. Podem me ajudar?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:contato@elasaviagens.com.br"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  E-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQ;