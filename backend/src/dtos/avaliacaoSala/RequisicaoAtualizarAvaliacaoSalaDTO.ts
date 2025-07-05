import {
  IsInt,
  Min,
  Max,
  IsString,
  IsDateString,
  IsDefined,
  Length,
  IsOptional,
} from "class-validator";

export class RequisicaoAtualizarAvaliacaoSalaDTO {

  @IsOptional()
  @IsString({ message: "Comentário deve ser uma string." })
  @Length(0, 250, { message: "Comentário deve ter no máximo 250 caracteres." })
  comentario?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaAcessibilidade!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaInfraestrutura!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaLimpeza!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaConforto!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaIluminacao!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  notaAcustica!: number;
}
