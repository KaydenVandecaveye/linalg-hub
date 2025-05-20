import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Calculate() {
    const navigate = useNavigate();

    return(
        <div>
            <Header/>
            <h2>Calculate</h2>

            <div className="button-container">
                <button onClick={() => navigate("/Calculate/Norm")}>Norm</button>
                <button onClick={() => navigate("/Calculate/DotProd")}>DotProduct</button>
                <button onClick={() => navigate("/Calculate/MatMult")}>MatrixMultiplication</button>
            </div>
        </div>
    )
}

export default Calculate;