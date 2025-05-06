import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios";
import './App.css';
import Norm from './pages/Norm';
import DotProd from './pages/DotProd';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>LinAlg Hub</h1>
      <button onClick={() => navigate("/Norm")}>Norm</button>
      <button onClick={() => navigate("/DotProd")}>DotProd</button>
    </div>
  )
}

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Norm" element={<Norm />} />
        <Route path="/DotProd" element={<DotProd />} />
      </Routes>
    </Router>
  );
}

export default App;
