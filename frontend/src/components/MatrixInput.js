import React, { useState, useRef } from 'react';

function MatrixInput({matrix, setMatrix, title, row = 2, col = 2}) {

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

    return (
        <div>
        <h5>{title}</h5>
            <div style={styles.matrixGrid}>
            <table>
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
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        <label>Matrix dimesions:</label>
        <select defaultValue={2} onChange={(e) => updateMatrixSize(parseInt(e.target.value), matrix[0].length)}>
            {[1, 2, 3, 4].map(n => <option key = {n} value={n}>{n}</option>)}
        </select>
        <select defaultValue={2} onChange={(e) => updateMatrixSize(matrix.length, parseInt(e.target.value))}>
            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        </div>
    );
};

export default MatrixInput;

const styles = {
    matrixGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 3rem)",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    matrixCell: {
      width: "3rem",
      textAlign: "center",
      fontSize: "1rem",
      padding: "0.2rem",
    },
  };
  