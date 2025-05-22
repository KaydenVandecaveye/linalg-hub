import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseVector } from "../../utils/parseVector";
import GetMathSteps from "../../utils/GetMathSteps";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";

function DotProd() {
    const navigate = useNavigate();
    const [vec1, setVec1] = useState('');
    const [vec2, setVec2] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmission = async (e) => {
        e.preventDefault()
        const vectors = [parseVector(vec1), parseVector(vec2)]

        const response = await fetch('/api/dotprod', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({vectors})
        })

        const data = await response.json();
        setResponse(data);
    }

    return(
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="p-6 flex-col items-center text-center">
                <button onClick={() => navigate(-1)}
                    className="flex items-center"
                >
                    <ArrowLeft/>
                </button>
            

            <h1 className="text-3xl font-bold text-center mb-2">
                Dot Product Calculator
            </h1>
            <p className="text-center mb-8">
                Enter two vectors to compute their dot product with steps!
            </p>

            <form onSubmit={handleSubmission} 
            className="flex flex-col items-center">
                <label className="block text-sm font-semibold mb-1">
                    Vector 1
                </label>
                <input
                    type="text"
                    value={vec1}
                    onChange={e => setVec1(e.target.value)}
                    placeholder="1, 2, 3..."
                    className="vector-input"
                />
                <label className="block text-sm font-semibold mb-1">
                    Vector 2
                </label>
                <input
                    type="text"
                    value={vec2}
                    onChange={e => setVec2(e.target.value)}
                    placeholder="1, 2, 3..."
                    className="vector-input"
                />

                <button type="submit"
                    className="submit-button"
                >
                    Submit
                </button>

            </form>

            
            
            {response && (
                <div>
                    <GetMathSteps steps = {response.steps} />
                </div>
            )}
            </div>
        </div>
    )

}

export default DotProd;