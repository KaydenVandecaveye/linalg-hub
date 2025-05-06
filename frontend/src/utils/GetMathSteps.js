import { MathJaxContext, MathJax } from 'better-react-mathjax';

function GetMathSteps({ steps }) {
    const latexConfig = {
        loader: { load: ["input/asciimath", "output/chtml"] },
      };

    return (
      <MathJaxContext config={latexConfig}>
      <div>
        {steps.map((step, index) => (
          <MathJax key={index}>
            {step}
          </MathJax>
        ))}
      </div>
    </MathJaxContext>
    );
  }

export default GetMathSteps;