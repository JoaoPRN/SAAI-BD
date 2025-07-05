import React, { useEffect, useState } from 'react';

interface Aluno {
  NUM_MATRICULA_ALUNO: number;
  NOM_ALUNO: string;
  DT_INGRESSO: Date;
  DT_NASCIMENTO: Date;
  NOM_CURSO: string;
}

const AlunosListarPage: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendPort = import.meta.env.VITE_BACKEND_PORT;

  //try catch e depois retornar
    <div>
      <h1>Lista de Alunos</h1>
      {alunos.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Curso</th>
              <th>Data Ingresso</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.NUM_MATRICULA_ALUNO}>
                <td>{aluno.NUM_MATRICULA_ALUNO}</td>
                <td>{aluno.NOM_ALUNO}</td>
                <td>{aluno.NOM_CURSO}</td>
                <td>{aluno.DT_INGRESSO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
};

export default AlunosListarPage;