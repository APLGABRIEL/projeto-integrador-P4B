import React, { useState } from 'react';
import { Perguntas } from '../../data/perguntas';
import './styles.css';

export default function Quiz() {
  const questions = Perguntas ?? [];
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [showPontuacao, setShowPontuacao] = useState(false);
  const [pontos, setPontos] = useState(0);
  const respostasCorretas = ['A', 'D', 'B']; // Respostas corretas para cada pergunta

  function proximaPergunta(correta) {
    const nextQuestion = perguntaAtual + 1;

    if (correta) {
      setPontos(pontos + 1);
    }

    if (nextQuestion < questions.length) {
      setPerguntaAtual(nextQuestion);
    } else {
      setShowPontuacao(true);
    }
  }

  return (
    <>
      <h1 id="tituloprincipal">React Quiz</h1>
      <div className='container'>
        {showPontuacao ? (
          <div className='pontuacao'>
            <span>Sua pontuação é {pontos} de {questions.length}</span>
            <button id="reiniciar-button" onClick={() => {
              setPerguntaAtual(0);
              setPontos(0);
              setShowPontuacao(false);
            }}>Reiniciar</button>
          </div>
        ) : (
          <>
            <div className='infoPerguntas'>
              <div className="contagemPerguntas">
                <span>Pergunta {perguntaAtual + 1}/{questions.length}</span>
              </div>
              <div className="pergunta">{questions[perguntaAtual].pergunta}</div>
            </div>
            <div className="resposta">
              {questions[perguntaAtual].opcoesResposta.map((opcoesResposta) =>
                <div className="grupoResposta" key={opcoesResposta.alternativa}>
                  <span>{opcoesResposta.alternativa}</span>
                  <button onClick={() => proximaPergunta(opcoesResposta.correta)}>{opcoesResposta.resposta}</button>
                </div>)}
            </div>
          </>
        )}
      </div>

      {showPontuacao && (
        <div className="respostas-corretas">
          <br></br><h2>Respostas Corretas:</h2>
          <ul>
            {questions.map((pergunta, index) => (
              <li key={index}>
                {pergunta.pergunta} - Resposta correta: {respostasCorretas[index]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
