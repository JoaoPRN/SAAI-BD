import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { RequisicaoConsultaAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoConsultaAvaliacaoTurmasDTO";
import AvaliacaoTurmas from "../models/AvaliacaoTurmas";
import Matricula from "../models/Matricula";
import AvalicaoTurmasRepository from "../repository/AvaliacaoTurmasRepository";
import { MatriculaRepository } from "../repository/MatriculaRepository";

class MatriculaService {
  static async consultaMatricula(matriculaAluno: number) {
    return await MatriculaRepository.consultar(matriculaAluno);
  }
}

export default MatriculaService;
