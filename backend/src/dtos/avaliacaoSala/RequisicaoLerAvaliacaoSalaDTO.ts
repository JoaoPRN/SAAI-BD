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
  @IsDefined({ message: "Matrícula é obrigatória." })
  @IsInt({ message: "Matrícula deve ser um número inteiro." })
  matricula!: number;

  @IsDefined({ message: "Sala é obrigatória." })
  @IsInt({ message: "Sala deve ser um número inteiro." })
  sala!: number;

  @IsDefined({ message: "Semestre é obrigatório." })
  @IsString({ message: "Semestre deve ser uma string." })
  @Length(1, 6, { message: "Semestre deve ter no máximo 6 caracteres." })
  semestre!: string;

  @IsDefined({ message: "Data de avaliação é obrigatória." })
  @IsDateString({}, { message: "Data de avaliação deve ser uma data válida (ISO)." })
  dataAvaliacao!: string;

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
