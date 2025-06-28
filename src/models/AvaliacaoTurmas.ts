export default class AvaliacaoTurmas {
  numeroMatriculaAluno: number;
  codigoTurma: number;
  dataAvaliacao: Date;
  textoComentario: string;
  notaConteudoDisciplina: number;
  notaOrganizacaoDisciplina: number;
  notaDidaticaProfessor: number;
  notaCriterioAvaliacao: number;
  notaCumprimentoEmenta: number;

  constructor(
    numeroMatriculaAluno: number,
    codigoTurma: number,
    dataAvaliacao: Date,
    textoComentario: string,
    notaConteudoDisciplina: number,
    notaOrganizacaoDisciplina: number,
    notaDidaticaProfessor: number,
    notaCriterioAvaliacao: number,
    notaCumprimentoEmenta: number
  ) {
    this.numeroMatriculaAluno = numeroMatriculaAluno;
    this.codigoTurma = codigoTurma;
    this.dataAvaliacao = dataAvaliacao;
    this.textoComentario = textoComentario;
    this.notaConteudoDisciplina = notaConteudoDisciplina;
    this.notaOrganizacaoDisciplina = notaOrganizacaoDisciplina;
    this.notaDidaticaProfessor = notaDidaticaProfessor;
    this.notaCriterioAvaliacao = notaCriterioAvaliacao;
    this.notaCumprimentoEmenta = notaCumprimentoEmenta;
  }
}
