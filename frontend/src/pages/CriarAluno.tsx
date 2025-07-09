import React, { useState } from "react";

const CriarAluno: React.FC = () => {
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  //const [dataIngresso, setdataIngresso] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/aluno/criar-aluno", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matriculaAluno: parseInt(matricula),
          nomeAluno: nome,
          cursoAluno: curso,
          //dataIngresso: dataIngresso,
          
          /*    const values = [
            aluno.matricula,
            aluno.nome,
            aluno.dataIngresso.toISOString().split("T")[0],
            aluno.dataNascimento.toISOString().split("T")[0],
            aluno.curso,
            Buffer.isBuffer(aluno.fotoAluno) ? aluno.fotoAluno : null,
            ]; */

          //e etc
        }),
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

          <button type="submit" style={styles.button}>
            Criar Aluno
          </button>
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
};

export default CriarAluno;
