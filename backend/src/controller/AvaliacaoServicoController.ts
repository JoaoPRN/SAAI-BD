import { Request, Response } from "express";
import AvaliacaoServicoService from "../service/AvaliacaoServicoService";
import { RequisicaoCriarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoCriarAvaliacaoServicoDTO";
import { RequisicaoAtualizarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoAtualizarAvaliacaoServicoDTO";
import { RequisicaoExcluirAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoExcluirAvaliacaoServicoDTO";
import { RequisicaoListarAvaliacaoServicoDTO } from "../dtos/avaliacaoServicos/RequisicaoListarAvaliacaoServicoDTO";

class AvaliacaoServicoController {
    static async criarAvaliacaoServico(
        req: Request<{}, {}, RequisicaoCriarAvaliacaoServicoDTO>,
        res: Response
    ) {
        try {
            await AvaliacaoServicoService.criarAvaliacaoServico(req.body);
            res.status(201).json({ message: "Avaliação de serviço criada com sucesso!" });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Erro interno ao criar avaliação.", erro: error?.message });
        }
    }
    
    static async atualizarAvaliacaoServico(
        req: Request<{}, {}, RequisicaoAtualizarAvaliacaoServicoDTO>,
        res: Response
    ) {
        try {
        const sucesso = await AvaliacaoServicoService.atualizarAvaliacaoServico(req.body);

        if (sucesso) {
            res.status(201).json({ message: "Avaliação de serviço atualizada com sucesso!" });
        } else {
            res.status(404).json({ message: "Avaliação de serviço não encontrada." });
        }
        } catch (error: any) {
            res.status(500).json({ message: "Erro interno ao atualizar avaliação.", erro: error?.message });
        }
    }

    static async consultaAvaliacaoServico(
        req: Request<{}, {}, RequisicaoListarAvaliacaoServicoDTO>,
        res: Response
    ) {

        try {
            const resultado = await AvaliacaoServicoService.consultaAvaliacaoServico(req.body);
            res.status(201).json({ avaliacoes: resultado });
        } catch (error: any) {
            res.status(500).json({ message: "Erro interno ao consultar avaliação.", erro: error?.message });
        }
    }

    static async excluirAvaliacaoServico(
        req: Request<{}, {}, RequisicaoExcluirAvaliacaoServicoDTO>,
        res: Response
    ) {

        try {
            const sucesso = await AvaliacaoServicoService.excluirAvaliacaoServico(req.body);

            if (sucesso) {
                res.status(200).json({ message: "Avaliação de serviço excluída com sucesso!" });
            } else {
                res.status(404).json({ message: "Avaliação de serviço não encontrada." });
            }
        } catch (error: any) {
            console.error("Erro ao excluir avaliação de serviço:", error);
            res.status(500).json({ message: "Erro interno ao excluir avaliação.", erro: error?.message });
        }
    }
}

export default AvaliacaoServicoController;
