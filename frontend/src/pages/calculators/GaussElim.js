import React, { useState, useEffect } from "react";
import MatrixInput from "../../components/MatrixInput";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function GaussElim() {
    const navigate = useNavigate();
    const [matrix, setMatrix] = useState([["", ""], ["", ""]]);
    const handleSubmission = () => {
        console.log("Handled");
    }

    return(
    <div>
        <Header/>
        <div className="p-6 flex-col items-center text-center">
            <button onClick={() => navigate(-1)}
                className="flex items-center"
            >
                <ArrowLeft/>
            </button>
            <h1 className="text-3xl font-bold text-center mb-2">
                Gaussian Elimination Calculator
            </h1>
            <p className="text-center mb-8">
                Enter a system of equations as a matrix to solve the system with steps!
            </p>
            <MatrixInput title={"System of Equations"} matrix={matrix} setMatrix={setMatrix} dimensions="System of Equations dimensions:"/>

            <button onClick={handleSubmission}
                    className="submit-button"
            >
                Submit
            </button>
        </div>
    </div>
    )
}

export default GaussElim;