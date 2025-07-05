import { Request, Response } from "express";
import TipoServicoService from "../service/TipoServicoService";

class TipoServicoController {
  static async listarTodos(req: Request, res: Response) {
    try {
      const tipos = await TipoServicoService.listarTodos();
      res.status(200).json(tipos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar tipos de serviço." });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const tipo = await TipoServicoService.buscarPorId(id);
      if (tipo) {
        res.status(200).json(tipo);
      } else {
        res.status(404).json({ message: "Tipo de serviço não encontrado." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tipo de serviço." });
    }
  }

  static async buscarPorNome(req: Request, res: Response) {
    try {
      const nome = req.query.nome as string;
      if (!nome) {
        return res.status(400).json({ message: "Nome do tipo de serviço é obrigatório." });
      }
      const tipo = await TipoServicoService.buscarPorNome(nome);
      if (tipo) {
        res.status(200).json(tipo);
      } else {
        res.status(404).json({ message: "Tipo de serviço não encontrado." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tipo de serviço por nome." });
    }
  }
}

export default TipoServicoController;