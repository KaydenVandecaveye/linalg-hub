export function parseVector(text) {
    return text.split(',').map(v => parseFloat(v.trim()))
                          .filter(v => !isNaN(v))
}