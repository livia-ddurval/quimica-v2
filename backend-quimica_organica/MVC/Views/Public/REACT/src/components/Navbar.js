import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Para adicionar estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <form className="search-form">
        <input type="text" placeholder="Pesquisar..." />
        <button type="submit">Pesquisar</button>
      </form>
      <ul className="nav-links">
        <li><Link to="/">Introdução</Link></li>
        <li><Link to="/classificacao-carbono">Classificação de Carbono</Link></li>
        <li><Link to="/cadeias-carbonicas">Cadeias Carbônicas</Link></li>
        <li><Link to="/nomenclatura">Nomenclatura</Link></li>
        <li><Link to="/formula-molecular">Fórmula Molecular</Link></li>
        <li><Link to="/formula-estrutural">Fórmula Estrutural</Link></li>
        <li><Link to="/funcoes-organicas">Funções Orgânicas</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
      
    </nav>
  );
}

export default Navbar;
