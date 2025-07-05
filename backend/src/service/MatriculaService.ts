import { MatriculaRepository } from "../repository/MatriculaRepository";

class MatriculaService {
  static async consultaMatricula(matriculaAluno: number) {
    return await MatriculaRepository.consultar(matriculaAluno);
  }
}

export default MatriculaService;
