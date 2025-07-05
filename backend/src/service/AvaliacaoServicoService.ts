import mysql from "mysql2/promise";
import config from "../database/config";
import { RequisicaoAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAvaliacaoServicoDTO";
import AvaliacaoServico from "../models/AvaliacaoServico";
import AvaliacaoServicoRepository from "../repository/AvaliacaoServicoRepository";
import db from "../database/db";

class AvaliacaoServicoService {
  static async criarAvaliacaoServico(dados: RequisicaoAvaliacaoServicoDTO) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();
      const { matriculaAluno, codTipoServico, data, texto, nota } = dados;
      const avaliacao = new AvaliacaoServico(
        matriculaAluno,
        codTipoServico,
        new Date(data),
        nota,
        texto
      );   
      await AvaliacaoServicoRepository.inserir(connection, avaliacao);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async consultaAvaliacaoServico({ matriculaAluno, codTipoServico }: { matriculaAluno: number, codTipoServico: number }) {
    return await AvaliacaoServicoRepository.consultar(matriculaAluno, codTipoServico);
  }

  static async atualizarAvaliacaoServico(dados: RequisicaoAvaliacaoServicoDTO) {

    try {
      const avaliacaoParaAtualizar = new AvaliacaoServico(
        dados.matriculaAluno,
        dados.codTipoServico,
        new Date(dados.data), 
        dados.nota,
        dados.texto
      );

      const sucesso = await AvaliacaoServicoRepository.atualizar(avaliacaoParaAtualizar);
      
      return sucesso;
    } catch (error) {
      throw error;
    }
  }

  static async excluirAvaliacaoServico({ matriculaAluno, codTipoServico }: { matriculaAluno: number, codTipoServico: number }) {
    return await AvaliacaoServicoRepository.excluir(matriculaAluno, codTipoServico);
  }
}
export default AvaliacaoServicoService;