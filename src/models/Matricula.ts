class Matricula {
  matriculaAluno: number;
  codigoTurma: number;
  indicadorAvaliacao: Boolean;

  constructor(
    matriculaAluno: number,
    codigoTurma: number,
    indicadorAvaliacao: Boolean
  ) {
    this.matriculaAluno = matriculaAluno;
    this.codigoTurma = codigoTurma;
    this.indicadorAvaliacao = indicadorAvaliacao;
  }
}

export default Matricula;
