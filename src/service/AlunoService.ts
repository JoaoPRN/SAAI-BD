import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import Aluno from "../models/Aluno";
import AlunoRepository from "../repository/AlunoRepository";

class AlunoService {
  static async criarAluno(dados: RequisicaoCriarAlunoDTO) {
    const { matricula, nome, curso, dataIngresso, dataNascimento } = dados;

    const novoAluno = new Aluno(
      matricula,
      nome,
      curso,
      new Date(dataIngresso),
      new Date(dataNascimento)
    );

    const sucesso = await AlunoRepository.inserir(novoAluno);
    return sucesso;
  }
}

export default AlunoService;
