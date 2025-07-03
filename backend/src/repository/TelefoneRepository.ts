export class TelefoneRepository {
  static async inserir(connection: any, matricula: number, telefone: string) {
    const sql = `INSERT INTO SAAI.TD_TELEFONE (NUM_MATRICULA_ALUNO, NUM_TELEFONE)
            VALUES (?, ?)`;

    await connection.execute(sql, [matricula, telefone]);
  }
}
