import "../styles/Card.css";

type Props = {
  data: {
    nome: string;
    codigo: string;
    professor: string;
    horario: string;
    sala: string;
    status: "pendente" | "avaliado";
  };
};

export default function DisciplinasCard({ data }: Props) {
  const { nome, codigo, professor, horario, sala, status } = data;

  return (
    <div className={`card ${status === "avaliado" ? "completed" : ""}`}>
      <h3>{nome}</h3>
      <p className="codigo">{codigo}</p>
      <p>👤 {professor}</p>
      <p>🕒 {horario}</p>
      <p>📍 {sala}</p>

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
