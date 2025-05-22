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
                    justify-start">
      <Header />
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-800">
          LearnLinear
        </h1>
        <p className="text-lg mt-2 text-gray-600">
         Learn Linear Algebra through clear, step-by-step solutions—perfect for students.
        </p>
      </div>

      <div className="w-full max-w-2xl flex mt-6 mb-2 justify-center shadow">
        <img 
          src={gif} 
          alt="Animation"
          className="rounded-lg shadow-md w-full"
        />
      </div>

      <p className="text-sm italic text-gray-500">
        *Animation credit goes to 3Blue1Brown*
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mt-8 mb-5">
        <div className="shadow p-4 rounded-lg hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Learn 📘
          </h3>
          <p>
            Interactive lessons that break down linear algebra concepts.
          </p>
        </div>

        <div className="shadow p-4 rounded-lg hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Practice 🧠
          </h3>
          <p>
            Test your understanding with guided practice problems and explanations.
          </p>
        </div>

        <div className="shadow p-4 rounded-lg hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-center">
            Calculate 🧮
          </h3>
          <p>
            Step-by-step tools for dot products, matrix operations, and more.
          </p>
        </div>
      </div>

      <p className="mb-4 mt-8">
        Built for students, by a student.
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


