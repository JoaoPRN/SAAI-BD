import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import AlunosListarPage from './pages/AlunoListarPage';  // Só teste
import './App.css';  

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Página Inicial!</h1>
      <p>Texto num parágrafo</p>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 