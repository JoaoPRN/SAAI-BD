import "../styles/Card.css";
import { FaTrashAlt } from "react-icons/fa";

type SalaMatriculada = {
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

const onExcluir = async (matriculaAluno: string, codigoSala: string, semestre: string) => {
    try {
        const response = await fetch(
            `http://localhost:3000/avaliacaoSalaAula/excluir/${matriculaAluno}/${codigoSala}/${semestre}`,
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

export default function SalasCard({
    matriculaAluno,
}: SalaMatriculada) {
    return (
        <div className="card">
            <h3>Sala {matriculaAluno.NUM_SALA}</h3>
            <p>🕒  {matriculaAluno.NUM_CAPACIDADE} cadeiras</p>
            <p>🪑  {matriculaAluno.NOM_DISCIPLINA}</p>
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
                                    matriculaAluno.NUM_SALA,
                                    matriculaAluno.NUM_SEMESTRE
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
