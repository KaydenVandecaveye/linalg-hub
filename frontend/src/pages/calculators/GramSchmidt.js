import React, {useState} from "react";
import MatrixInput from "../../components/MatrixInput";
import Header from "../../components/Header";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GramSchmidt() {
    const [vectorSet, setVectorSet] = useState([["", ""], ["", ""]]);
    const navigate = useNavigate();

    return(
        <div div className="min-h-screen bg-gray-50">
            <Header/>

            <div className="p-6 flex-col items-center text-center">
                <button onClick={() => navigate(-1)}
                    className="flex items-center"
                >
                    <ArrowLeft/>
                </button>

                <h1 className="text-3xl font-bold text-center mb-2">
                    Gram-Schmidt Orthogonalization Calculator
                </h1>
                <p className="text-center mb-8">
                    Enter a set of vectors as the columns of a matrix. Then, follow the steps to transform them into an orthonormal basis for the given set.
                </p>

                <MatrixInput matrix={vectorSet} setMatrix={setVectorSet} title={"Set of Vectors"} dimensions="Dimensions of set of Vectors:"/>

                <button className="submit-button">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default GramSchmidt;