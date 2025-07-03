import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/avaliacao" element={<Avaliacao />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
