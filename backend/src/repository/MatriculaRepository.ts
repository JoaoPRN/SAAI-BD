import { Connection } from "mysql2/promise";
import db from "../database/db";

export class MatriculaRepository {
  static async consultar(matricula: number) {
    const sql = `SELECT * FROM SAAI.VW_RESUMO_TURMAS WHERE NUM_MATRICULA_ALUNO = ?;`;

    return await db.query(sql, [matricula]);
  }

  static async deletar(connection: Connection, matricula: number) {
    const sql = `DELETE FROM SAAI.TD_MATRICULA WHERE NUM_MATRICULA_ALUNO = ?;`;

    return await db.query(sql, [matricula]);
  }

  static async atualizarIndicador(
    connection: any,
    indicador: number,
    matricula: number,
    codigoTurma: number
  ) {
    const sql = `UPDATE SAAI.TD_MATRICULA SET COD_IND_AVALIACAO=? WHERE NUM_MATRICULA_ALUNO = ? AND COD_ID_TURMA = ?;`;

    await db.query(sql, [indicador, matricula, codigoTurma]);
  }
}
