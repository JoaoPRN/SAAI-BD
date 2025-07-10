import { Router } from "express";
import AvaliacaoTurmasController from "../controller/AvaliacaoTurmasController";
import { RequisicaoAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoAvaliacaoTurmasDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import { RequisicaoExcluirAvaliacaoTurmasDTO } from "../dtos/avaliacaoTurmas/RequisicaoExcluirAvaliacaoTurmasDTO";
import AvaliacaoTurmasService from "../service/AvaliacaoTurmasService";

const router = Router();

router.post(
  "/avaliar",
  ValidacaoMiddleware(RequisicaoAvaliacaoTurmasDTO),
  AvaliacaoTurmasController.criarAvaliacaoTurma
);

router.put(
  "/atualizar",
  ValidacaoMiddleware(RequisicaoAvaliacaoTurmasDTO),
  AvaliacaoTurmasController.atualizarAvaliacaoTurma
);

router.delete(
  "/excluir/:matriculaAluno/:codigoTurma",
  AvaliacaoTurmasController.excluirAvaliacaoTurma
);

router.get(
  "/consultar/:matriculaAluno/:codigoTurma",
  AvaliacaoTurmasController.consultaAvaliacaoTurma
);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     RequisicaoAvaliacaoTurmasDTO:
 *       type: object
 *       required:
 *         - numeroMatriculaAluno
 *         - codigoTurma
 *         - dataAvaliacao
 *         - textoComentario
 *         - notaConteudoDisciplina
 *         - notaOrganizacaoDisciplina
 *         - notaDidaticaProfessor
 *         - notaCriterioAvaliacao
 *         - notaCumprimentoEmenta
 *       properties:
 *         numeroMatriculaAluno:
 *           type: integer
 *           example: 202312345
 *         codigoTurma:
 *           type: integer
 *           example: 1
 *         dataAvaliacao:
 *           type: string
 *           format: date
 *           example: "2025-07-07"
 *         textoComentario:
 *           type: string
 *           maxLength: 250
 *           example: "A disciplina foi bem organizada e o professor foi claro."
 *         notaConteudoDisciplina:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 4
 *         notaOrganizacaoDisciplina:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 5
 *         notaDidaticaProfessor:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 4
 *         notaCriterioAvaliacao:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 3
 *         notaCumprimentoEmenta:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           example: 5
 */

/**
 * @swagger
 * /avaliacao-turmas/avaliar:
 *   post:
 *     summary: Cria uma avaliação para uma turma
 *     tags:
 *       - Avaliação Turmas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequisicaoAvaliacaoTurmasDTO'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 */

/**
 * @swagger
 * /avaliacao-turmas/atualizar:
 *   put:
 *     summary: Atualiza uma avaliação de turma existente
 *     tags:
 *       - Avaliação Turmas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequisicaoAvaliacaoTurmasDTO'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 */

/**
 * @swagger
 * /avaliacao-turmas/excluir/{matriculaAluno}/{codigoTurma}:
 *   delete:
 *     summary: Exclui uma avaliação de turma
 *     tags:
 *       - Avaliação Turmas
 *     parameters:
 *       - in: path
 *         name: matriculaAluno
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: codigoTurma
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 */

/**
 * @swagger
 * /avaliacao-turmas/consultar/{matriculaAluno}/{codigoTurma}:
 *   get:
 *     summary: Consulta avaliação de uma turma
 *     tags:
 *       - Avaliação Turmas
 *     parameters:
 *       - in: path
 *         name: matriculaAluno
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: codigoTurma
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Avaliação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RequisicaoAvaliacaoTurmasDTO'
 */
