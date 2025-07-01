import { Request, RequestHandler, Response } from "express";
import AvaliacaoSalaService from "../service/AvaliacaoSalaService";
import { RequisicaoExcluirAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoExcluirAlunoDTO";
import { RequisicaoCriarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoCriarAvaliacaoSalaDTO";
import { log } from "console";
import { RequisicaoAtualizarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoAtualizarAvaliacaoSalaDTO";

class AvaliacaoSalaController {
  static async criarAvaliacaoSala(
    req: Request<{}, {}, RequisicaoCriarAvaliacaoSalaDTO>,
    res: Response
  ) {
    try {

      await AvaliacaoSalaService.criarAvaliacaoSala(req.body);
      res.status(201).json({ message: "AvaliacaoSala criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      res.status(500).json({ message: "Erro interno ao criar aluno" });
    }
  }

  static async listarAvaliacaoSalas(req: Request, res: Response) {
    try {
      const listaAvaliacaoSalas = await AvaliacaoSalaService.listarAvaliacaoSalas();

      res.status(200).json({
        listaAvaliacaoSalas,
      });
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      res.status(500).json({ message: "Erro interno ao listar alunos." });
    }
  }


  static async atualizarAvaliacaoSala(
    req: Request<{ matricula: string; sala: string; semestre: string }, {}, RequisicaoAtualizarAvaliacaoSalaDTO>,
    res: Response
  ) {
    try {
      const { matricula, sala, semestre } = req.params;
      const dadosAtualizados = req.body;

      await AvaliacaoSalaService.atualizarAvaliacaoSala(
        parseInt(matricula, 10),
        parseInt(sala, 10),
        semestre,
        dadosAtualizados
      );

      res.status(200).json({ message: "Avaliação atualizada com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
      res.status(500).json({ message: "Erro interno ao atualizar avaliação." });
    }
  }



  static async excluirAvaliacaoSala(
    req: Request<{}, {}, RequisicaoExcluirAvaliacaoSalaDTO>,
    res: Response
  ) {
    try {
      const { matricula, sala, semestre } = req.body;

      await AvaliacaoSalaService.excluirAvaliacaoSala(
        matricula,
        sala,
        semestre
      );

      res.status(200).json({
        message: "Avaliação excluída com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
      res.status(500).json({ message: "Erro interno ao excluir avaliação." });
    }
  }
}
export default AvaliacaoSalaController;
