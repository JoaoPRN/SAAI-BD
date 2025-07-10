import "../styles/Card.css";
import { FaTrashAlt } from "react-icons/fa";

type Servico = {
  matriculaAluno: {
    COD_ID_TURMA: string;
    NOM_DISCIPLINA: string;
    NOM_PROFESSOR: string;
    NUM_CAPACIDADE: string;
    NUM_CARGA_HORARIA: string;
    NUM_MATRICULA_ALUNO: string;
    NUM_SALA: string;
    NUM_SEMESTRE: string;
    COD_IND_AVALIACAO: string;
    NOM_TIPO_SERVICO: string;
  };
};

const onExcluir = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/avaliacao-servicos/excluir`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      alert("Avaliação atualizada com sucesso!");
    } else {
      console.log(response);
      alert("Erro ao atualizar a avaliação.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o servidor.");
  }
};

export default function ServicoCard({
  matriculaAluno,
}: Servico) {
  return (
    <div className="card">
      <h3>🏛️ Serviço {matriculaAluno.NOM_TIPO_SERVICO}</h3>
      <p>👤 Matrícula {matriculaAluno.NUM_MATRICULA_ALUNO}</p>
      <p>🗓️ Semestre {matriculaAluno.NUM_SEMESTRE} </p>
      <div className="card-footer">
        {matriculaAluno.COD_IND_AVALIACAO == "0" ? (
          <>
            <span className="badge pending">Pendente</span>
          </>
        ) : (
          <>
            <span className="badge done">Avaliado</span>
            <button
              className="delete-btn"
              onClick={() =>
                onExcluir()
              }
              title="Excluir avaliação"
            >
              <FaTrashAlt />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
