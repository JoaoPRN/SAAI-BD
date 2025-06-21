import db from "../database/db";
import Aluno from "../models/Aluno";

class AlunoRepository {
  static async inserir(aluno: Aluno) {
    const sql = `INSERT INTO SAAI.TD_ALUNO (NUM_MATRICULA_ALUNO, NOM_ALUNO, DT_INGRESSO, DT_NASCIMENTO, NOM_CURSO)
            VALUES (?, ?, ?, ?, ?)`;

    const values = [
      aluno.matricula,
      aluno.nome,
      aluno.dataIngresso.toISOString().split("T")[0],
      aluno.dataNascimento.toISOString().split("T")[0],
      aluno.curso,
    ];

    const result = await db.query(sql, values);

    return result.affectedRows > 0;
  }
}

export default AlunoRepository;
