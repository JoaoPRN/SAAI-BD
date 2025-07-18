import { Connection } from "mysql2/promise";
import db from "../database/db";
import Aluno from "../models/Aluno";

class AlunoRepository {
  static async inserir(connection: any, aluno: Aluno) {
    const sql = `INSERT INTO SAAI.TD_ALUNO (NUM_MATRICULA_ALUNO, NOM_ALUNO, DT_INGRESSO, DT_NASCIMENTO, NOM_CURSO, FOTO_ALUNO)
            VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [
      aluno.matricula,
      aluno.nome,
      aluno.dataIngresso.toISOString().split("T")[0],
      aluno.dataNascimento.toISOString().split("T")[0],
      aluno.curso,
      Buffer.isBuffer(aluno.fotoAluno) ? aluno.fotoAluno : null,
    ];

    await connection.execute(sql, values);
  }

  static async listar() {
    const sql = `SELECT * FROM SAAI.TD_ALUNO`;

    const result = await db.query(sql);

    return result;
  }

  static async excluir(connection: Connection, matricula: number) {
    const sql = `DELETE FROM SAAI.TD_ALUNO WHERE NUM_MATRICULA_ALUNO = ?`;

    const result = await connection.query(sql, matricula);

    return result;
  }

  static async excluirTelefone(matricula: number, telefone: number) {
    const sql = `DELETE FROM SAAI.TD_TELEFONE WHERE NUM_MATRICULA_ALUNO = ? AND NUM_TELEFONE = ?`;

    const result = await db.query(sql, telefone);

    return result.affectedRows > 0;
  }
}

export default AlunoRepository;
