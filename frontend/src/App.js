import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"
import axios from "axios";
import gif from './assets/vector_animation.gif';

// Components
import Header from "./components/Header";

// Pages
import Calculate from "./pages/Calculate";
import Learn from "./pages/Learn";
import Practice from "./pages/Practice";

// Calculators
import Norm from './pages/calculators/Norm';
import DotProd from './pages/calculators/DotProd';
import MatMult from "./pages/calculators/MatMult";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center
                    justify-start bg-gray-100 ">
      <Header />
      
      <h1 className="text-4xl font-bold mt-8 mb-4">
        LearnLinear
      </h1>

      <div className="w-full max-w-xl flex justify-center mb-2">
        <img 
          src={gif} 
          alt="Animation"
          className="rounded-lg shadow-md w-full"
        />
      </div>

      <p className="text-sm italic">
        *Animation credit goes to 3Blue1Brown*
      </p>

    </div>
  )
}

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Calculate" element={<Calculate/>}/>
        <Route path="/Learn" element={<Learn/>}/>
        <Route path="/Practice" element={<Practice/>}/>
        <Route path="/Calculate/Norm" element={<Norm />} />
        <Route path="/Calculate/DotProd" element={<DotProd />} />
        <Route path="/Calculate/MatMult" element={<MatMult />} />
      </Routes>
    </Router>
  );
}

export default App;


