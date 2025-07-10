import { Connection } from "mysql2/promise";
import db from "../database/db";
import AvaliacaoSala from "../models/AvaliacaoSalaModels";
import { RequisicaoAtualizarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoAtualizarAvaliacaoSalaDTO";

class AvaliacaoSalaRepository {
  static async criar(connection: any, avaliacao: AvaliacaoSala) {
    const sql = `
      INSERT INTO SAAI.TD_AVL_SL_AULA (
        NUM_MATRICULA_ALUNO,
        NUM_SALA,
        NUM_SEMESTRE,
        DAT_AVALIACAO,
        TXT_COMENTARIO,
        NUM_NOTA_ACESSIBILIDADE,
        NUM_NOTA_INFRAESTRUTURA,
        NUM_NOTA_LIMPEZA,
        NUM_NOTA_CONFORTO,
        NUM_NOTA_ILUMINACAO,
        NUM_NOTA_ACUSTICA
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      avaliacao.matricula,
      avaliacao.sala,
      avaliacao.semestre,
      avaliacao.dataAvaliacao.toISOString().split("T")[0],
      avaliacao.comentario || null,
      avaliacao.notaAcessibilidade,
      avaliacao.notaInfraestrutura,
      avaliacao.notaLimpeza,
      avaliacao.notaConforto,
      avaliacao.notaIluminacao,
      avaliacao.notaAcustica,
    ];

    await connection.execute(sql, values);
  }

  static async listar() {
    const sql = `SELECT * FROM SAAI.TD_AVL_SL_AULA`;

    const rows = await db.query(sql);
    console.log(Array.isArray(rows), rows.length);

    return rows;
  }

  static async atualizar(
    connection: Connection,
    matricula: number,
    numSala: number,
    semestre: string,
    dadosAtualizados: RequisicaoAtualizarAvaliacaoSalaDTO
  ) {
    const {
      comentario,
      notaAcessibilidade,
      notaInfraestrutura,
      notaLimpeza,
      notaConforto,
      notaIluminacao,
      notaAcustica,
    } = dadosAtualizados;

    const [resultado] = await connection.query(
      `UPDATE SAAI.TD_AVL_SL_AULA SET 
      TXT_COMENTARIO = ?,
      NUM_NOTA_ACESSIBILIDADE = ?,
      NUM_NOTA_INFRAESTRUTURA = ?,
      NUM_NOTA_LIMPEZA = ?,
      NUM_NOTA_CONFORTO = ?,
      NUM_NOTA_ILUMINACAO = ?,
      NUM_NOTA_ACUSTICA = ?,
      DAT_AVALIACAO = CURRENT_DATE()
     WHERE NUM_MATRICULA_ALUNO = ? AND NUM_SALA = ? AND NUM_SEMESTRE = ?`,
      [
        comentario,
        notaAcessibilidade,
        notaInfraestrutura,
        notaLimpeza,
        notaConforto,
        notaIluminacao,
        notaAcustica,
        matricula,
        numSala,
        semestre,
      ]
    );

    return resultado;
  }

  static async excluir(
    connection: Connection,
    matricula: number,
    numSala: number,
    semestre: string
  ) {
    console.log(matricula, numSala, semestre);
    const [resultado] = await connection.query(
      `DELETE FROM SAAI.TD_AVL_SL_AULA 
       WHERE NUM_MATRICULA_ALUNO = ? AND NUM_SALA = ? AND NUM_SEMESTRE = ?`,
      [matricula, numSala, semestre]
    );

    return resultado;
  }

  static async excluirPorMatricula(connection: Connection, matricula: number) {
    const [resultado] = await connection.query(
      `DELETE FROM SAAI.TD_AVL_SL_AULA 
       WHERE NUM_MATRICULA_ALUNO = ?`,
      [matricula]
    );

    return resultado;
  }
}

export default AvaliacaoSalaRepository;
