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

  static async consultar(matriculaAluno: number, codTipoServico?: number) {
    let sql = `SELECT * FROM SAAI.TD_AVL_SERVICOS WHERE NUM_MATRICULA_ALUNO = ?`;
    const values: (number | undefined)[] = [matriculaAluno];

    if (codTipoServico !== undefined) {
      sql += ` AND NUM_ID_SERVICO = ?`; // caso fornecido
      values.push(codTipoServico);
    }

    try {
      const queryResult = await db.query(sql, values);
      console.log("Repository.consultar: Tipo do retorno de db.query:", typeof queryResult, Array.isArray(queryResult));
      console.log("Repository.consultar: Conteúdo do retorno de db.query:", queryResult);

      // Verificação defensiva antes da desestruturação
      if (!Array.isArray(queryResult) || queryResult.length < 1) {
        console.error("Repository.consultar: db.query não retornou um array ou array vazio como esperado.");
        // Dependendo da sua lógica, você pode retornar um array vazio ou lançar um erro
        return [];
      }

      const [rows] = queryResult; // Desestrutura o primeiro elemento (linhas)
      return rows; // Retorna as linhas
    } catch (error) {
      console.error("Repository.consultar: Erro ao executar query de consulta:", error);
      throw error;
    }
  }

  static async excluir(matriculaAluno: number, codTipoServico: number) {
    const sql = `DELETE FROM SAAI.TD_AVL_SERVICOS WHERE NUM_MATRICULA_ALUNO = ? AND NUM_ID_SERVICO = ?`;
    const values = [matriculaAluno, codTipoServico];

    const [result] = await db.query(sql, values); // Desestruturando o primeiro valor, que é o ResultSetHeader

    // Exibindo para depuração
    console.log("Repository.excluir: Tipo do retorno de db.query:", typeof result); 
    console.log("Repository.excluir: Conteúdo do retorno de db.query:", result);

    // Verificando se a propriedade affectedRows existe e é maior que 0
    if (result && result.affectedRows > 0) {
        return true; // Sucesso na exclusão
    }

    return false; // Não encontrou a avaliação ou não foi excluída
  }
}

export default AvaliacaoServicoRepository;