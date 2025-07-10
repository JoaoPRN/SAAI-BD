import React, { useEffect, useState } from "react";
import "../styles/Tabs.css";
import DisciplinasCard from "../components/DisciplinasCard";
import SalasCard from "../components/SalasCard";
import ServicoCard from "../components/ServicoCard";
import { useLocation, useNavigate } from "react-router-dom";

interface GradeHorariaItem {
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
  COD_TIPO_SERVICO: string;
}

const Avaliacao = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { matriculaAluno } = location.state || {};

  const [activeTab, setActiveTab] = useState<
    "disciplinas" | "salas" | "servicos"
  >("disciplinas");

  const [gradeHoraria, setGradeHoraria] = useState<GradeHorariaItem[] | null>(
    null
  );

  useEffect(() => {
    if (matriculaAluno) {
      ListaDisciplinasMatriculadas(matriculaAluno).then((dados) => {
        if (dados) {
          setGradeHoraria(dados);
        }
      });
    }
  }, [matriculaAluno]);

  const handleCardClick = (matricula: GradeHorariaItem) => {
    navigate("/avaliacaoDisciplina", {
      state: { dados: matricula, codigoMatricula: matriculaAluno },
    });
  };

  const handleCardClickSala = (sala: GradeHorariaItem) => {
    navigate("/avaliacaoSala", {
      state: { dados: sala, codigoSala: sala.NUM_SALA },
    });
  };

  const handleCardClickServico = (servico: GradeHorariaItem) => {
    navigate("/avaliacaoServico", {
      state: { dados: servico, codigoServico: servico.COD_ID_TURMA },
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
              gradeHoraria.map((item, index) => (
                <div
                  key={index}
                  className="card-button"
                  onClick={() => handleCardClick(item)}
                  role="button"
                  tabIndex={0}
                >
                  <DisciplinasCard matriculaAluno={item} />
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === "salas" && (
        <div className="salas-wrapper">
          <p>Avalie as salas onde você tem aula para ajudar outros estudantes</p>

          <div className="card-grid">
            {gradeHoraria &&
              gradeHoraria.map((sala, index) => (
                <div
                  key={index}
                  className="card-button"
                  onClick={() => handleCardClickSala(sala)}
                  role="button"
                  tabIndex={0}
                >
                  <SalasCard matriculaAluno={sala} />
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === "servicos" && (
        <div className="servicos-wrapper">
          <p>Avalie os serviços disponíveis...</p>

          <div className="card-grid">
            {gradeHoraria &&
              gradeHoraria.map((servico, index) => (
                <div
                  key={index}
                  className="card-button"
                  onClick={() => handleCardClickServico(servico)}
                  role="button"
                  tabIndex={0}
                >
                  <ServicoCard matriculaAluno={servico} />
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
    return null;
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
