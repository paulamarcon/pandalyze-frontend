import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles.css";
import Plot from "react-plotly.js";

const PythonEditor = ({ frontendCode, backendCode }) => {
  const [backendResponse, setBackendResponse] = useState({
    output: "",
    plots: "", //graficos de plotly
  });

  //Pegada al back para correr el codigo
  const handleSubmit = () => {
    const pythonCode = backendCode;
    fetch("http://127.0.0.1:5000/run_python_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: pythonCode }),
    })
      .then((response) => response.json())
      .then((jsonData) => {
        let plots = [];
        try {
          // Verificar si jsonData.plots es un array
          if (Array.isArray(jsonData.plots)) {
            plots = jsonData.plots.map((plot) => {
              // Intentar analizar cada elemento del array
              try {
                return JSON.parse(plot);
              } catch (error) {
                console.error("Error parsing plot JSON:", error);
                return null;
              }
            });
          } else {
            console.error("Invalid plots data:", jsonData.plots);
          }
        } catch (error) {
          console.error("Error:", error);
        }

        setBackendResponse({
          output: jsonData.output,
          plots: plots,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        setBackendResponse({ output: error.message });
      });
  };

  return (
    <div className="python-editor-container">
      <button className="btn btn-success mt-4" onClick={handleSubmit}>
        Ejecutar código Python
      </button>
      <div className="console">
        {backendResponse.output ? (
          <pre>{backendResponse.output}</pre>
        ) : (
          <span>Consola</span>
        )}
      </div>
      <CodeMirror
        value={frontendCode}
        height="450px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
      {backendResponse.plots?.length && (
        <>
          {backendResponse.plots.map((plot, index) => (
            <Plot key={index} data={plot.data} layout={plot.layout} />
          ))}
        </>
      )}
    </div>
  );
};

export default PythonEditor;
