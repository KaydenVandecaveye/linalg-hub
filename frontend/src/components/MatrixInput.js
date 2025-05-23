import React, { useState, useRef } from 'react';

function MatrixInput({matrix, setMatrix, title, row = 2, col = 2, dimensions = "Matrix dimensions:"}) {

    const handleInputChange = (e, rowIdx, colIdx) => {
        const newMat = [...matrix];
        newMat[rowIdx][colIdx] = Number(e.target.value);
        setMatrix(newMat);
    }

    const updateMatrixSize = (rows, cols) => {
        const newMat = Array.from({length : rows }, (_,i) => 
        Array.from({ length:cols }, (_,j) => 
            matrix[i]?.[j] ?? ""
        ));
        setMatrix(newMat);
    }

    const genRandomMatrix = () => {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const mat = Array.from({length : rows}, () => 
        Array.from({length : cols}, () => Math.floor(Math.random() * 10)));
        setMatrix(mat);
    }

    return (
        <div className="flex flex-col items-center justify-center mb-4">
            
            <h5 className='text-lg font-semibold mb-2'>
                {title}
            </h5>
            <div className='overflow-auto'>
            <table className='border-separate border-spacing-1'>
                <tbody>
                    {matrix.map((row, rowIdx) => (
                        <tr key = {rowIdx}>
                            {row.map((cell, colIdx) => (
                                <td key={colIdx}>
                                    <input
                                    style={styles.matrixCell}
                                    type='number'
                                    value={cell}
                                    onChange={(e) => handleInputChange(e, rowIdx, colIdx)}
                                    placeholder='0'
                                    className='w-14 h-10 text-center text-sm border rounded-lg focus:ring-red-200'
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <label className='text-sm font-medium mt-2'>
                {dimensions}
            </label>
        <div style={styles.controlGroup}>
            <select defaultValue={2} onChange={(e) => updateMatrixSize(parseInt(e.target.value), matrix[0].length)}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key = {n} value={n}>{n}</option>)}
            </select>
            <select defaultValue={2} onChange={(e) => updateMatrixSize(matrix.length, parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
        </div>
        </div>
    );
};

export default MatrixInput;

const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",    
        flexDirection: "column",  
        textAlign: "center", 
        marginBottom: "0.5rem",
    },
    matrixGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    matrixCell: {
      width: "3rem",
      textAlign: "center",
      fontSize: "1rem",
      padding: "0.2rem",
    },
    controlGroup: {
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center",    
        gap: "0.5rem",            
        marginTop: "0.5rem",
        flexDirection: "row"
      },      
      label: {
        textAlign: "center",
      },
  };
  