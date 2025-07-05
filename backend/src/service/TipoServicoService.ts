import TipoServicoRepository from "../repository/TipoServicoRepository";

//importar requisicao de avaliacao de tipos de servico
//importar requisicao de consulta de avaliacao de tipos de serv
//importar avaliacao de servicos
//importar matricula
//importar avaliacao de matricula
//importar matrilarepository

class TipoServicoService {
  static async listarTodos() {
    return await TipoServicoRepository.listarTodos();
  }

  static async buscarPorId(id: number) {
    return await TipoServicoRepository.buscarPorId(id);
  }

  // Consulta por nome, útil para validação antes de avaliação de serviço
  static async buscarPorNome(nome: string) {
    return await TipoServicoRepository.buscarPorNome(nome);
  }
}

export default TipoServicoService;