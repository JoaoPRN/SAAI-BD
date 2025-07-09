import React, { useEffect, useState } from "react";
import "../styles/Tabs.css";
import DisciplinasCard from "../components/DisciplinasCard";
import { useLocation, useNavigate } from "react-router-dom";

const Avaliacao = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "disciplinas" | "salas" | "servicos"
  >("disciplinas");
  const location = useLocation();
  const { matriculaAluno } = location.state || {};
  const [gradeHoraria, setgradeHoraria] = useState<
    | [
        {
          COD_ID_TURMA: string;
          NOM_DISCIPLINA: string;
          NOM_PROFESSOR: string;
          NUM_CAPACIDADE: string;
          NUM_CARGA_HORARIA: string;
          NUM_MATRICULA_ALUNO: string;
          NUM_SALA: string;
          NUM_SEMESTRE: string;
          COD_IND_AVALIACAO: string;
        }
      ]
    | null
  >(null);

  useEffect(() => {
    ListaDisciplinasMatriculadas(matriculaAluno).then((dados) => {
      if (dados) {
        setgradeHoraria(dados);
      }
    });
  }, []);

  const handleCardClick = (matricula: any) => {
    console.log(matricula);
    navigate("/avaliacaoDisciplina", {
      state: { dados: matricula, codigoMatricula: matriculaAluno },
    });
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          🎓 Sistema de Avaliação Acadêmica Integrada
        </h1>
        <h3 style={styles.text}>
          Contribua para a melhoria da qualidade do ensino avaliando
          disciplinas, professores, salas e serviços
        </h3>
      </header>
      <div className="tabs">
        <button
          className={activeTab === "disciplinas" ? "active" : ""}
          onClick={() => setActiveTab("disciplinas")}
        >
          📘 Minhas Disciplinas
        </button>
        <button
          className={activeTab === "salas" ? "active" : ""}
          onClick={() => setActiveTab("salas")}
        >
          🏫 Avaliar Salas
        </button>
        <button
          className={activeTab === "servicos" ? "active" : ""}
          onClick={() => setActiveTab("servicos")}
        >
          🛠 Avaliar Serviços
        </button>
      </div>
      {activeTab === "disciplinas" && (
        <div className="discipline-wrapper">
          <p>
            Avalie as disciplinas em que você está matriculado para ajudar
            outros estudantes
          </p>

          <div className="card-grid">
            {gradeHoraria &&
              gradeHoraria.map((turma, index) => (
                <div
                  key={index}
                  className="card-button"
                  onClick={() => handleCardClick(turma)}
                  role="button"
                  tabIndex={0}
                  // onKeyDown={(e) =>
                  //   e.key === "Enter" && handleCardClick(matricula)
                  // }
                >
                  <DisciplinasCard key={index} matriculaAluno={turma} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

async function ListaDisciplinasMatriculadas(matricula: number) {
  try {
    const response = await fetch(
      "http://localhost:3000/matricula/consultar-matricula-aluno",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matriculaAluno: matricula,
        }),
      }
    );

    const data = await response.json();
    return data.matriculaAluno;
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  header: {
    paddingLeft: "100px",
    textAlign: "left",
    backgroundColor: "#1E90FF",
  },
  title: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 40,
  },
  text: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 18,
    paddingLeft: 12,
    fontWeight: 100,
  },
};

export default Avaliacao;
