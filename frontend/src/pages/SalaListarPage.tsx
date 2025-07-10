import React, { useEffect, useState } from 'react';

interface Sala {
  NUM_SALA: number;
  NUM_CAPACIDADE: number
}

const SalasListarPage: React.FC = () => {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendPort = import.meta.env.VITE_BACKEND_PORT;

  //try catch e depois retornar
    <div>
      <h1>Lista de Salas</h1>
      {salas.length === 0 ? (
        <p>Nenhuma sala encontrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Número da sala</th>
              <th>Capacidade</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.NUM_SALA}>
                <td>{sala.NUM_CAPACIDADE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
};

export default SalasListarPage;