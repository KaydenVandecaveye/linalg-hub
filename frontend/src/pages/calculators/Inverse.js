import React, { useState, useEffect } from "react";
import MatrixInput from "../../components/MatrixInput";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Inverse() {
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
                Inverse Calculator
            </h1>
            <p className="text-center mb-8">
                Enter a matrix to calculate it's inverse!
            </p>
            <MatrixInput title={"Matrix"} matrix={matrix} setMatrix={setMatrix}/>

            <button onClick={handleSubmission}
                    className="submit-button"
            >
                Submit
            </button>
        </div>
    </div>
    )
}

export default Inverse;