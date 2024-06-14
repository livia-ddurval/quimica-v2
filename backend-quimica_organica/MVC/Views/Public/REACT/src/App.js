import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import NomenclaturePage from './pages/NomenclaturePage';
import MolecularFormulaPage from './pages/MolecularFormulaPage';
import StructuralFormulaPage from './pages/StructuralFormulaPage';
import FunctionalGroupsPage from './pages/FunctionalGroupsPage';
import CarbonClassificationPage from './pages/CarbonClassificationPage';
import CarbonChainsPage from './pages/CarbonChainsPage';
import LoginPage from './pages/LoginPage';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/nomenclatura" element={<NomenclaturePage />} />
          <Route path="/formula-molecular" element={<MolecularFormulaPage />} />
          <Route path="/formula-estrutural" element={<StructuralFormulaPage />} />
          <Route path="/funcoes-organicas" element={<FunctionalGroupsPage />} />
          <Route path="/classificacao-carbono" element={<CarbonClassificationPage />} />
          <Route path="/cadeias-carbonicas" element={<CarbonChainsPage />} />
          <Route path="/Login" element={<LoginPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
