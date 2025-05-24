import React, { useState, useEffect } from "react";
import VectorInput from "../../components/VectorInput";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


function CrossProd() {
    const navigate = useNavigate();
    const [vec1, setVec1] = useState("");
    const [vec2, setVec2] = useState("");
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
                Cross Product Calculator
            </h1>
            <p className="text-center mb-8">
                Enter two vectors to calculate their cross product!
            </p>
            <VectorInput vector={vec1} setVector={vec1} title={"Vector 1"}/>
            <VectorInput vector={vec2} setVector={vec2} title={"Vector 2"}/>

            <button onClick={handleSubmission}
                    className="submit-button"
            >
                Submit
            </button>
        </div>
    </div>
    )
}

export default CrossProd;