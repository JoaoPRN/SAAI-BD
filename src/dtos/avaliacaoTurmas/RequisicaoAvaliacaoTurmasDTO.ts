import {
  IsDateString,
  IsInt,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

export class RequisicaoAvaliacaoTurmasDTO {
  @IsInt()
  numeroMatriculaAluno!: number;

  @IsInt()
  codigoTurma!: number;

  @IsDateString(
    {},
    { message: "Data de ingresso deve ser uma data válida (ISO)." }
  )
  dataAvaliacao!: string;

  @IsString()
  @MaxLength(250)
  textoComentario!: string;

  @IsInt()
  @Min(0)
  @Max(5)
  notaConteudoDisciplina!: number;

  @IsInt()
  @Min(0)
  @Max(5)
  notaOrganizacaoDisciplina!: number;

  @IsInt()
  @Min(0)
  @Max(5)
  notaDidaticaProfessor!: number;

  @IsInt()
  @Min(0)
  @Max(5)
  notaCriterioAvaliacao!: number;

  @IsInt()
  @Min(0)
  @Max(5)
  notaCumprimentoEmenta!: number;
}
