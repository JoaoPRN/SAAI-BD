import { Router } from "express";
import AvaliacaoServicoController from "../controller/AvaliacaoServicoController";
import { RequisicaoCriarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoCriarAvaliacaoServicoDTO";
import { RequisicaoAtualizarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAtualizarAvaliacaoServicoDTO";
import { RequisicaoExcluirAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoExcluirAvaliacaoServicoDTO"; // AGORA USADA
import { RequisicaoListarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoListarAvaliacaoServicoDTO"; // AGORA USADA
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";

const router = Router();

router.post(
  "/avaliar",
  ValidacaoMiddleware(RequisicaoCriarAvaliacaoServicoDTO),
  AvaliacaoServicoController.criarAvaliacaoServico
);

router.put(
  "/atualizar",
  ValidacaoMiddleware(RequisicaoAtualizarAvaliacaoServicoDTO),
  AvaliacaoServicoController.atualizarAvaliacaoServico
);

router.delete(
  "/excluir",
  ValidacaoMiddleware(RequisicaoExcluirAvaliacaoServicoDTO),
  AvaliacaoServicoController.excluirAvaliacaoServico
);

router.get(
  "/listar",
  ValidacaoMiddleware(RequisicaoListarAvaliacaoServicoDTO),
  AvaliacaoServicoController.consultaAvaliacaoServico
);

export default router;

/**
 * @swagger
 * /avaliacao-servicos/avaliar:
 *   post:
 *     summary: Criar avaliação de serviço
 *     tags:
 *       - Avaliação de Serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matriculaAluno
 *               - codTipoServico
 *               - data
 *               - nota
 *             properties:
 *               matriculaAluno:
 *                 type: integer
 *                 example: 202312345
 *                 description: Matrícula do aluno que avaliou
 *               codTipoServico:
 *                 type: integer
 *                 example: 7
 *                 description: Código do tipo de serviço avaliado
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-07"
 *                 description: Data da avaliação (formato ISO)
 *               texto:
 *                 type: string
 *                 example: "Atendimento excelente, mas fila demorada."
 *                 description: Comentário opcional
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *                 description: Nota da avaliação (1 a 5)
 *     responses:
 *       201:
 *         description: Avaliação de serviço criada com sucesso
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacao-servicos/atualizar:
 *   put:
 *     summary: Atualizar uma avaliação de serviço existente
 *     tags:
 *       - Avaliação de Serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matriculaAluno
 *               - codTipoServico
 *               - data
 *               - nota
 *             properties:
 *               matriculaAluno:
 *                 type: integer
 *                 example: 202312345
 *                 description: Matrícula do aluno que realizou a avaliação
 *               codTipoServico:
 *                 type: integer
 *                 example: 3
 *                 description: Código do tipo de serviço avaliado
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-07"
 *                 description: Data da avaliação (formato ISO)
 *               texto:
 *                 type: string
 *                 example: "Serviço melhorou desde a última vez."
 *                 description: Comentário atualizado (opcional)
 *               nota:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *                 description: Nova nota atribuída
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Requisição inválida (validação falhou)
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacao-servicos/excluir:
 *   delete:
 *     summary: Excluir uma avaliação de serviço
 *     tags:
 *       - Avaliação de Serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matriculaAluno
 *               - codTipoServico
 *             properties:
 *               matriculaAluno:
 *                 type: integer
 *                 minimum: 1
 *                 example: 202312345
 *                 description: Matrícula do aluno que fez a avaliação
 *               codTipoServico:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *                 description: Código do tipo de serviço avaliado
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Avaliação excluída com sucesso.
 *       400:
 *         description: Requisição inválida (validação falhou)
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /avaliacao-servicos/listar:
 *   get:
 *     summary: Listar avaliações de serviço de um aluno
 *     tags:
 *       - Avaliação de Serviço
 *     parameters:
 *       - name: matriculaAluno
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 202312345
 *         description: Matrícula do aluno
 *       - name: codTipoServico
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 2
 *         description: Código do tipo de serviço (opcional)
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   matriculaAluno:
 *                     type: integer
 *                     example: 202312345
 *                   codTipoServico:
 *                     type: integer
 *                     example: 2
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: "2025-07-07"
 *                   texto:
 *                     type: string
 *                     example: "Atendimento cordial e rápido."
 *                   nota:
 *                     type: integer
 *                     minimum: 1
 *                     maximum: 5
 *                     example: 5
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
