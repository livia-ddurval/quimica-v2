import { useState } from 'react';

import React from 'react';

const HomePage = () => {
  return (
    <div className="home-container">
      <div>
        <h1>Bem-vindo à Química Orgânica</h1>
        <p>
          A química orgânica é o ramo da química que estuda os compostos do carbono. Esses compostos
          incluem não apenas hidrocarbonetos (compostos formados apenas por carbono e hidrogênio), mas
          também compostos que contêm outros elementos, como oxigênio, nitrogênio, enxofre, fósforo,
          halogênios e outros.
        </p>
        <h2>O que é Química Orgânica?</h2>
        <p>
          A química orgânica é fundamental para a vida, pois todos os seres vivos são formados por
          compostos orgânicos. Esta disciplina abrange uma vasta gama de substâncias, incluindo as que
          são encontradas na natureza e as que são sintetizadas em laboratório. O estudo da química
          orgânica inclui a investigação da estrutura, propriedades e reações desses compostos.
        </p>
        <h2>Por que a Química Orgânica é Importante?</h2>
        <p>
          A química orgânica é essencial para diversas indústrias e áreas de pesquisa, incluindo:
        </p>
        <ul>
          <li>
            <strong>Medicamentos:</strong> A maioria dos medicamentos é composta por moléculas orgânicas. O
            desenvolvimento de novos medicamentos depende da química orgânica para criar e modificar
            compostos que possam tratar doenças.
          </li>
          <li>
            <strong>Agricultura:</strong> Pesticidas, herbicidas e fertilizantes são desenvolvidos através da
            química orgânica para melhorar a produção agrícola.
          </li>
          <li>
            <strong>Plásticos e Polímeros:</strong> Muitos materiais sintéticos, como plásticos, são feitos de
            compostos orgânicos.
          </li>
          <li>
            <strong>Alimentos:</strong> Os aditivos alimentares, conservantes e até os próprios alimentos são
            estudados pela química orgânica para melhorar a qualidade e a segurança alimentar.
          </li>
        </ul>
      </div>
    
    </div>
  );
}

export default HomePage;


