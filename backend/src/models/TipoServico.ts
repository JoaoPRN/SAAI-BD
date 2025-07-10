class TipoServico {
    idServico: number;
    nomeServico: string;

    constructor(
        idServico: number,
        nomeServico: string
    ) {
        this.idServico =  idServico,
        this.nomeServico = nomeServico
    }
}

export default TipoServico;