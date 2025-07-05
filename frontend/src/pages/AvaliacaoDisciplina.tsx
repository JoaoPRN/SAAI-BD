import React, { useState } from "react";
import "../styles/AvaliacaoDisciplina.css";
import { useLocation } from "react-router-dom";

type Avaliacao = {
  conteudo: number;
  criterios: number;
  organizacao: number;
  didatica: number;
  cumprimento: number;
  comentario: string;
};

const AvaliacaoDisciplina = () => {
  const location = useLocation();
  const { dados, codigoMatricula } = location.state || {};
  const [avaliacao, setAvaliacao] = useState<Avaliacao>({
    conteudo: 0,
    criterios: 0,
    organizacao: 0,
    didatica: 0,
    cumprimento: 0,
    comentario: "",
  });

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
      numeroMatriculaAluno: parseInt(codigoMatricula),
      codigoTurma: parseInt(dados.COD_ID_TURMA),
      dataAvaliacao: dataISO.toString(),
      textoComentario: avaliacao.comentario,
      notaConteudoDisciplina: avaliacao.conteudo,
      notaOrganizacaoDisciplina: avaliacao.organizacao,
      notaDidaticaProfessor: avaliacao.didatica,
      notaCriterioAvaliacao: avaliacao.criterios,
      notaCumprimentoEmenta: avaliacao.cumprimento,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/avaliacao-turmas/avaliar-turma",
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
          <h3>Avaliação da Disciplina</h3>

          <StarRating label="Conteúdo Programático" campo="conteudo" />
          <StarRating label="Critérios Avaliativos" campo="criterios" />
          <StarRating label="Organização" campo="organizacao" />
          <StarRating label="Didática Professor" campo="didatica" />
          <StarRating label="Cumprimento da Ementa" campo="cumprimento" />

          <label>Comentários sobre a disciplina</label>
          <textarea
            placeholder="Compartilhe sua experiência com a disciplina..."
            value={avaliacao.comentario}
            onChange={(e) => handleChangeTexto("comentario", e.target.value)}
            rows={3}
            maxLength={240}
          />
          <button onClick={handleSubmit}>Enviar Avaliação</button>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoDisciplina;
