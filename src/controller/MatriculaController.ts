import { Request, Response } from "express";
import MatriculaService from "../service/MatriculaService";

class MatriculaController {
  static async consultaAvaliacaoTurma(req: Request, res: Response) {
    try {
      const avaliacaoTurma = await MatriculaService.consultaMatricula(
        req.body.matriculaAluno
      );

      res.status(201).json({ avaliacaoTurma });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Avaliacao não encontrada!" });
    }
  }
}

export default MatriculaController;
