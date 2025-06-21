import { IsDefined, Length, Matches } from "class-validator";

export class RequisicaoExcluirAlunoDTO {
  @IsDefined({ message: "Matrícula é obrigatória." })
  @Length(9, 9, { message: "Matrícula deve ter exatamente 9 caracteres." })
  @Matches(/^\d+$/, { message: "Matrícula deve conter apenas números." })
  matricula!: string;
}
