import { IsInt, IsString, IsOptional, IsDateString, Min, Max } from "class-validator";

export class RequisicaoAvaliacaoServicoDTO {
    @IsInt()
    matriculaAluno!: number;

    @IsInt()
    codTipoServico!: number;

    @IsDateString()
    data!: string;

    @IsOptional()
    @IsString()
    texto?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    nota!: number;
}

export class RequisicaoListarAvaliacaoServicoDTO {
    @IsOptional()
    @IsInt()
    matriculaAluno?: number;

    @IsOptional()
    @IsInt()
    codTipoServico?: number;
}

export class RequisicaoExcluirAvaliacaoServicoDTO {
    @IsInt()
    matriculaAluno!: number;

    @IsInt()
    codTipoServico!: number;
}

export class RequisicaoAtualizarAvaliacaoServicoDTO {
    @IsInt()
    matriculaAluno!: number;

    @IsInt()
    codTipoServico!: number;

    @IsDateString()
    data!: string;

    @IsOptional()
    @IsString()
    texto?: string;

    @IsInt()
    @Min(1)
    @Max(5)
    nota!: number;
}