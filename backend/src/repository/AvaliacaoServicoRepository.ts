import db from "../database/db";
import AvaliacaoServico from "../models/AvaliacaoServico";

class AvaliacaoServicoRepository {
  static async inserir(connection: any, avaliacao: AvaliacaoServico) {
    const sql = `INSERT INTO SAAI.TD_AVL_SERVICOS
            (NUM_MATRICULA_ALUNO, NUM_ID_SERVICO, DAT_AVALIACAO, TXT_COMENTARIO, NUM_NOTA_SERVICO)
            VALUES (?, ?, ?, ?, ?)`;
    const values = [
        avaliacao.matriculaAluno,
        avaliacao.codTipoServico,
        avaliacao.data.toISOString().split("T")[0],
        avaliacao.texto ?? null,
        avaliacao.nota,
    ];
    await connection.execute(sql, values);
  }

  static async atualizar(avaliacao: AvaliacaoServico) {
    const sql = `UPDATE SAAI.TD_AVL_SERVICOS
            SET DAT_AVALIACAO = ?, TXT_COMENTARIO = ?, NUM_NOTA_SERVICO = ?
            WHERE NUM_MATRICULA_ALUNO = ? AND NUM_ID_SERVICO = ?`;

    const values = [
        avaliacao.data.toISOString().split("T")[0],
        avaliacao.texto ?? null,
        avaliacao.nota,
        avaliacao.matriculaAluno,
        avaliacao.codTipoServico,
    ];

    try {
    const result: any = await db.query(sql, values);
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
  }
  
  static async consultar(matriculaAluno: number) {
    const sql = `SELECT * FROM SAAI.TD_AVL_SERVICOS WHERE NUM_MATRICULA_ALUNO = ?`;
    const values = [matriculaAluno];
    const result = await db.query(sql, values);

    return result;
  }

  static async excluir(matriculaAluno: number, codTipoServico: number) {
    const sql = `DELETE FROM SAAI.TD_AVL_SERVICOS WHERE NUM_MATRICULA_ALUNO = ? AND NUM_ID_SERVICO = ?`;
    const values = [matriculaAluno, codTipoServico];

    const result = await db.query(sql, values); 
    return result.affectedRows > 0;
  }
}

export default AvaliacaoServicoRepository;