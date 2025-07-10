import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CriarAluno: React.FC = () => {
  const location = useLocation();
  const { dados } = location.state || {};
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState(dados?.NUM_MATRICULA_ALUNO ?? "");
  const [nome, setNome] = useState(dados?.NOM_ALUNO ?? "");
  const [curso, setCurso] = useState(dados?.NOM_CURSO ?? "");
  const [dataNascimento, setdataNascimento] = useState(
    dados?.DT_NASCIMENTO ?? ""
  );
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("matricula", matricula);
    formData.append("nome", nome);
    formData.append("curso", curso);
    formData.append("dataNascimento", dataNascimento);
    formData.append("dataIngresso", new Date().toISOString().split("T")[0]);
    formData.append("telefone", telefone);
    if (foto) {
      formData.append("foto", foto);
    }
    try {
      const response = await fetch("http://localhost:3000/aluno/criar-aluno", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao criar aluno");

      alert("Aluno criado com sucesso!");
      setMatricula("");
      setNome("");
      setCurso("");
    } catch (err) {
      console.error(err);
      alert("Falha ao criar aluno");
    }
  };

  async function handleExcluir() {
    try {
      console.log(dados.NUM_MATRICULA_ALUNO);
      const response = await fetch(
        "http://localhost:3000/aluno/excluir-aluno",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matricula: dados.NUM_MATRICULA_ALUNO.toString(),
          }),
        }
      );
      if (!response.ok) throw new Error("Erro ao excluir aluno");
      alert("Aluno excluído com sucesso!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Falha ao excluir aluno");
    }
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>➕ Cadastrar Novo Aluno</h1>
      </header>

      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Matrícula</label>
          <input
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            style={styles.input}
            required
            disabled={!!dados}
          />

          <label style={styles.label}>Nome do Aluno</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Curso</label>
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            style={styles.input}
            required
          />
          <label style={styles.label}>Data de Nascimento</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setdataNascimento(e.target.value)}
            style={styles.input}
            required
          />
          {!dados ? (
            <>
              <label style={styles.label}>Telefone</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                style={styles.input}
                required
              />
            </>
          ) : (
            ""
          )}
          {!dados ? (
            <>
              <label style={styles.label}>Foto do Aluno</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  console.log(e.target.files);
                  if (e.target.files && e.target.files[0]) {
                    setFoto(e.target.files[0]);
                  } else {
                    setFoto(null);
                  }
                }}
                style={styles.input}
              />
            </>
          ) : (
            ""
          )}

          {dados ? (
            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleExcluir}
                style={styles.secondaryButton}
              >
                Excluir
              </button>
            </div>
          ) : (
            <button type="submit" style={styles.button}>
              Criar Aluno
            </button>
          )}
        </form>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#1E90FF",
    padding: "2rem",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: "2rem",
    margin: 0,
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
    gap: "1rem",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "#f7f7f7",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "350px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "0.75rem",
    backgroundColor: "red",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CriarAluno;
