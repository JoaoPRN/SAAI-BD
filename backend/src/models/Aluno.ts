class Aluno {
  matricula: number;
  nome: string;
  curso: string;
  dataIngresso: Date;
  dataNascimento: Date;
  fotoAluno?: Blob | null;

  constructor(
    matricula: number,
    nome: string,
    curso: string,
    dataIngresso: Date,
    dataNascimento: Date,
    fotoAluno?: Blob | null
  ) {
    this.matricula = matricula;
    this.nome = nome;
    this.curso = curso;
    this.dataIngresso = dataIngresso;
    this.dataNascimento = dataNascimento;
    this.fotoAluno = fotoAluno ?? null;
  }
}

export default Aluno;
