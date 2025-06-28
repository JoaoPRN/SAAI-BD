import db from "../database/db";

export class MatriculaRepository {
  static async consultar(matricula: number) {
    const sql = `SELECT * FROM VW_RESUMO_TURMAS WHERE NUM_MATRICULA_ALUNO = ?;`;

    return await db.query(sql, [matricula]);
  }
}
