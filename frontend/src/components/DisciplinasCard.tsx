import "../styles/Card.css";

// type DisciplinaMatriculada = [
//   {
//     NOM_DISCIPLINA: string;
//     NOM_PROFESSOR: string;
//     NUM_CAPACIDADE: string;
//     NUM_CARGA_HORARIA: string;
//     NUM_MATRICULA_ALUNO: string;
//     NUM_SALA: string;
//     NUM_SEMESTRE: string;
//   }
// ];

// type Props = {
//   matriculaAluno: DisciplinaMatriculada[];
// };

export default function DisciplinasCard({ matriculaAluno }: any) {
  console.log(matriculaAluno.matriculaAluno[0]);

  //   const primeira = matriculaAluno.DisciplinaMatriculada[0];
  return (
    <div className={`card ${status === "avaliado" ? "completed" : ""}`}>
      {/* <h3>{primeira.NOM_DISCIPLINA}</h3> */}
      {/* <p className="codigo">{codigo}</p> */}
      {/* <p>👤 {matriculaAluno[0].NOM_PROFESSOR}</p>
      <p>🕒 {matriculaAluno[0].NUM_CARGA_HORARIA}</p>
      <p>📍 {matriculaAluno[0].NUM_SALA}</p> */}

      <div className="card-footer">
        {status === "pendente" ? (
          <>
            <span className="badge pending">Pendente</span>
            <button className="btn">Avaliar Disciplina</button>
          </>
        ) : (
          <>
            <span className="badge done">Avaliado</span>
            <button className="btn disabled" disabled>
              Avaliação Realizada
            </button>
          </>
        )}
      </div>
    </div>
  );
}
