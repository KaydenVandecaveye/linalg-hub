export function parseMatrix (matrix) {
    return matrix.map(row => row.map(cell => Number(cell)))
}