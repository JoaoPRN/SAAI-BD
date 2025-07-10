import React, { useEffect, useState } from "react";
import "../styles/AvaliacaoDisciplina.css";
import { useLocation } from "react-router-dom";

type Avaliacao = {
    comentario: string;
    nota: number;
};

const AvaliacaoServico = () => {
    const location = useLocation();
    const { dados, codigoServico } = location.state || {};
    const [avaliacao, setAvaliacao] = useState<Avaliacao>({
        comentario: "",
        nota: 0,
    });

    useEffect(() => {
        consultarServico(dados.COD_ID_SERVICO).then((dados) => {
            if (dados) {
                const dadosAvaliacao = {
                    comentario: dados[0].TXT_COMENTARIO,
                    nota: dados[0].NUM_NOTA_SERVICO,
                };
                setAvaliacao(dadosAvaliacao);
            }
        });
    }, []);

    async function consultarServico() {
        try {
            const response = await fetch(
                `http://localhost:3000/avaliacao-servicos/listar`,
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
            codigoServico: parseInt(dados.COD_ID_Servico),
            dataAvaliacao: dataISO.toString(),
            textoComentario: avaliacao.comentario,
            notaServico: avaliacao.nota,
        };

        try {
            const response = await fetch(
                "http://localhost:3000/avaliacao-servicos/avaliar",
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
              codigoServico: parseInt(dados.COD_ID_Servico),
            dataAvaliacao: dataISO.toString(),
            textoComentario: avaliacao.comentario,
            notaServico: avaliacao.nota,
        };

        try {
            const response = await fetch(
                "http://localhost:3000/avaliacao-servicos/atualizar",
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
            <h2>Avaliação de Serviço</h2>
            <p className="subtitle">
                {dados.NOM_TIPO_SERVICO}
            </p>

            <div className="avaliacao-sections">
                <div className="avaliacao-box">
                    <h3>Avaliação da Servico</h3>

                    <StarRating label="Nota" campo="nota" />

                    <label>Comentários Servico</label>
                    <textarea
                        placeholder="Compartilhe sua experiência com o servico escolhido..."
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

export default AvaliacaoServico;
