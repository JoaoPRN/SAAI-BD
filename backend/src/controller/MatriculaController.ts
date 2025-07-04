import { Request, Response } from "express";
import MatriculaService from "../service/MatriculaService";

class MatriculaController {
  static async consultarMatricula(req: Request, res: Response) {
    try {
      const matriculaALuno = await MatriculaService.consultaMatricula(
        req.body.matriculaAluno
      );

      res.status(201).json({ matriculaALuno });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Matricula não encontrada!" });
    }
  }
}

export default MatriculaController;
