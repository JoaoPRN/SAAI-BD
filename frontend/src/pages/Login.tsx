import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const alunos = await listaAlunos();
    const encontrarAluno = alunos.listaAlunos.find(
      (dados: { [x: string]: string }) =>
        dados["NUM_MATRICULA_ALUNO"] == usuario
    );

    if (encontrarAluno) {
      navigate("/avaliacao", { state: { matriculaAluno: usuario } });
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎓 Sistema de Avaliação Acadêmica Integrada</h1>
        <h3 style={styles.subtitle}>
          Insira sua matrícula para acessar o sistema.
        </h3>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="usuario" style={styles.label}>Usuário (Matrícula)</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginButton}>Entrar</button>
        </form>
      </main>
    </div>
  );
};

async function listaAlunos() {
  try {
    const response = await fetch("http://localhost:3000/aluno/listar-alunos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#1E90FF",
    padding: "30px 0",
    paddingLeft: "100px", 
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "white",
    margin: 0,
  },
  subtitle: {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: 300,
    marginTop: 10,
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "1.5rem",
    backgroundColor: "#f7f7f7",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.95rem",
    color: "#333333",
    fontWeight: "bold",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #cccccc",
    backgroundColor: "#ffffff",
    color: "#333",
    outline: "none",
  },
  loginButton: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default LoginPage;
