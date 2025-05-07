import GetMathSteps from "./../utils/GetMathSteps";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatrixInput from "../components/MatrixInput";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function MatMult() {
    const navigate = useNavigate();

    // default to 2x2 matrices
    const [matrix1, setMatrix1] = useState([["", ""], ["", ""]]);
    const [matrix2, setMatrix2] = useState([["", ""], ["", ""]]);
    const [response, setResponse] = useState(null);

    const parseMatrix = (matrix) => 
        matrix.map(row => row.map(cell => Number(cell)));

    const handleSubmission = async () => {
        const response = await fetch('/api/matmult', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                matrix1: parseMatrix(matrix1),
                matrix2: parseMatrix(matrix2)
            }),
        });
        const data = await response.json();
        setResponse(data);

        console.log("Steps", data.steps);
    }

    const updateMatrixSize = (matrix1, rows, cols) => {
        if (matrix1) {
            setMatrix1(Array.from({length:rows}, () => 
            Array.from({length: cols}, () => "")
            ));
        }
        else {
            setMatrix2(Array.from({length:rows}, () => 
                Array.from({length: cols}, () => "")
                ));
        };
    }


    const latexConfig = {
        loader: { load: ["input/asciimath", "output/chtml"] },
    };
    

    return (
    <div>
        <h1> LinAlgHub - MatrixMultiplication </h1>
        <button onClick={() => navigate(-1)}>Back</button>
        
        <MatrixInput title={"Matrix A"} matrix={matrix1} setMatrix={setMatrix1}/>
        <MatrixInput title={"Matrix B"} matrix={matrix2} setMatrix={setMatrix2} />

        <button onClick={handleSubmission}>Multiply Matrices</button>

        {response && (
            <div>
                <GetMathSteps steps = {response.steps} />
            </div>
        )}

    </div>
    )
}

export default MatMult;