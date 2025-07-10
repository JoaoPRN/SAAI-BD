import React, { useEffect, useState } from "react";
import "../styles/AvaliacaoDisciplina.css";
import { useLocation } from "react-router-dom";

type Avaliacao = {
    comentario: string;
    assessibilidade: number;
    infraestrutura: number;
    limpeza: number;
    conforto: number;
    iluminação: number;
    acustica: number;
};

const AvaliacaoSala = () => {
    const location = useLocation();
    const { dados, codigoSala } = location.state || {};
    const [avaliacao, setAvaliacao] = useState<Avaliacao>({
        comentario: "",
        assessibilidade: 0,
        infraestrutura: 0,
        limpeza: 0,
        conforto: 0,
        iluminação: 0,
        acustica: 0,
    });

    useEffect(() => {
        consultarSala(dados.COD_ID_TURMA).then((dados) => {
            if (dados) {
                const dadosAvaliacao = {
                    comentario: dados[0].TXT_COMENTARIO,
                    assessibilidade: dados[0].NUM_NOTA_ASSESSIBILIDADE,
                    infraestrutura: dados[0].NUM_NOTA_INFRAESTRUTURA,
                    limpeza: dados[0].NUM_NOTA_LIMPEZA,
                    conforto: dados[0].NUM_NOTA_CONFORTE,
                    iluminação: dados[0].NUM_NOTA_ILUMINACAO,
                    acustica: dados[0].NUM_NOTA_ACUSTICA,
                };
                setAvaliacao(dadosAvaliacao);
            }
        });
    }, []);

    async function consultarSala(
        codigoSala: number
    ) {
        try {
            const response = await fetch(
                `http://localhost:3000/avaliacaoSalaAula/listar`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();
            console.log(data.avaliacao);
            return data.avaliacao;
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    const handleStarChange = (campo: keyof Avaliacao, valor: number) => {
        setAvaliacao((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleChangeTexto = (campo: keyof Avaliacao, valor: string) => {
        setAvaliacao((prev) => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async () => {
        const hoje = new Date();
        const dataISO = hoje.toISOString().split("T")[0];
        const requisicao = {
            codigoSala: parseInt(dados.COD_ID_SALA),
            dataAvaliacao: dataISO.toString(),
            textoComentario: avaliacao.comentario,
            notaAssessibilidade: avaliacao.assessibilidade,
            notaInfraestrutura: avaliacao.infraestrutura,
            notaLimpeza: avaliacao.limpeza,
            notaConforto: avaliacao.conforto,
            notaIluminacao: avaliacao.iluminação,
            notaAcustica: avaliacao.acustica,
        };

        try {
            const response = await fetch(
                "http://localhost:3000/avaliacaoSalaAula/avaliar",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requisicao),
                }
            );

            if (response.ok) {
                alert("Avaliação enviada com sucesso!");
            } else {
                console.log(response);
                alert("Erro ao enviar a avaliação.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor.");
        }
    };

    const handleUpdate = async () => {
        const hoje = new Date();
        const dataISO = hoje.toISOString().split("T")[0];
        const requisicao = {
              codigoSala: parseInt(dados.COD_ID_SALA),
            dataAvaliacao: dataISO.toString(),
            textoComentario: avaliacao.comentario,
            notaAssessibilidade: avaliacao.assessibilidade,
            notaInfraestrutura: avaliacao.infraestrutura,
            notaLimpeza: avaliacao.limpeza,
            notaConforto: avaliacao.conforto,
            notaIluminacao: avaliacao.iluminação,
            notaAcustica: avaliacao.acustica,
        };

        try {
            const response = await fetch(
                "http://localhost:3000/avaliacaoSalaAula/atualizar",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requisicao),
                }
            );

            if (response.ok) {
                alert("Avaliação atualizada com sucesso!");
            } else {
                console.log(response);
                alert("Erro ao atualizar a avaliação.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao conectar com o servidor.");
        }
    };

    const StarRating = ({
        label,
        campo,
    }: {
        label: string;
        campo: keyof Avaliacao;
    }) => {
        return (
            <div className="rating-group">
                <span>{label}</span>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={
                                star <= Number(avaliacao[campo]) ? "star filled" : "star"
                            }
                            onClick={() => handleStarChange(campo, star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="avaliacao-wrapper">
            <h2>Avaliação de Disciplina</h2>
            <p className="subtitle">
                {dados.NOM_DISCIPLINA} - Prof. Dr. {dados.NOM_PROFESSOR}
            </p>

            <div className="avaliacao-sections">
                <div className="avaliacao-box">
                    <h3>Avaliação da Sala</h3>

                    <StarRating label="Assessibilidade" campo="assessibilidade" />
                    <StarRating label="Infraestrutura" campo="infraestrutura" />
                    <StarRating label="Limpeza" campo="limpeza" />
                    <StarRating label="Conforto" campo="conforto" />
                    <StarRating label="Iluminação" campo="iluminação" />
                    <StarRating label="Acústica" campo="acustica" />

                    <label>Comentários sobre a sala</label>
                    <textarea
                        placeholder="Compartilhe sua experiência com a sala de aula..."
                        value={avaliacao.comentario}
                        onChange={(e) => handleChangeTexto("comentario", e.target.value)}
                        rows={3}
                        maxLength={240}
                    />
                    <div>
                        {dados.COD_IND_AVALIACAO == "0" ? (
                            <button onClick={handleSubmit}>Enviar Avaliação</button>
                        ) : (
                            <button onClick={handleUpdate}>Atualizar Avaliação</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvaliacaoSala;
