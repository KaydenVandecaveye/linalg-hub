import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetMathSteps from "../../utils/GetMathSteps";
import { parseVector } from "../../utils/parseVector";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import VectorInput from "../../components/VectorInput";

function Norm() {
  const navigate = useNavigate();
  const [vector, setVector] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const vec = parseVector(vector);

    const response = await fetch('/api/norm', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({vec})
    })

    const data = await response.json();
    setResponse(data);
  }

  
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
            Norm Calculator
        </h1>
        <p className="text-center mb-8">
            Enter a vector to compute it's norm with steps!
        </p>

        <form onSubmit={handleSubmission}
          className="flex flex-col items-center"
        >
          <VectorInput title={"Vector"} setVector={setVector} vector={vector}/>
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
  );
}

export default Norm;