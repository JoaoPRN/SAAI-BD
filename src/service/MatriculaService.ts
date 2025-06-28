import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { RequisicaoConsultaAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoConsultaAvaliacaoTurmasDTO";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";
import AvalicaoTurmasRepository from "../repository/AvaliacaoTurmasRepository";

class AvaliacaoTurmasService {
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
      dataAvaliacao,
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

    const resultado = await AvalicaoTurmasRepository.consulta(
      matriculaAluno,
      codigoTurma
    );
    const avaliacaoTurma = new AvaliacaoTurmas(
      resultado.numeroMatriculaAluno,
      resultado.codigoTurma,
      resultado.dataAvaliacao,
      resultado.textoComentario,
      resultado.notaConteudoDisciplina,
      resultado.notaOrganizacaoDisciplina,
      resultado.notaDidaticaProfessor,
      resultado.notaCriterioAvaliacao,
      resultado.notaCumprimentoEmenta
    );

    return avaliacaoTurma;
  }
}

export default AvaliacaoTurmasService;
