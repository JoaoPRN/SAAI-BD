import {
  IsInt,
  IsString,
  IsOptional,
  IsDateString,
  IsDefined,
  Min,
  Max,
} from "class-validator";

export class RequisicaoCriarAvaliacaoServicoDTO {
  @IsDefined({ message: "Matrícula do aluno é obrigatória." })
  @IsInt({ message: "Matrícula deve ser um número inteiro." })
  matriculaAluno!: number;

  @IsDefined({ message: "Código do tipo de serviço é obrigatório." })
  @IsInt({ message: "Código do tipo de serviço deve ser um número inteiro." })
  codTipoServico!: number;

  @IsDefined({ message: "Data é obrigatória." })
  @IsDateString({}, { message: "Data deve estar no formato ISO (AAAA-MM-DD)." })
  data!: string;

  @IsOptional()
  @IsString({ message: "Texto deve ser uma string." })
  texto?: string;

  @IsDefined({ message: "Nota é obrigatória." })
  @IsInt({ message: "Nota deve ser um número inteiro." })
  @Min(1, { message: "Nota mínima é 1." })
  @Max(5, { message: "Nota máxima é 5." })
  nota!: number;
}
