import { Request, Response } from "express";
import { RequisicaoAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAvaliacaoServicoDTO";
import AvaliacaoServicoService from "../service/AvaliacaoServicoService";

class AvaliacaoServicoController {
    static async criarAvaliacaoServico(
        req: Request<{}, {}, RequisicaoAvaliacaoServicoDTO>,
        res: Response
    ) {
        try {
        await AvaliacaoServicoService.criarAvaliacaoServico(req.body);
        res.status(201).json({ message: "Avaliação de serviço criada com sucesso!" });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar avaliação de serviço" });
        }
    }

    static async consultaAvaliacaoServico(
        req: Request,
        res: Response
    ) {
        try {
        const avaliacaoServico = await AvaliacaoServicoService.consultaAvaliacaoServico(req.body);
        res.status(200).json({ avaliacaoServico });
        } catch (error) {
        res.status(500).json({ message: "Avaliação de serviço não encontrada!" });
        }
    }

    static async atualizarAvaliacaoServico(
        req: Request<{}, {}, RequisicaoAvaliacaoServicoDTO>,
        res: Response
    ) {
        try {
        const sucesso = await AvaliacaoServicoService.atualizarAvaliacaoServico(req.body);
        if (sucesso) {
            res.status(200).json({ message: "Avaliação de serviço atualizada com sucesso!" });
        } else {
            res.status(404).json({ message: "Avaliação de serviço não encontrada." });
        }
        } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar avaliação de serviço" });
        }
    }

    static async excluirAvaliacaoServico(
        req: Request,
        res: Response
    ) {
        try {
        const sucesso = await AvaliacaoServicoService.excluirAvaliacaoServico(req.body);
        if (sucesso) {
            res.status(200).json({ message: "Avaliação de serviço excluída com sucesso!" });
        } else {
            res.status(404).json({ message: "Avaliação de serviço não encontrada." });
        }
        } catch (error) {
        res.status(500).json({ message: "Erro ao excluir avaliação de serviço" });
        }
    }
}

export default AvaliacaoServicoController;
