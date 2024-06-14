import React, { useState } from 'react';

const functionalGroups = [
  {
    name: 'Álcoois',
    description: 'Álcoois são compostos orgânicos que possuem um ou mais grupos hidroxila (-OH) ligados a um átomo de carbono saturado.',
    examples: 'Etanol, Metanol'
  },
  {
    name: 'Aldeídos',
    description: 'Aldeídos são compostos orgânicos que possuem o grupo funcional formil (-CHO) ligado a um átomo de carbono.',
    examples: 'Formaldeído, Acetaldeído'
  },
  {
    name: 'Ácidos Carboxílicos',
    description: 'Ácidos Carboxílicos são compostos orgânicos que possuem o grupo funcional carboxila (-COOH).',
    examples: 'Ácido Acético, Ácido Fórmico'
  },
  {
    name: 'Cetonas',
    description: 'Cetonas são compostos orgânicos que possuem um grupo carbonila (C=O) ligado a dois átomos de carbono.',
    examples: 'Acetona, Butanona'
  },
  {
    name: 'Ésteres',
    description: 'Ésteres são compostos orgânicos derivados de ácidos carboxílicos onde o hidrogênio do grupo carboxila é substituído por um grupo alquila.',
    examples: 'Acetato de etila, Formiato de metila'
  },
  {
    name: 'Aminas',
    description: 'Aminas são compostos orgânicos que possuem um grupo amino (-NH2, -NHR, -NR2).',
    examples: 'Metilamina, Etilamina'
  }
];

const FunctionalGroupsPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="functional-groups-container">
      <h1>Funções Orgânicas</h1>
      <p>Explore diferentes grupos funcionais em compostos orgânicos.</p>
      <div className="functional-groups-cards">
        {functionalGroups.map((group, index) => (
          <div key={index} className="functional-group-card" onClick={() => handleClick(group)}>
            <div className="functional-group-card-title">{group.name}</div>
          </div>
        ))}
      </div>
      {selectedGroup && (
        <div className="functional-group-details">
          <h2>{selectedGroup.name}</h2>
          <p>{selectedGroup.description}</p>
          <p><strong>Exemplos:</strong> {selectedGroup.examples}</p>
        </div>
      )}
    </div>
  );
};

export default FunctionalGroupsPage;
