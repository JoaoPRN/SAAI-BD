import { Request, Response } from "express";
import db from "../database/db";
import Aluno from "../models/Aluno";
import AlunoService from "../service/AlunoService";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";

class AlunoController {
  static async criarAluno(
    req: Request<{}, {}, RequisicaoCriarAlunoDTO>,
    res: Response
  ) {
    try {
      const criadoComSucesso = await AlunoService.criarAluno(req.body);

      if (criadoComSucesso) {
        res.status(201).json({
          message: "Aluno criado com sucesso!",
        });
      } else {
        res
          .status(500)
          .json({ message: "Falha ao criar aluno no banco de dados." });
      }
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      res.status(500).json({ message: "Erro interno ao criar aluno." });
    }
  }
}

export default AlunoController;
