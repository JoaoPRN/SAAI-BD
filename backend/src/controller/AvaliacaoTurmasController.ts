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
      await AvaliacaoTurmasService.criarAvaliacaoTurmas(req.body);

      res.status(201).json({ message: "Avaliação feita com sucesso!" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: "Erro interno ao gravar avaliação",
        erro: error.sqlMessage,
      });
    }
  }

  static async consultaAvaliacaoTurma(req: Request, res: Response) {
    try {
      const { matriculaAluno, codigoTurma } = req.params;

      const avaliacao = await AvaliacaoTurmasService.consultaAvaliacaoTurma(
        parseInt(matriculaAluno, 10),
        parseInt(codigoTurma, 10)
      );

      res.status(201).json({ avaliacao });
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

  static async excluirAvaliacaoTurma(req: Request, res: Response) {
    try {
      const { matriculaAluno, codigoTurma } = req.params;

      const sucesso = await AvaliacaoTurmasService.excluirAvaliacaoTurma(
        parseInt(matriculaAluno, 10),
        parseInt(codigoTurma, 10)
      );

      if (sucesso!) {
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
