import db from "../database/db";
import Aluno from "../models/Aluno";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";

class AvalicaoTurmasRepository {
  static async inserir(connection: any, avaliacaoTurmas: AvaliacaoTurmas) {
    const sql = `INSERT INTO SAAI.TD_AVL_TURMA
                (NUM_MATRICULA_ALUNO, COD_ID_TURMA, DAT_AVALIACAO, TXT_COMENTARIO, NUM_NOTA_CONTEUDO_DISCIPLINA, NUM_NOTA_ORGANIZACAO_DISCIPLINA, NUM_NOTA_DIDATICA_PROFESSOR, NUM_NOTA_CRITERIO_AVALIACAO, NUM_NOTA_CUMPRIMENTO_EMENTA)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [
      avaliacaoTurmas.numeroMatriculaAluno,
      avaliacaoTurmas.codigoTurma,
      avaliacaoTurmas.dataAvaliacao.toISOString().split("T")[0],
      avaliacaoTurmas.textoComentario,
      avaliacaoTurmas.notaConteudoDisciplina,
      avaliacaoTurmas.notaOrganizacaoDisciplina,
      avaliacaoTurmas.notaDidaticaProfessor,
      avaliacaoTurmas.notaCriterioAvaliacao,
      avaliacaoTurmas.notaCumprimentoEmenta,
    ];

    await connection.execute(sql, values);
  }

  static async consulta(matriculaAluno: number, codigoTurma: number) {
    const sql = `SELECT * FROM SAAI.TD_AVL_TURMA WHERE NUM_MATRICULA_ALUNO = ? AND COD_ID_TURMA = ?`;
    const values = [matriculaAluno, codigoTurma];
    const result = await db.query(sql, values);

    return result;
  }

  static async excluir(matriculaAluno: number, codigoTurma: number) {
    const sql = `DELETE FROM SAAI.TD_AVL_TURMA WHERE NUM_MATRICULA_ALUNO = ? AND COD_ID_TURMA = ?`;
    const values = [matriculaAluno, codigoTurma];
    const result = await db.query(sql, values);

    return result.affectedRows > 0;
  }

  static async atualizar(avaliacaoTurmas: AvaliacaoTurmas) {
    const sql = `UPDATE SAAI.TD_AVL_TURMA
                SET DAT_AVALIACAO=?, TXT_COMENTARIO=?, NUM_NOTA_CONTEUDO_DISCIPLINA=?, 
                NUM_NOTA_ORGANIZACAO_DISCIPLINA=?, NUM_NOTA_DIDATICA_PROFESSOR=?, NUM_NOTA_CRITERIO_AVALIACAO=?, NUM_NOTA_CUMPRIMENTO_EMENTA=?
                WHERE NUM_MATRICULA_ALUNO=? AND COD_ID_TURMA=?;`;

    const result = await db.query(sql, avaliacaoTurmas);

    return result.affectedRows > 0;
  }
}

export default AvalicaoTurmasRepository;
