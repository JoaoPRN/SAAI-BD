import { Request, RequestHandler, Response } from "express";
import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import AvaliacaoTurmasService from "../service/AvaliacaoTurmasService";

class AvaliacaoTurmasController {
  static async criarAvaliacaoTurma(
    req: Request<{}, {}, RequisicaoAvaliacaoTurmasDTO>,
    res: Response
  ) {
    try {
      const sucesso = await AvaliacaoTurmasService.criarAvaliacaoTurmasService(
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
}

export default AvaliacaoTurmasController;
