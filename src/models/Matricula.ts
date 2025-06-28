class Matricula {
  nomeProfessor: string;
  nomeDisciplina: string;
  cargaHoraria: number;
  numeroSala: number;
  capacidadeSala: number;
  numeroSemestre: string;

  constructor(
    nomeProfessor: string,
    nomeDisciplina: string,
    cargaHoraria: number,
    numeroSala: number,
    capacidadeSala: number,
    numeroSemestre: string
  ) {
    this.nomeProfessor = nomeProfessor;
    this.nomeDisciplina = nomeDisciplina;
    this.cargaHoraria = cargaHoraria;
    this.numeroSala = numeroSala;
    this.capacidadeSala = capacidadeSala;
    this.numeroSemestre = numeroSemestre;
  }
}

export default Matricula;
