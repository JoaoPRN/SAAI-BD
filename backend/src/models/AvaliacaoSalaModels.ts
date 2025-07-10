class AvaliacaoSala {
  matricula: number; 
  sala: number; 
  semestre: string; 
  dataAvaliacao: Date; 
  comentario?: string; 

  notaAcessibilidade: number; 
  notaInfraestrutura: number; 
  notaLimpeza: number; 
  notaConforto: number; 
  notaIluminacao: number; 
  notaAcustica: number; 

  constructor(
    matricula: number,
    sala: number,
    semestre: string,
    dataAvaliacao: Date,
    notaAcessibilidade: number,
    notaInfraestrutura: number,
    notaLimpeza: number,
    notaConforto: number,
    notaIluminacao: number,
    notaAcustica: number,
    comentario?: string
  ) {
    this.matricula = matricula;
    this.sala = sala;
    this.semestre = semestre;
    this.dataAvaliacao = dataAvaliacao;
    this.notaAcessibilidade = notaAcessibilidade;
    this.notaInfraestrutura = notaInfraestrutura;
    this.notaLimpeza = notaLimpeza;
    this.notaConforto = notaConforto;
    this.notaIluminacao = notaIluminacao;
    this.notaAcustica = notaAcustica;
    this.comentario = comentario;
  }
}

export default AvaliacaoSala;
