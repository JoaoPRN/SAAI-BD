import { Router } from "express";
import AvaliacaoSalaController from "../controller/AvaliacaoSalaController";
import { RequisicaoAtualizarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoAtualizarAvaliacaoSalaDTO";
import { RequisicaoCriarAvaliacaoSalaDTO } from "../dtos/avaliacaoSala/RequisicaoCriarAvaliacaoSalaDTO";
import { ValidacaoMiddleware } from "../middleware/ValidacaoMiddleware";
import AvaliacaoSalaService from "../service/AvaliacaoSalaService";

const router = Router();

router.post(
  "/criar",
  ValidacaoMiddleware(RequisicaoCriarAvaliacaoSalaDTO),
  AvaliacaoSalaController.criarAvaliacaoSala
);

router.get("/listar", AvaliacaoSalaController.listarAvaliacaoSalas);

router.put(
  "/atualizar/:matricula/:sala/:semestre",
  ValidacaoMiddleware(RequisicaoAtualizarAvaliacaoSalaDTO),
  async (req, res, next) => {
    try {
      const { matricula, sala, semestre } = req.params;
      const dadosAtualizados: RequisicaoAtualizarAvaliacaoSalaDTO = req.body;

      await AvaliacaoSalaService.atualizarAvaliacaoSala(
        parseInt(matricula, 10),
        parseInt(sala, 10),
        semestre,
        dadosAtualizados
      );

      res.status(200).json({ mensagem: "Avaliação atualizada com sucesso." });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/excluir/:matricula/:sala/:semestre", async (req, res, next) => {
  try {
    console.log(req.params);
    const { matricula, sala, semestre } = req.params;
    console.log(matricula, sala, semestre);
    await AvaliacaoSalaService.excluirAvaliacaoSala(
      parseInt(matricula),
      parseInt(sala),
      semestre
    );

    res.status(200).json({ mensagem: "Avaliação excluída com sucesso." });
  } catch (error) {
    next(error);
  }
});

export default router;

/**
 * @swagger
 * /avaliacaoSalaAula/criar:
 *   post:
 *     summary: Criar avaliação de sala
 *     tags:
 *       - Avaliação de Sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - matricula
 *               - sala
 *               - semestre
 *               - dataAvaliacao
 *               - notaAcessibilidade
 *               - notaInfraestrutura
 *               - notaLimpeza
 *               - notaConforto
 *               - notaIluminacao
 *               - notaAcustica
 *             properties:
 *               matricula:
 *                 type: integer
 *                 example: 202312345
 *               sala:
 *                 type: integer
 *                 example: 101
 *               semestre:
 *                 type: string
 *                 maxLength: 6
 *                 example: "2024.1"
 *               dataAvaliacao:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-07"
 *               comentario:
 *                 type: string
 *                 maxLength: 250
 *                 example: "Sala quente, iluminação fraca."
 *               notaAcessibilidade:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               notaInfraestrutura:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               notaLimpeza:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *               notaConforto:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 2
 *               notaIluminacao:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               notaAcustica:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacaoSalaAula/listar:
 *   get:
 *     summary: Listar avaliações de salas
 *     tags:
 *       - Avaliação de Sala
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
 *                   matricula:
 *                     type: integer
 *                     example: 202312345
 *                   sala:
 *                     type: integer
 *                     example: 101
 *                   semestre:
 *                     type: string
 *                     example: "2024.1"
 *                   dataAvaliacao:
 *                     type: string
 *                     format: date
 *                     example: "2025-07-07"
 *                   comentario:
 *                     type: string
 *                     example: "Sala com boa iluminação."
 *                   notaAcessibilidade:
 *                     type: integer
 *                     example: 4
 *                   notaInfraestrutura:
 *                     type: integer
 *                     example: 5
 *                   notaLimpeza:
 *                     type: integer
 *                     example: 3
 *                   notaConforto:
 *                     type: integer
 *                     example: 2
 *                   notaIluminacao:
 *                     type: integer
 *                     example: 4
 *                   notaAcustica:
 *                     type: integer
 *                     example: 3
 *       500:
 *         description: Erro ao buscar avaliações
 */

/**
 * @swagger
 * /avaliacaoSalaAula/atualizar/{matricula}/{sala}/{semestre}:
 *   put:
 *     summary: Atualizar uma avaliação de sala existente
 *     tags:
 *       - Avaliação de Sala
 *     parameters:
 *       - name: matricula
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 202312345
 *       - name: sala
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 101
 *       - name: semestre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "2024.1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario:
 *                 type: string
 *                 maxLength: 250
 *                 example: "Sala melhorou bastante após reforma."
 *               notaAcessibilidade:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               notaInfraestrutura:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               notaLimpeza:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *               notaConforto:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 2
 *               notaIluminacao:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *               notaAcustica:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 3
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /avaliacaoSalaAula/excluir/{matricula}/{sala}/{semestre}:
 *   delete:
 *     summary: Excluir uma avaliação de sala
 *     tags:
 *       - Avaliação de Sala
 *     parameters:
 *       - name: matricula
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 202312345
 *       - name: sala
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 101
 *       - name: semestre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "2024.1"
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
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
