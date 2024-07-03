import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles.css";

const PythonEditor = ({ frontendCode, backendCode, setBackendResponse }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  //Pegada al back para correr el codigo
  const handleSubmit = () => {
    const pythonCode = backendCode;
    fetch(`${API_URL}/runPythonCode`, {
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

        if (!plots.length && !jsonData.output) {
          setBackendResponse({
            codeExecutionError: false,
            codeEmptyWarning: true,
            output:
              "La ejecución del código resultó en una respuesta vacía.\nPara visualizar texto o imágenes, utiliza los bloques de la categoría 'Salida'.",
            plots: plots,
          });
        } else {
          setBackendResponse({
            codeExecutionError: false,
            output: jsonData.output,
            plots: plots,
          });
        }
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
      <div className="code-segment">
        <button
          className="btn btn-success"
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
