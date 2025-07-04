import path from "path";
import db from "../src/database/db";
import fs from "fs/promises";

async function criarProcedures() {
  const filePath = path.resolve(
    __dirname,
    "../src/sql/procedureCargaInicialDados.sql"
  );
  const filePath2 = path.resolve(
    __dirname,
    "../src/sql/procedureMatricularAlunoEmTurmas.sql"
  );
  try {
    const sqlDropProcedure = "DROP PROCEDURE IF EXISTS SAAI.cargaInicialBD;";
    await db.query(sqlDropProcedure);

    const sqlDropProcedureMatricula =
      "DROP PROCEDURE IF EXISTS SAAI.MatricularAlunoEmTurmas;";
    await db.query(sqlDropProcedureMatricula);

    const sqlCriarProcedure1 = await fs.readFile(filePath, "utf-8");
    await db.query(sqlCriarProcedure1);

    const sqlCriarProcedure2 = await fs.readFile(filePath2, "utf-8");
    await db.query(sqlCriarProcedure2);
  } catch (error) {
    console.error("Erro ao salvar procedure:", error);
  }
}

async function executarCargaInicial() {
  const filePath = path.resolve(__dirname, "./dados.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const dados = JSON.parse(fileContent);
  try {
    const sqlCargaInicial =
      "CALL SAAI.cargaInicialBD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    for (const dado of dados) {
      const values = [
        dado.numero_matricula_aluno,
        dado.nome_aluno,
        dado.dt_ingresso,
        dado.dt_nascimento,
        dado.nome_curso,

        dado.matricula_professor,
        dado.nome_professor,
        dado.dt_ingresso_professor,

        dado.codigo_disciplina,
        dado.nome_disciplina,
        dado.carga_horaria,

        dado.numero_sala,
        dado.numero_capacidade,

        dado.nome_servico,

        dado.codigo_turma,
        dado.numero_semestre,
      ];

      await db.query(sqlCargaInicial, values);
    }
  } catch (error) {
    console.error("Erro ao executar a carga inicial:", error);
  }
}

async function matricularAlunos() {
  const filePath = path.resolve(__dirname, "./matriculaAlunos.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const dados = JSON.parse(fileContent);
  try {
    await criarProcedures();
    await executarCargaInicial();
    const sqlCargaInicial = "CALL SAAI.MatricularAlunoEmTurmas(?,?,?,?,?,?)";

    for (const dado of dados) {
      const values = dado.turma;

      values.unshift(dado.numMatricula);

      await db.query(sqlCargaInicial, values);
    }
  } catch (error) {
    console.error("Erro ao executar a carga inicial:", error);
  }
}

matricularAlunos();
