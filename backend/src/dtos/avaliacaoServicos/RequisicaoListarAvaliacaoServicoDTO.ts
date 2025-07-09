import { IsInt, IsOptional, Min, IsDefined } from "class-validator";

export class RequisicaoListarAvaliacaoServicoDTO {
  @IsDefined({ message: "Matrícula do aluno é obrigatória para consulta." })
  @IsInt({ message: "Matrícula do aluno deve ser um número inteiro." })
  @Min(1, { message: "Matrícula do aluno deve ser um número positivo." })
  matriculaAluno!: number;

  @IsOptional() // codTipoServico é opcional
  @IsInt({ message: "Código do tipo de serviço deve ser um número inteiro." })
  @Min(1, { message: "Código do tipo de serviço deve ser um número positivo." })
  codTipoServico?: number; // Propriedade opcional
}
