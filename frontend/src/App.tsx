import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Avaliacao from "./pages/Avaliacao";
import AvaliacaoDisciplina from "./pages/AvaliacaoDisciplina";
import CriarAluno from "./pages/CriarAluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/avaliacaoDisciplina" element={<AvaliacaoDisciplina />} />
        <Route path="/aluno/criar-aluno" element={<CriarAluno/>}/>
      </Routes>
    </Router>
  );
}

export default App; 