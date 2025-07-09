import mysql from "mysql2/promise";
import config from "../database/config";
import AvaliacaoSala from "../models/AvaliacaoSalaModels";
import AvaliacaoSalaRepository from "../repository/AvaliacaoSalaRepository";
import { RequisicaoCriarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoCriarAvaliacaoSalaDTO";
import { RequisicaoAtualizarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoAtualizarAvaliacaoSalaDTO";

class AvaliacaoSalaService {
  static async criarAvaliacaoSala(dados: RequisicaoCriarAvaliacaoSalaDTO) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();

      // Verificar se a sala existe na tabela de salas
      const [salaExiste] = await connection.query(
        "SELECT 1 FROM SAAI.TD_SALA WHERE NUM_SALA = ?",
        [dados.sala]
      );

      if ((salaExiste as any[]).length === 0) {
        throw new Error("Sala informada não existe.");
      }

      const {
        matricula,
        sala,
        semestre,
        dataAvaliacao,
        comentario,
        notaAcessibilidade,
        notaInfraestrutura,
        notaLimpeza,
        notaConforto,
        notaIluminacao,
        notaAcustica,
      } = dados;

      const novaAvaliacao = new AvaliacaoSala(
        matricula,
        sala,
        semestre,
        new Date(dataAvaliacao),
        notaAcessibilidade,
        notaInfraestrutura,
        notaLimpeza,
        notaConforto,
        notaIluminacao,
        notaAcustica,
        comentario
      );

      await AvaliacaoSalaRepository.criar(connection, novaAvaliacao);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async atualizarAvaliacaoSala(
    matricula: number,
    sala: number,
    semestre: string,
    dadosAtualizados: RequisicaoAtualizarAvaliacaoSalaDTO
  ) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();

      await AvaliacaoSalaRepository.atualizar(
        connection,
        matricula,
        sala,
        semestre,
        dadosAtualizados
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async excluirAvaliacaoSala(
    matricula: number,
    sala: number,
    semestre: string
  ) {
    const connection = await mysql.createConnection(config.db);
    try {
      await connection.beginTransaction();

      await AvaliacaoSalaRepository.excluir(
        connection,
        matricula,
        sala,
        semestre
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }
  }

  static async listarAvaliacaoSalas() {
    const avaliacoes = await AvaliacaoSalaRepository.listar();
    console.log(avaliacoes);
    return avaliacoes;
  }
}

export default AvaliacaoSalaService;
