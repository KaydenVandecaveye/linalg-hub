import React, { useState, useEffect } from "react";
import MatrixInput from "../../components/MatrixInput";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { parseMatrix } from "../../utils/parseMatrix";
import GetMathSteps from "../../utils/GetMathSteps";

function Transpose() {
    const navigate = useNavigate();
    const [matrix, setMatrix] = useState([["", ""], ["", ""]]);
    const [response, setResponse] = useState(null);

    const handleSubmission = async () => {
        const response = await fetch('/api/transpose', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                matrix: parseMatrix(matrix),
            }),
        });
        const data = await response.json();
        setResponse(data);
    
        console.log("Steps", data.steps);
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
                Transpose Calculator
            </h1>
            <p className="text-center mb-8">
                Enter a matrix to calculate it's transpose!
            </p>
            <MatrixInput title={"Matrix"} matrix={matrix} setMatrix={setMatrix}/>

            <button onClick={handleSubmission}
                    className="submit-button"
            >
                Submit
            </button>

            {response && (
                <div>
                    <GetMathSteps steps = {response.steps} />
                </div>
            )}
        </div>
    </div>
    )
}

export default Transpose;