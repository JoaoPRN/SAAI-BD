import mysql from "mysql2/promise";
import config from "../database/config";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import Aluno from "../models/Aluno";
import AlunoRepository from "../repository/AlunoRepository";
import { TelefoneRepository } from "../repository/TelefoneRepository";

class AlunoService {
  static async criarAluno(dados: RequisicaoCriarAlunoDTO) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();
      const {
        matricula,
        nome,
        curso,
        dataIngresso,
        dataNascimento,
        telefone,
        foto,
      } = dados;

      console.log(telefone);

      const novoAluno = new Aluno(
        matricula,
        nome,
        curso,
        new Date(dataIngresso),
        new Date(dataNascimento),
        foto
      );

      await AlunoRepository.inserir(connection, novoAluno);
      await TelefoneRepository.inserir(connection, matricula, telefone);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async excluirAluno(matricula: number) {
    const alunos = await AlunoRepository.excluir(matricula);

    return alunos;
  }

  static async listarAlunos() {
    return await AlunoRepository.listar();
  }
}

export default AlunoService;
