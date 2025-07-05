import "../styles/Card.css";

type DisciplinaMatriculada = {
  matriculaAluno: {
    NOM_DISCIPLINA: string;
    NOM_PROFESSOR: string;
    NUM_CAPACIDADE: string;
    NUM_CARGA_HORARIA: string;
    NUM_MATRICULA_ALUNO: string;
    NUM_SALA: string;
    NUM_SEMESTRE: string;
  };
};

export default function DisciplinasCard({
  matriculaAluno,
}: DisciplinaMatriculada) {
  console.log(matriculaAluno);
  return (
    <div className="card">
      <h3>{matriculaAluno.NOM_DISCIPLINA}</h3>
      <p>👤Prof. Dr. {matriculaAluno.NOM_PROFESSOR}</p>
      <p>🕒 {matriculaAluno.NUM_CARGA_HORARIA} Horas</p>
      <p>📍Sala {matriculaAluno.NUM_SALA}</p>
    </div>
  );
}
