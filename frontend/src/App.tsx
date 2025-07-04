import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Avaliacao from "./pages/Avaliacao";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
      </Routes>
    </Router>
  );
}

export default App;
