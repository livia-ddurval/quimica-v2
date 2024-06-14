import React from 'react';

const CarbonClassificationPage = () => {
  return (
    <div className="container">
      <h1>Classificação de Carbono</h1>
      <p>Aprenda sobre a classificação dos átomos de carbono em compostos orgânicos.</p>
      <div className="tudo">
        <div className="card">
          <h5 className="card-title">Carbono Primário</h5>
          <p className="card-text">
            Os carbonos primários se localizam nas extremidades das cadeias, fazendo ligação com um átomo qualquer.
          </p>
        </div>
        <div className="card">
          <h5 className="card-title">Carbono Secundário</h5>
          <p className="card-text">
            Esses fazem ligações duplas com outros dois átomos de carbono pertencentes a mesma cadeia.
          </p>
        </div>
        <div className="card">
          <h5 className="card-title">Carbono Terciário</h5>
          <p className="card-text">
            Na cadeia, esses fazem ligações com outros três átomos também de carbono.
          </p>
        </div>
        <div className="card">
          <h5 className="card-title">Carbono Quaternário</h5>
          <p className="card-text">
            Seguindo a mesma ordem de classificação, esses fazem ligações com outros átomos somente de carbono na mesma cadeia.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarbonClassificationPage;
