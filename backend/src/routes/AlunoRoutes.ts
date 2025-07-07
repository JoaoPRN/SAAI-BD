import { RequestHandler, Router } from "express";
import AlunoController from "../controller/AlunoController";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoExcluirAlunoDTO } from "../dtos/alunoDTO/RequisicaoExcluirAlunoDTO";
import upload from "../middleware/uploadMiddleware"

const router = Router();

router.post(
  "/criar-aluno",
  upload.single("foto"), 
  ValidacaoMiddleware(RequisicaoCriarAlunoDTO),
  AlunoController.criarAluno
);

router.delete(
  "/excluir-aluno",
  ValidacaoMiddleware(RequisicaoExcluirAlunoDTO),
  AlunoController.excluirAluno
);

router.get("/listar-alunos", AlunoController.listarAlunos);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     RequisicaoCriarAlunoDTO:
 *       type: object
 *       required:
 *         - matricula
 *         - nome
 *         - curso
 *         - dataIngresso
 *         - dataNascimento
 *         - telefone
 *       properties:
 *         matricula:
 *           type: string
 *           pattern: '^\d{9}$'
 *           example: "123456789"
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         curso:
 *           type: string
 *           example: "Engenharia de Computação"
 *         dataIngresso:
 *           type: string
 *           format: date
 *           example: "2023-03-15"
 *         dataNascimento:
 *           type: string
 *           format: date
 *           example: "2000-06-20"
 *         telefone:
 *           type: string
 *           pattern: '^\d{11}$'
 *           example: "61999999999"
 *         foto:
 *           type: string
 *           format: binary
 *           nullable: true
 *     RequisicaoExcluirAlunoDTO:
 *       type: object
 *       required:
 *         - matricula
 *       properties:
 *         matricula:
 *           type: string   # também string para o mesmo motivo (pattern)
 *           pattern: '^\d{9}$'
 *           example: "123456789"
 */

/**
 * @swagger
 * /aluno/criar-aluno:
 *   post:
 *     summary: Cria um novo aluno
 *     tags:
 *       - Alunos
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequisicaoCriarAlunoDTO'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 */

/**
 * @swagger
 * /aluno/excluir-aluno:
 *   delete:
 *     summary: Exclui um aluno
 *     tags:
 *       - Alunos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequisicaoExcluirAlunoDTO'
 *     responses:
 *       200:
 *         description: Aluno excluído com sucesso
 */

/**
 * @swagger
 * /aluno/listar-alunos:
 *   get:
 *     summary: Lista alunos
 *     tags:
 *       - Alunos
 *     responses:
 *       200:
 *         description: Listagem realizada com sucesso
 */
