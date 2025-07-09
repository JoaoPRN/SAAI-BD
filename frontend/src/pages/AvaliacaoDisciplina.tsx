import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    consultarDisciplina(codigoMatricula, dados.COD_ID_TURMA).then((dados) => {
      if (dados) {
        const dadosAvaliacao = {
          conteudo: dados[0].NUM_NOTA_CONTEUDO_DISCIPLINA,
          criterios: dados[0].NUM_NOTA_CRITERIO_AVALIACAO,
          organizacao: dados[0].NUM_NOTA_ORGANIZACAO_DISCIPLINA,
          didatica: dados[0].NUM_NOTA_DIDATICA_PROFESSOR,
          cumprimento: dados[0].NUM_NOTA_CUMPRIMENTO_EMENTA,
          comentario: dados[0].TXT_COMENTARIO,
        };

        setAvaliacao(dadosAvaliacao);
      }
    });
  }, []);

  async function consultarDisciplina(
    matriculaAluno: number,
    codigoTurma: number
  ) {
    try {
      const response = await fetch(
        `http://localhost:3000/avaliacao-turmas/consultar/${matriculaAluno}/${codigoTurma}`,
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
        "http://localhost:3000/avaliacao-turmas/avaliar",
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
        "http://localhost:3000/avaliacao-turmas/atualizar",
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

export default AvaliacaoDisciplina;
