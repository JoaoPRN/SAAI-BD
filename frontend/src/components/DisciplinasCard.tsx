import "../styles/Card.css";
import { FaTrashAlt } from "react-icons/fa";

type DisciplinaMatriculada = {
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
  };
};

const onExcluir = async (matriculaAluno: string, codigoTurma: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/avaliacao-turmas/excluir/${matriculaAluno}/${codigoTurma}`,
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

export default function DisciplinasCard({
  matriculaAluno,
}: DisciplinaMatriculada) {
  return (
    <div className="card">
      <h3>{matriculaAluno.NOM_DISCIPLINA}</h3>
      <p>👤Prof. Dr. {matriculaAluno.NOM_PROFESSOR}</p>
      <p>🕒 {matriculaAluno.NUM_CARGA_HORARIA} Horas</p>
      <p>📍Sala {matriculaAluno.NUM_SALA}</p>
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
                onExcluir(
                  matriculaAluno.NUM_MATRICULA_ALUNO,
                  matriculaAluno.COD_ID_TURMA
                )
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
