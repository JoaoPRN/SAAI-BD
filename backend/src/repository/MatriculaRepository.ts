import db from "../database/db";

export class MatriculaRepository {
  static async consultar(matricula: number) {
    const sql = `SELECT * FROM VW_RESUMO_TURMAS WHERE NUM_MATRICULA_ALUNO = ?;`;

    return await db.query(sql, [matricula]);
  }

  static async atualizarIndicador(
    connection: any,
    matricula: number,
    codigoTurma: number
  ) {
    const sql = `UPDATE SAAI.TD_MATRICULA SET COD_IND_AVALIACAO=1 WHERE NUM_MATRICULA_ALUNO = ? AND COD_ID_TURMA = ?;`;

    await connection.execute(sql, [matricula, codigoTurma]);
  }
}
