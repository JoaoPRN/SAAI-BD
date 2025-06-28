import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";
import AvalicaoTurmasRepository from "../repository/AvaliacaoTurmasRepository";

class AvaliacaoTurmasService {
  static async criarAvaliacaoTurmasService(
    dados: RequisicaoAvaliacaoTurmasDTO
  ) {
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

    return await AvalicaoTurmasRepository.inserir(avaliacaoTurmas);
  }
}

export default AvaliacaoTurmasService;
