class AvaliacaoServico {
    matriculaAluno: number; // fk
    codTipoServico: number; // fk
    data: Date;
    texto?: string;
    nota: number;

    constructor(matriculaAluno: number, 
        codTipoServico: number, 
        data: Date, 
        nota: number, 
        texto?: string
    ) {
        this.matriculaAluno = matriculaAluno;
        this.codTipoServico = codTipoServico;
        this.data = data;
        this.nota = nota;
        this.texto = texto;
    }
}
export default AvaliacaoServico;