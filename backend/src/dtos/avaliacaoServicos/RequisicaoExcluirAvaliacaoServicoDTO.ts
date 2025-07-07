import { IsInt, IsDefined, Min } from "class-validator";

export class RequisicaoExcluirAvaliacaoServicoDTO {
  @IsDefined({ message: "Matrícula do aluno é obrigatória para exclusão." })
  @IsInt({ message: "Matrícula do aluno deve ser um número inteiro." })
  @Min(1, { message: "Matrícula do aluno deve ser um número positivo." })
  matriculaAluno!: number;

  @IsDefined({ message: "Código do tipo de serviço é obrigatório para exclusão." })
  @IsInt({ message: "Código do tipo de serviço deve ser um número inteiro." })
  @Min(1, { message: "Código do tipo de serviço deve ser um número positivo." })
  codTipoServico!: number;
}