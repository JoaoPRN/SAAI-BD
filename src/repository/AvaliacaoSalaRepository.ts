import { Connection } from "mysql2/promise";
import db from "../database/db";
import AvaliacaoSala from "../models/AvaliacaoSalaModels";

class AvaliacaoSalaRepository {
  static async criar(connection: any, avaliacao: AvaliacaoSala) {
    const sql = `
      INSERT INTO sistema_avaliativo.TD_AVL_SL_AULA (
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
    const sql = `SELECT * FROM sistema_avaliativo.TD_AVL_SL_AULA`;

    const [rows] = await db.query(sql);
    return rows;
  }

  //static async atuali

  static async excluir(connection: Connection, matricula: number, numSala: number, semestre: number) {
    const [resultado] = await connection.query(
      `DELETE FROM sistema_avaliativo.TD_AVL_SL_AULA 
       WHERE NUM_MATRICULA_ALUNO = ? AND NUM_SALA = ? AND NUM_SEMESTRE = ?`,
      [matricula, numSala, semestre]
    );

    return resultado;
  }
}

export default AvaliacaoSalaRepository;
