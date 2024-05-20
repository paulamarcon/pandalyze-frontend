import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles.css";
import Plot from "react-plotly.js";

const PythonEditor = ({ frontendCode, backendCode }) => {
  const [backendResponse, setBackendResponse] = useState({});

  //Pegada al back para correr el codigo
  const handleSubmit = () => {
    const pythonCode = backendCode;
    fetch("http://127.0.0.1:5000/runPythonCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: pythonCode }),
    })
      .then((response) => {
        // Si el backend rompe lanza el error al catch. Sino, lo jsonifica
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((jsonData) => {
        let plots = [];
        if (Array.isArray(jsonData.plots)) {
          plots = jsonData.plots.map((plot) => {
            try {
              return JSON.parse(plot);
            } catch (error) {
              console.error("Error parsing plot JSON:", error);
              return null;
            }
          });
        }

        setBackendResponse({
          output: jsonData.output,
          plots: plots,
        });
      })
      .catch((error) => {
        console.error("Backend error:", error);
        setBackendResponse({
          output: JSON.parse(error.message).pythonError,
          codeExecutionError: true,
        });
      });
  };

  useEffect(() => {
    if (backendResponse.output || backendResponse.plots) {
      document
        .querySelector(".console")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [backendResponse]);

  return (
    <>
      <div className="code-part">
        <button
          className="btn btn-success mt-4"
          style={{ marginBottom: "16px" }}
          onClick={handleSubmit}
        >
          Ejecutar código Python
        </button>
        <CodeMirror
          value={frontendCode}
          height="400px"
          theme="light"
          readOnly={true}
          extensions={[python({ jsx: true })]}
        />
      </div>
      <div
        className={
          "console" +
          (backendResponse.codeExecutionError ? " console-error" : "")
        }
      >
        {backendResponse.output && (
          <pre className="code-output">{backendResponse.output}</pre>
        )}
        {backendResponse.plots?.map((plot, index) => (
          <Plot key={index} data={plot.data} layout={plot.layout} />
        ))}
        {!backendResponse.output && !backendResponse.plots && <h5>Consola</h5>}
      </div>
    </>
  );
};

export default PythonEditor;
