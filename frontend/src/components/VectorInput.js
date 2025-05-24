import React from "react";

function VectorInput({vector, setVector, title}) {
    return(
        <div>
            <label className="block text-sm font-semibold mb-1">
                {title}
            </label>
            <input
                type="text"
                value={vector}
                onChange={e => setVector(e.target.value)}
                placeholder="1, 2, 3..."
                className="vector-input"
            />
        </div>
    )
}

export default VectorInput;