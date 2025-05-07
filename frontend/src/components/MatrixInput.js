import React, { useState } from 'react';

function MatrixInput({matrix, setMatrix, row = 2, col = 2}) {

    const handleInputChange = (e, rowIdx, colIdx) => {
        const newMat = [...matrix];
        newMat[rowIdx][colIdx] = Number(e.target.value);
        setMatrix(newMat);
    }

    return (
        <table>
            <tbody>
                {matrix.map((row, rowIdx) => (
                    <tr key = {rowIdx}>
                        {row.map((cell, colIdx) => (
                            <td key={colIdx}>
                                <input
                                type='number'
                                value={cell}
                                onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                                placeholder='0'
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MatrixInput;