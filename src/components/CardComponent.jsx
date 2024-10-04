// CardComponent.jsx
const CardComponent = ({ tickets, totalTickets }) => {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:max-w-7xl lg:px-8">
      <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-white sm:text-5xl">
        Analise de criação dos Tickets
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:grid-rows-2">
        
        {/* Card 1: Total de Tickets Emitidos */}
        <div className="relative flex flex-col items-center bg-slate-200 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="rounded-md border solid border-slate-600 p-2">
              <p className="text-2xl font-medium tracking-tight text-gray-900">Tickets Emitidos</p>
            </div>
            <div >
            <p className="mt-2 text-5xl font-bold text-gray-600">{totalTickets}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Lista de Tickets */}
        <div className="relative flex flex-col items-center bg-slate-200 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="rounded-md border solid border-slate-600 p-2">
              <p className="text-2xl font-medium tracking-tight text-gray-900">Lista de Tickets</p>
            </div>
            <ul className="mt-4 w-full text-left text-gray-600">
              {Array.isArray(tickets) && tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <li key={index} className="text-lg text-black border-b py-2 px-2  hover:bg-slate-400 rounded-md">
                    <span className="font-semibold">NºTicket:</span> {ticket.sequencia} <br />
                    <span className="font-semibold">Empresa:</span> {ticket.empresa.nome}
                  </li>
                ))
              ) : (
                <li className="text-black">Nenhum ticket encontrado</li>
              )}
            </ul>
          </div>
        </div>

        {/* Card 3: Exemplo Extra */}
        <div className="relative flex flex-col items-center bg-slate-200 shadow-lg rounded-lg p-6">
          <div className="text-center">
            <div className="rounded-md border solid border-slate-600 p-2">
              <p className="text-2xl font-medium tracking-tight text-gray-900">Produto Mais vendido</p>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              <div>
                <p>Gráfico</p>
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
