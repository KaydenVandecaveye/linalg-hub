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
                Use our interactive tools to perform key linear algebra calculations!
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
                <button onClick={() => navigate("/Calculate/Transpose")}
                    className={buttonStyle}
                >
                    Transpose
                </button>
                <button onClick={() => navigate("/Calculate/GaussElim")}
                    className={buttonStyle}
                >
                    Gaussian Elimination
                </button>
                <button onClick={() => navigate("/Calculate/Inverse")}
                    className={buttonStyle}
                >
                    Matrix Inverse
                </button>
                <button onClick={() => navigate("/Calculate/Rank")}
                    className={buttonStyle}
                >
                    Matrix Rank
                </button>
                <button onClick={() => navigate("/Calculate/GramSchmidt")}
                    className={buttonStyle}
                >
                    Gram-Schmidt Orthogonalization
                </button>
                <button onClick={() => navigate("/Calculate/Angle")}
                    className={buttonStyle}
                >
                    Angle Between Vectors
                </button>
                <button onClick={() => navigate("/Calculate/CrossProd")}
                    className={buttonStyle}
                >
                    Cross Product
                </button>
            </div>
        </div>
    )
}

export default Calculate;