import mysql from "mysql2/promise";
import config from "../database/config";
import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { RequisicaoConsultaAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoConsultaAvaliacaoTurmasDTO";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";
import AvalicaoTurmasRepository from "../repository/AvaliacaoTurmasRepository";
import { MatriculaRepository } from "../repository/MatriculaRepository";

class AvaliacaoTurmasService {
  static async criarAvaliacaoTurmas(dados: RequisicaoAvaliacaoTurmasDTO) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();
      const {
        numeroMatriculaAluno,
        codigoTurma,
        dataAvaliacao,
        textoComentario,
        notaConteudoDisciplina,
        notaOrganizacaoDisciplina,
        notaDidaticaProfessor,
        notaCriterioAvaliacao,
        notaCumprimentoEmenta,
      } = dados;

      const avaliacaoTurma = new AvaliacaoTurmas(
        numeroMatriculaAluno,
        codigoTurma,
        new Date(dataAvaliacao),
        textoComentario,
        notaConteudoDisciplina,
        notaOrganizacaoDisciplina,
        notaDidaticaProfessor,
        notaCriterioAvaliacao,
        notaCumprimentoEmenta
      );

      await AvalicaoTurmasRepository.inserir(connection, avaliacaoTurma);
      await MatriculaRepository.atualizarIndicador(
        connection,
        numeroMatriculaAluno,
        codigoTurma
      );
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async atualizarAvaliacaoTurmas(dados: RequisicaoAvaliacaoTurmasDTO) {
    const {
      numeroMatriculaAluno,
      codigoTurma,
      dataAvaliacao,
      textoComentario,
      notaConteudoDisciplina,
      notaOrganizacaoDisciplina,
      notaDidaticaProfessor,
      notaCriterioAvaliacao,
      notaCumprimentoEmenta,
    } = dados;

    const avaliacaoTurmas = new AvaliacaoTurmas(
      numeroMatriculaAluno,
      codigoTurma,
      new Date(dataAvaliacao),
      textoComentario,
      notaConteudoDisciplina,
      notaOrganizacaoDisciplina,
      notaDidaticaProfessor,
      notaCriterioAvaliacao,
      notaCumprimentoEmenta
    );

    return await AvalicaoTurmasRepository.atualizar(avaliacaoTurmas);
  }

  static async consultaAvaliacaoTurma(
    dados: RequisicaoConsultaAvaliacaoTurmasDTO
  ) {
    const { matriculaAluno, codigoTurma } = dados;

    return await AvalicaoTurmasRepository.consulta(matriculaAluno, codigoTurma);
  }

  static async excluirAvaliacaoTurma(
    dados: RequisicaoConsultaAvaliacaoTurmasDTO
  ) {
    const { matriculaAluno, codigoTurma } = dados;

    return await AvalicaoTurmasRepository.excluir(matriculaAluno, codigoTurma);
  }
}

export default AvaliacaoTurmasService;
