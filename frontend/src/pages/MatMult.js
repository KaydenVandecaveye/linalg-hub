import GetMathSteps from "./../utils/GetMathSteps";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatrixInput from "../components/MatrixInput";

function MatMult() {
    const navigate = useNavigate();
    const [matrix1, setMatrix1] = useState([[0, 0], [0, 0]]);
    const [matrix2, setMatrix2] = useState([[0, 0], [0, 0]]);
    const [response, setResponse] = useState(null);

    const handleSubmission = async () => {
        const response = await fetch('/api/matmult', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                matrix1,
                matrix2
            }),
        });
        const data = await response.json();
        setResponse(data);
    }

    return (
    <div>
        <h1> LinAlgHub - MatrixMultiplication </h1>
        <button onClick={() => navigate(-1)}>Back</button>
        
        <p>Matrix 1</p>
        <MatrixInput matrix={matrix1} setMatrix={setMatrix1}/>

        <p>Matrix 2</p>
        <MatrixInput matrix={matrix2} setMatrix={setMatrix2} />

        <button onClick={handleSubmission}>Multiply Matrices</button>

        {response && (
            <div>
                <p>{response.result}</p>
            </div>
        )}
    </div>
    )
}

export default MatMult;