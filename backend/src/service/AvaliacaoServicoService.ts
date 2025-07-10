import { RequisicaoCriarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoCriarAvaliacaoServicoDTO";
import { RequisicaoAtualizarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAtualizarAvaliacaoServicoDTO";
import { RequisicaoExcluirAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoExcluirAvaliacaoServicoDTO";
import { RequisicaoListarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoListarAvaliacaoServicoDTO";
import AvaliacaoServico from "../models/AvaliacaoServico";
import AvaliacaoServicoRepository from "../repository/AvaliacaoServicoRepository";
import mysql from "mysql2/promise";
import config from "../database/config";

class AvaliacaoServicoService {
  static async criarAvaliacaoServico(dados: RequisicaoCriarAvaliacaoServicoDTO) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();

      const novaAvaliacao = new AvaliacaoServico(
        dados.matriculaAluno,
        dados.codTipoServico,
        new Date(dados.data),
        dados.nota,
        dados.texto
      );

      await AvaliacaoServicoRepository.inserir(connection, novaAvaliacao);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Erro ao inserir avaliação de serviço:", error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async atualizarAvaliacaoServico(dados: RequisicaoAtualizarAvaliacaoServicoDTO) {
    const avaliacao = new AvaliacaoServico(
      dados.matriculaAluno,
      dados.codTipoServico,
      new Date(dados.data),
      dados.nota,
      dados.texto
    );

    return await AvaliacaoServicoRepository.atualizar(avaliacao);
  }
  
  static async consultaAvaliacaoServico(dados: RequisicaoListarAvaliacaoServicoDTO) {
    return await AvaliacaoServicoRepository.consultar(dados.matriculaAluno);
  }

  static async excluirAvaliacaoServico(dados: RequisicaoExcluirAvaliacaoServicoDTO) {
    return await AvaliacaoServicoRepository.excluir(dados.matriculaAluno, dados.codTipoServico);
  }
}

export default AvaliacaoServicoService;
