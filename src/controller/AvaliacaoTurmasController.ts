import { Request, RequestHandler, Response } from "express";
import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { RequisicaoConsultaAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoConsultaAvaliacaoTurmasDTO";
import AvaliacaoTurmasService from "../service/AvaliacaoTurmasService";

class AvaliacaoTurmasController {
  static async criarAvaliacaoTurma(
    req: Request<{}, {}, RequisicaoAvaliacaoTurmasDTO>,
    res: Response
  ) {
    try {
      const sucesso = await AvaliacaoTurmasService.criarAvaliacaoTurmas(
        req.body
      );

      if (sucesso) {
        res.status(201).json({ message: "Avalicao feita com sucesso!" });
      }
      res.status(500).json({ message: "Erro interno ao gravar avaliação" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno ao gravar avaliação" });
    }
  }

  static async consultaAvaliacaoTurma(
    req: Request<{}, {}, RequisicaoConsultaAvaliacaoTurmasDTO>,
    res: Response
  ) {
    try {
      const avaliacaoTurma =
        await AvaliacaoTurmasService.consultaAvaliacaoTurma(req.body);

      res.status(201).json({ avaliacaoTurma });
    } catch (error) {
      res.status(500).json({ message: "Avaliacao não encontrada!" });
    }
  }

  static async atualizarAvaliacaoTurma(
    req: Request<{}, {}, RequisicaoAvaliacaoTurmasDTO>,
    res: Response
  ) {
    try {
      const sucesso = await AvaliacaoTurmasService.atualizarAvaliacaoTurmas(
        req.body
      );

      if (sucesso) {
        res
          .status(201)
          .json({ message: "Atualização avaliação feita com sucesso!" });
      }
      res.status(500).json({ message: "Erro interno ao atualizar avaliação" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno ao atualizar avaliação" });
    }
  }

  static async excluirAvaliacaoTurma(
    req: Request<{}, {}, RequisicaoConsultaAvaliacaoTurmasDTO>,
    res: Response
  ) {
    try {
      const sucesso = await AvaliacaoTurmasService.excluirAvaliacaoTurma(
        req.body
      );

      if (sucesso) {
        res
          .status(201)
          .json({ message: "Exclusão da avalicao feita com sucesso!" });
      }
      res.status(500).json({ message: "Erro interno ao excluir avaliação" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno ao excluir avaliação" });
    }
  }
}

export default AvaliacaoTurmasController;
