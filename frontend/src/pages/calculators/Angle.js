import React, { useState, useEffect } from "react";
import VectorInput from "../../components/VectorInput";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parseVector } from "../../utils/parseVector";
import GetMathSteps from "../../utils/GetMathSteps";


function Angle() {
    const navigate = useNavigate();
    const [vec1, setVec1] = useState("");
    const [vec2, setVec2] = useState("");
    const [response, setResponse] = useState(null);

    const handleSubmission = async (e) => {
            e.preventDefault()
            const vectors = [parseVector(vec1), parseVector(vec2)]
    
            const response = await fetch('/api/angle', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({vectors})
            })
    
            const data = await response.json();
            setResponse(data);
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
                Angle between vectors Calculator
            </h1>
            <p className="text-center mb-8">
                Enter two vectors to calculate the angle between them!
            </p>

            <VectorInput vector={vec1} setVector={setVec1} title={"Vector 1"}/>
            <VectorInput vector={vec2} setVector={setVec2} title={"Vector 2"}/>

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

export default Angle;