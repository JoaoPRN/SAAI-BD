import {
  IsInt, IsString, IsOptional, IsDateString, IsDefined, Min, Max,
} from "class-validator";

export class RequisicaoAtualizarAvaliacaoServicoDTO {
  @IsDefined({ message: "Matrícula do aluno é obrigatória." })
  @IsInt()
  matriculaAluno!: number;

  @IsDefined({ message: "Código do tipo de serviço é obrigatório." })
  @IsInt()
  codTipoServico!: number;

  @IsDefined({ message: "Data é obrigatória." })
  @IsDateString()
  data!: string;

  @IsOptional()
  @IsString()
  texto?: string;

  @IsDefined({ message: "Nota é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  nota!: number;
}