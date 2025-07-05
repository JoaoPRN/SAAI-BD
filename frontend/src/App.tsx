import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Avaliacao from "./pages/Avaliacao";
import AvaliacaoDisciplina from "./pages/AvaliacaoDisciplina";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/avaliacaoDisciplina" element={<AvaliacaoDisciplina />} />
      </Routes>
    </Router>
  );
}

export default App;
