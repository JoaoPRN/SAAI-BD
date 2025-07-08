import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
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
        <h1 style={styles.title}>Sistema de Avaliação Acadêmica Integrada</h1>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>
            Entrar
          </button>
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
    backgroundColor: "white",
  },
  header: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: 0,
    color: "black",
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
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#1E90FF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
    loginButton: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default LoginPage;
