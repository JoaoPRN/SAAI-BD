import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisciplinasCard from "../components/DisciplinasCard";
import "../styles/Tabs.css";

const Avaliacao = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "disciplinas" | "salas" | "servicos"
  >("disciplinas");
  const location = useLocation();
  const { matriculaAluno } = location.state || {};
  const [foto, setFoto] = useState<string>();
  const [dadosAluno, setdadosAluno] = useState<
    | [
        {
          DT_INGRESSO: string;
          DT_NASCIMENTO: string;
          FOTO_ALUNO: string;
          NOM_ALUNO: string;
          NOM_CURSO: string;
          NUM_MATRICULA_ALUNO: string;
        }
      ]
    | null
  >();
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
    consultarAluno(matriculaAluno).then((alunoLogado) => {
      console.log(alunoLogado.FOTO_ALUNO);
      if (alunoLogado.FOTO_ALUNO) {
        setdadosAluno(alunoLogado);
        setFoto(alunoLogado.FOTO_ALUNO);
      }
    });
  }, []);

  const handleCardClick = (matricula: any) => {
    console.log(matricula);
    navigate("/avaliacaoDisciplina", {
      state: { dados: matricula, codigoMatricula: matriculaAluno },
    });
  };

  function setMostrarPerfil() {
    console.log(dadosAluno);
    navigate("/aluno/criar-aluno", {
      state: { dados: dadosAluno },
    });
  }

  return (
    <div style={styles.page}>
      <header style={styles.headerSuperior}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            🎓 Sistema de Avaliação Acadêmica Integrada
          </h1>
          <h3 style={styles.text}>
            Contribua para a melhoria da qualidade do ensino avaliando
            disciplinas, professores, salas e serviços
          </h3>
        </div>
        <img
          src={`data:image/jpeg;base64,${foto}`}
          alt="Foto do Aluno"
          style={styles.fotoStyle}
          onClick={() => setMostrarPerfil()}
        />
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

async function consultarAluno(matricula: number) {
  try {
    const response = await fetch("http://localhost:3000/aluno/listar-alunos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const alunoLogado = data.listaAlunos.find(
      (aluno: any) => aluno.NUM_MATRICULA_ALUNO == matricula
    );
    console.log(data.listaAlunos);
    return alunoLogado;
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
  headerSuperior: {
    display: "flex",
    paddingLeft: "100px",
    textAlign: "left",
    justifyContent: "space-between",
    backgroundColor: "#1E90FF",
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
  fotoStyle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "2px solid #fff",
    margin: 40,
  },
};

export default Avaliacao;
