from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import math

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route('/api/norm', methods=["POST"])
def norm():
    data = request.get_json()
    vector = data.get('vec', [])

    # calculate norm
    sqrs = [x**2 for x in vector]
    sum_of_sqrs = sum(sqrs)
    norm = sum_of_sqrs ** (0.5)

    #steps
    steps = [
        "\\[ \\underline{\\text{Steps:}} \\]",
        f"\\[||\\vec{{v}}|| = \\sqrt{{{' + '.join(f'{x}^2' for x in vector)}}}\\]",
        f"\\[||\\vec{{v}}|| = \\sqrt{{{' + '.join(str(x) for x in sqrs)}}}\\]",
        f"\\[||\\vec{{v}}|| = \\sqrt{{{sum_of_sqrs}}}\\]",
        f"\\[||\\vec{{v}}|| = {round(norm, 4)}\\]"
    ]

    return jsonify({
        'received': vector,
        'norm': norm,
        'steps': steps,
        "status": "valid"
    })

@app.route('/api/dotprod', methods=["POST"])
def dotprod():
    data = request.get_json()

    vectors = data.get('vectors', [])
    non_empty_vecs = [v for v in vectors if v]

    match len(non_empty_vecs):
        # no vectors, invalid
        case 0:
            return jsonify({
            'received': vectors,
            'steps': '',
            "status": "invalid",
            "total": "null"
        })
        # 1 vector, dotprod with itself
        case 1:
            vec1 = non_empty_vecs[0]
            sqrs = [x**2 for x in vec1]
            total = sum(sqrs)
            steps = [
                "\\[ \\underline{\\text{Steps:}} \\]",
                f"\\[\\vec{{v}} \\cdot \\vec{{v}} = \\sum_{{i=1}}^{{n}} v_i^2 \\]",
                f"\\[\\vec{{v}} \\cdot \\vec{{v}} = {{{' + '.join(f'{x}^2' for x in vec1)}}}\\]",
                f"\\[\\vec{{v}} \\cdot \\vec{{v}} = {{{' + '.join(str(x) for x in sqrs)}}}\\]",
                f"\\[\\vec{{v}} \\cdot \\vec{{v}} = {round(total, 4)}\\]"
            ]
        # assume 2 vectors, dotprod with each other
        case _:
            # if lengths uneven, invalid
            vec1, vec2 = non_empty_vecs[0], non_empty_vecs[1]
            if len(vec1) != len(vec2):
                return jsonify({
                'received': vectors,
                'steps': '',
                "status": "invalid",
                "total": None
            })
            sqrs = [x1 * x2 for x1,x2 in zip(vec1,vec2)]
            total = sum(sqrs)
            steps = [
                f"\\[\\vec{{v_1}} \\cdot \\vec{{v_2}} = \\sum_{{i=1}}^{{n}} v_{{1i}} * v_{{2i}} \\]",
                f"\\[\\vec{{v_1}} \\cdot \\vec{{v_2}} = {{{' + '.join(f'({x1} * {x2})' for x1,x2 in zip(vec1,vec2))}}}\\]",
                f"\\[\\vec{{v_1}} \\cdot \\vec{{v_2}} = {{{' + '.join(str(x) for x in sqrs)}}}\\]",
                f"\\[\\vec{{v_1}} \\cdot \\vec{{v_2}} = {round(total, 4)}\\]"
            ]

    return jsonify({
        'received': vectors,
        'total': total,
        'status': "valid",
        'steps': steps
    })

@app.route('/api/matmult', methods=['POST'])
def mat_mult():
    # get matrices
    data = request.get_json()
    A = data.get('matrix1')
    B = data.get('matrix2')

    # validate sent data
    if not A or not B:
        return jsonify({
            'error':'Missing matrix input',
            'steps': []
            })

    m,n = len(A), len(A[0])
    p,z = len(B), len(B[0])
    if n != p:
        return jsonify({
            'error':'Invalid matrix dimensions',
            'steps': []
            })
    result = [[0 for _ in range(z)] for _ in range(m)]

    steps = [
        "\\[ \\underline{\\text{Steps:}} \\]",
        "\\[AB = C \\text{, where } C_{ij} = \\sum_{k=1}^{n} A_{ik} \\cdot B_{kj} \\]",
        f"\\[ A \\in \\mathbb{{R}}^{{{m}\\times{n}}},\\ B \\in \\mathbb{{R}}^{{{n}\\times{z}}} \\Rightarrow C \\in \\mathbb{{R}}^{{{m}\\times{z}}} \\]"
    ]

    # perform matrix multiplication
    for i in range(m):
        for j in range(z):
            step = []
            total = 0
            for k in range(n):
                prod = A[i][k] * B[k][j]
                step.append(f"({A[i][k]} * {B[k][j]})")
                total += prod
            steps.append(f"\\[ C_{{{i+1}{j+1}}} = { ' + '.join(step) } = {total }\\]")
            result[i][j] = total

    # return result w steps array
    steps.append(f"\\[{matrix_to_latex(A)}{matrix_to_latex(B)} = {matrix_to_latex(result)}\\]")
    return jsonify({
        "result": result, 
        "steps": steps
    })

@app.route('/api/transpose', methods = ['POST'])
def transpose():
    # receive matrix
    data = request.get_json()
    A = data.get('matrix')

    # form resulting matrix
    m,n = len(A), len(A[0])
    result = [[0 for _ in range(m)] for _ in range(n)]
    steps = ["\\[ \\underline{\\text{Steps:}} \\]"]

    # fill resulting matrix w transpose
    for i in range(m):
        for j in range(n):
            result[j][i] = A[i][j]
    
    # send back result
    steps.append(matrix_to_latex(result))
    return jsonify({
        "result": result,
        "steps": steps
    })

@app.route('/api/angle', methods = ['POST'])
def angle():
    # receive vectors
    data = request.get_json()
    vectors = data.get("vectors", [])

    # ensure data is valid
    if len(vectors) != 2:
        return jsonify({
            "result": "",
            "steps": "",
            "status": "invalid"
        })
        
    vec1, vec2 = vectors

    if len(vec1) != len(vec2):
        return jsonify({
            "result": "",
            "steps": "",
            "status": "invalid"
        })

    mag1 = norm_internal(vec1)
    mag2 = norm_internal(vec2)

    if (mag1 == 0) or (mag2 == 0):
        return jsonify({
            "result": "",
            "steps": "",
            "status": "invalid"
        })

    # calculate angle
    steps = ["\\[ \\underline{\\text{Steps:}} \\]"]
    result_rad = math.acos((dot_prod_internal(vec1, vec2)) / (mag1 * mag2))
    results_deg = round(math.degrees(result_rad), 3)
    steps.append(f"\\[ {results_deg}^\circ \\]")

    return jsonify({
        "result": results_deg,
        "steps": steps
    })

# internal backend functions

def matrix_to_latex(matrix):
    rows = [" & ".join(map(str, row)) for row in matrix]
    return "\\begin{bmatrix}" + " \\\\ ".join(rows) + "\\end{bmatrix}"

def dot_prod_internal(vec1, vec2):
    return sum(x * y for x,y in zip(vec1, vec2))

def norm_internal(vec):
    return sum(x ** 2 for x in vec) ** (0.5)
    

if __name__ == '__main__':
    app.run(port=8000, debug=True)