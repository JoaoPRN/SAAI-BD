import express, { NextFunction, Request, response, Response } from "express";
import AlunoController from "../controller/AlunoController";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";

const router = express.Router();

router.post(
  "/criar-aluno",
  ValidacaoMiddleware(RequisicaoCriarAlunoDTO),
  AlunoController.criarAluno
);

export default router;
