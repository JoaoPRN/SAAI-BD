"import React, { useEffect, useState } from 'react';

interface Servico {
  COD_ID_SERVICO: number;
  TXT_COMENTARIO: string;
  NUM_NOTA_SERVICO: number;
}    

const ServicosListarPage: React.FC = () => {
  const [Servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendPort = import.meta.env.VITE_BACKEND_PORT;

  //try catch e depois retornar
    <div>
      <h1>Lista de Servicos</h1>
      {Servicos.length === 0 ? (
        <p>Nenhum servico encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Comentário da avaliação de serviço</th>
              <th>Nota do servico</th>
            </tr>
          </thead>
          <tbody>
            {Servicos.map((Servico) => (
              <tr key={Servico.COD_ID_SERVICO}>
                <td>{Servico.NUM_MATRICULA_Servico}</td>
                <td>{Servico.TXT_COMENTARIO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
};

export default ServicosListarPage;