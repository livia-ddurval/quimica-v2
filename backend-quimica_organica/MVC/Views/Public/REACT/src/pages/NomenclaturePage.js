import React from 'react';
import acido_carboxilico from '../images/file.png';
import alcool from '../images/alcool.png';
import hidrocarboneto from '../images/hidrocarboneto.png';
import cetona from '../images/cetona.png';
import aldeido from '../images/aldeido.png';
const NomenclaturePage = () => {
  return (
    <div>
      <h1>Nomenclatura</h1>
      <p>A nomenclatura em química orgânica desempenha um papel fundamental na descrição e identificação de compostos orgânicos. Ao seguir os princípios e regras estabelecidos pela IUPAC, os químicos podem nomear compostos de forma sistemática e precisa, promovendo uma comunicação eficaz e facilitando o avanço do conhecimento científico.</p>

      <h2>Prefixo na Nomenclatura Orgânica</h2>
      <table className="nomenclature-table">
        <thead>
          <tr>
            <th>Número de Átomos de Carbono</th>
            <th>Prefixo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Met</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Et</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Prop</td>
          </tr>
          <tr>
            <td>4</td>
            <td>But</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Pent</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Hex</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Hept</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Oct</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Non</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Dec</td>
          </tr>
        </tbody>
      </table>

      <h2>Intermédio na Nomenclatura Orgânica</h2>
      <table className="nomenclature-table">
        <thead>
          <tr>
            <th>Tipo de Ligação</th>
            <th>Intermédio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Simples</td>
            <td>an</td>
          </tr>
          <tr>
            <td>Dupla</td>
            <td>en</td>
          </tr>
          <tr>
            <td>2 duplas</td>
            <td>dien</td>
          </tr>
          <tr>
            <td>Tripla</td>
            <td>in</td>
          </tr>
          <tr>
            <td>2 Triplas</td>
            <td>diin</td>
          </tr>
          <tr>
            <td>1 dupla e 1 tripla</td>
            <td>enin</td>
          </tr>
        </tbody>
      </table>

      <h2>Sufixo na Nomenclatura Orgânica</h2>
      <table className="nomenclature-table">
        <thead>
          <tr>
            <th>Função Orgânica</th>
            <th>Sufixo</th>
            <th>Grupo Funcional</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ácido Carboxílico</td>
            <td>oico</td>
            <td>
            <img src={acido_carboxilico} alt="Química Orgânica" className="funcao" />
            </td>
          </tr>
          <tr>
            <td>Álcool</td>
            <td>ol</td>
            <td>  <img src={alcool} alt="Química Orgânica" className="funcao" />
            </td>
          </tr>
          <tr>
            <td>Aldeído</td>
            <td>al</td>
            <td><img src={aldeido} alt="Química Orgânica" className="funcao" /></td>
          </tr>
          <tr>
            <td>Cetona</td>
            <td>ona</td>
            <td>   <img src={cetona} alt="Química Orgânica" className="funcao" /></td>
          </tr>
          <tr>
            <td>Hidrocarboneto</td>
            <td>o</td>
            <td>  <img src={hidrocarboneto} alt="Química Orgânica" className="funcao" /></td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NomenclaturePage;
