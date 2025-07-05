import db from "../database/db";

class TipoServicoRepository {
  static async listarTodos() {
    const sql = `SELECT * FROM SAAI.TD_TIPO_SERVICO`;
    const [result] = await db.query(sql);
    return result;
  }

  static async buscarPorId(id: number) {
    const sql = `SELECT * FROM SAAI.TD_TIPO_SERVICO WHERE COD_TIPO_SERVICO = ?`;
    const [result] = await db.query(sql, [id]);
    return result[0] || null;
  }
}

export default TipoServicoRepository;