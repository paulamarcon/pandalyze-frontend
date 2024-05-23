import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles.css";

const PythonEditor = ({ frontendCode, backendCode, setBackendResponse }) => {
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
          codeExecutionError: false,
          output: jsonData.output,
          plots: plots,
        });
      })
      .catch((error) => {
        const errorMessage = JSON.parse(error.message);
        console.warn("Error en el codigo:", errorMessage);

        setBackendResponse({
          codeExecutionError: true,
          personalizedError: errorMessage.personalized_error,
          originalError: errorMessage.original_error,
        });
      });
  };

  return (
    <>
      <div className="code-part">
        <button
          className="btn btn-success mt-4"
          style={{ marginBottom: "16px" }}
          onClick={handleSubmit}
        >
          Ejecutar código
        </button>
        <CodeMirror
          value={frontendCode}
          height="400px"
          theme="light"
          readOnly={true}
          extensions={[python({ jsx: true })]}
        />
      </div>
    </>
  );
};

export default PythonEditor;
