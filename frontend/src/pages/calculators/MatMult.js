import GetMathSteps from "../../utils/GetMathSteps";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MatrixInput from "../../components/MatrixInput";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="p-6 flex-col items-center text-center">
            <button onClick={() => navigate(-1)}
                className="flex items-center"
            >
                <ArrowLeft/>
            </button>

            <h1 className="text-3xl font-bold text-center mb-2">
                Matrix Multiplication Calculator
            </h1>
            <p className="text-center mb-8">
                Enter two matrices to muliply them with steps!
            </p>
            
            <MatrixInput title={"Matrix A"} matrix={matrix1} setMatrix={setMatrix1}/>
            <MatrixInput title={"Matrix B"} matrix={matrix2} setMatrix={setMatrix2} />
            
        
            <button onClick={handleSubmission}
                className="submit-button"
            >
                Multiply Matrices
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

export default MatMult;