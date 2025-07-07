import { Request, Response } from "express";
import { RequisicaoCriarAlunoDTO } from "../dtos/alunoDTO/RequisicaoCriarAlunoDTO";
import { RequisicaoExcluirAlunoDTO } from "../dtos/alunoDTO/RequisicaoExcluirAlunoDTO";
import AlunoService from "../service/AlunoService";

class AlunoController {
  /*
  static async criarAluno(
    req: Request<{}, {}, RequisicaoCriarAlunoDTO>,
    res: Response
  ) {
    try {
      await AlunoService.criarAluno(req.body);

      res.status(201).json({ message: "Aluno criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      res.status(500).json({ message: "Erro interno ao criar aluno" });
    }
  }*/

  static async criarAluno(req: Request, res: Response) {
    try {
      const foto = req.file?.buffer ?? null;

      const alunoData: RequisicaoCriarAlunoDTO = {
        ...req.body,
        foto,
      };

      await AlunoService.criarAluno(alunoData);

      res.status(201).json({ message: "Aluno criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar aluno:", error);
      res.status(500).json({ message: "Erro interno ao criar aluno" });
    }
  }

  static async listarAlunos(req: Request, res: Response) {
    try {
      const listaAlunos = await AlunoService.listarAlunos();

      const alunosComFoto = listaAlunos.map((aluno: any) => {
        return {
          ...aluno,
          FOTO_ALUNO: aluno.FOTO_ALUNO
            ? aluno.FOTO_ALUNO.toString("base64")
            : null,
        };
      });

      res.status(200).json({ listaAlunos: alunosComFoto });
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      res.status(500).json({ message: "Erro interno ao listar alunos." });
    }
  }


  static async excluirAluno(
    req: Request<{}, {}, RequisicaoExcluirAlunoDTO>,
    res: Response
  ) {
    try {
      const matricula = parseInt(req.body.matricula, 10);

      const deletadoComSucesso = await AlunoService.excluirAluno(matricula);

      if (deletadoComSucesso) {
        res.status(201).json({
          message: "Aluno excluído com sucesso!",
        });
      } else {
        res.status(404).json({ message: "Aluno não encontrado." });
      }
    } catch (error: any) {
      console.error("Erro ao excluir aluno:", error);
      res.status(500).json({
        message: "Erro interno ao excluir aluno.",
        erro: error.sqlMessage,
      });
    }
  }
}

export default AlunoController;
