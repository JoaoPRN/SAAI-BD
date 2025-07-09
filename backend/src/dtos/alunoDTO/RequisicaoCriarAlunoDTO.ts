import {
  IsInt, // nao ta testanod isso
  Min, // nao ta testanod isso
  IsString,
  IsDateString,
  IsDefined,
  Length,
  Matches,
  IsNotEmpty,
  Validate, // nao ta testando isso
  IsOptional
} from "class-validator";

export class RequisicaoCriarAlunoDTO {
  @IsDefined({ message: "Matrícula é obrigatória." })
  @Length(9, 9, { message: "Matrícula deve ter exatamente 9 caracteres." })
  @Matches(/^\d+$/, { message: "Matrícula deve conter apenas números." })
  matricula!: number;

  @IsDefined({ message: "Nome é obrigatório." })
  @IsString({ message: "Nome deve ser uma string." })
  @IsNotEmpty({ message: "Nome não pode ser vazio." })
  nome!: string;

  @IsDefined({ message: "Curso é obrigatório." })
  @IsString({ message: "Curso deve ser uma string." })
  @IsNotEmpty({ message: "Curso não pode ser vazio." })
  curso!: string;

  @IsDefined({ message: "Data de ingresso é obrigatória." })
  @IsDateString(
    {},
    { message: "Data de ingresso deve ser uma data válida (ISO)." }
  )
  dataIngresso!: string;

  @IsDefined({ message: "Data de nascimento é obrigatória." })
  @IsDateString(
    {},
    { message: "Data de nascimento deve ser uma data válida (ISO)." }
  )
  dataNascimento!: string;

  @Length(11, 11, { message: "Telefone deve ter exatamente 11 caracteres." })
  @Matches(/^\d+$/, { message: "Telefone deve conter apenas números." })
  telefone!: string;

  @IsOptional() //validacao ate 16mb
  foto?: Blob | null;
}
