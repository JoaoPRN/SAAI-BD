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

export class RequisicaoCriarAvaliacaoSalaDTO {

  @IsOptional()
  @IsString({ message: "Comentário deve ser uma string." })
  @Length(0, 250, { message: "Comentário deve ter no máximo 250 caracteres." })
  comentario?: string;

  @IsDefined({ message: "Nota de acessibilidade é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaAcessibilidade!: number;

  @IsDefined({ message: "Nota de infraestrutura é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaInfraestrutura!: number;

  @IsDefined({ message: "Nota de limpeza é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaLimpeza!: number;

  @IsDefined({ message: "Nota de conforto é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaConforto!: number;

  @IsDefined({ message: "Nota de iluminação é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaIluminacao!: number;

  @IsDefined({ message: "Nota de acústica é obrigatória." })
  @IsInt()
  @Min(1)
  @Max(5)
  notaAcustica!: number;
}
