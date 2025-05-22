import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Calculate() {
    const navigate = useNavigate();
    const buttonStyle = 
    "bg-white text-gray-800 font-semibold py-4 px-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl transition-all hover:border-red-200 border";

    return(
        <div>
            <Header/>
            <h2 className="text-center text-2xl">
                Calculate
            </h2>
            <p className="text-center">
                Use our interactive tools to perform key linear algebra calculations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <button onClick={() => navigate("/Calculate/Norm")}
                    className={buttonStyle}
                >
                    Norm
                </button>
                <button onClick={() => navigate("/Calculate/DotProd")}
                    className={buttonStyle}
                >
                    Dot Product
                </button>
                <button onClick={() => navigate("/Calculate/MatMult")}
                    className={buttonStyle}
                >
                    Matrix Multiplication
                </button>
                <button className={buttonStyle}>
                    Hello
                </button>
            </div>
        </div>
    )
}

export default Calculate;