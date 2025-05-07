import React, { useState, useEffect } from "react";
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { useNavigate } from "react-router-dom";
import GetMathSteps from "./../utils/GetMathSteps";
import { parseVector } from "../utils/parseVector";

function Norm() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const vector = parseVector(input);

    const response = await fetch('/api/norm', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({vector})
    })

    const data = await response.json();
    setResponse(data);
  }

  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>LinAlg Hub - Norm</h1>
      <form onSubmit={handleSubmission}>
        <label>Enter a vector: </label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="1, 2, 3..."
        />
      </form>

      {response && (
        <div>
          <GetMathSteps steps = {response.steps} />
        </div>
      )}
    </div>
  );
}

export default Norm;