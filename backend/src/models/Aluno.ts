class Aluno {
  matricula: number;
  nome: string;
  curso: string;
  dataIngresso: Date;
  dataNascimento: Date;

  constructor(
    matricula: number,
    nome: string,
    curso: string,
    dataIngresso: Date,
    dataNascimento: Date
  ) {
    this.matricula = matricula;
    this.nome = nome;
    this.curso = curso;
    this.dataIngresso = dataIngresso;
    this.dataNascimento = dataNascimento;
  }
}

export default Aluno;
