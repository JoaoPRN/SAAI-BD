import db from "../database/db";
import Aluno from "../models/Aluno";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";

class AvalicaoTurmasRepository {
  static async inserir(avaliacaoTurmas: AvaliacaoTurmas) {
    const sql = `INSERT INTO SAAI.TD_AVL_TURMA
(NUM_MATRICULA_ALUNO, COD_ID_TURMA, DAT_AVALIACAO, TXT_COMENTARIO, NUM_NOTA_CONTEUDO_DISCIPLINA, NUM_NOTA_ORGANIZACAO_DISCIPLINA, NUM_NOTA_DIDATICA_PROFESSOR, NUM_NOTA_CRITERIO_AVALIACAO, NUM_NOTA_CUMPRIMENTO_EMENTA)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    const values = [
      avaliacaoTurmas.codigoTurma,
      avaliacaoTurmas.dataAvaliacao.toISOString().split("T")[0],
      avaliacaoTurmas.notaConteudoDisciplina,
      avaliacaoTurmas.notaCriterioAvaliacao,
      avaliacaoTurmas.notaCumprimentoEmenta,
      avaliacaoTurmas.notaDidaticaProfessor,
      avaliacaoTurmas.notaOrganizacaoDisciplina,
      avaliacaoTurmas.numeroMatriculaAluno,
      avaliacaoTurmas.textoComentario,
    ];

    const result = await db.query(sql, values);

    return result.affectedRows > 0;
  }

  static async listar() {
    const sql = `SELECT * FROM SAAI.TD_AVL_TURMA`;

    const result = await db.query(sql);

    return result;
  }

  static async excluir(matricula: number) {
    const sql = `DELETE FROM SAAI.TD_AVL_TURMA WHERE NUM_MATRICULA_ALUNO = ?`;

    const result = await db.query(sql, matricula);

    return result.affectedRows > 0;
  }

  static async atualizar(matricula: number) {
    const sql = `UPDATE FROM SAAI.TD_AVL_TURMA WHERE NUM_MATRICULA_ALUNO = ?`;

    const result = await db.query(sql, matricula);

    return result.affectedRows > 0;
  }
}

export default AvalicaoTurmasRepository;
