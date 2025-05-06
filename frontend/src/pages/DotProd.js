import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parseVector } from "../utils/parseVector";
import GetMathSteps from "./../utils/GetMathSteps";

function DotProd() {
    const navigate = useNavigate();
    const [vec1, setVec1] = useState('');
    const [vec2, setVec2] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmission = async (e) => {
        e.preventDefault()
        const vectors = [parseVector(vec1), parseVector(vec2)]

        const response = await fetch('api/dotprod', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({vectors})
        })

        const data = await response.json();
        setResponse(data);
    }

    return(
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>LinAlgHub - DotProduct</h1>

            <form onSubmit={handleSubmission}>
            <label>Enter vector 1: </label>
            <input
                type="text"
                value={vec1}
                onChange={e => setVec1(e.target.value)}
                placeholder="1, 2, 3..."
            />
            <label>Enter vector 2: </label>
            <input
                type="text"
                value={vec2}
                onChange={e => setVec2(e.target.value)}
                placeholder="1, 2, 3..."
            />
            <button type="submit">Submit</button>
            </form>

            {response && (
                <div>
                    <p>Received: {JSON.stringify(response.received)}</p>
                     <p>Steps: </p>
                    <GetMathSteps steps = {response.steps} />
                    <p>Total: {response.total} </p>
                </div>
            )}
        </div>
    )

}

export default DotProd;