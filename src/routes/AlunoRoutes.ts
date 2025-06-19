import express, { NextFunction, Request, response, Response } from "express";
import AlunoController from "../controller/AlunoController";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = express.Router();

router.post("/criar-aluno", AlunoController.criarAluno);

export default router;
