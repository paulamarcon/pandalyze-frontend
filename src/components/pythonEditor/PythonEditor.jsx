import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import "./styles.css";

const PythonEditor = ({ frontendCode, backendCode }) => {
  const [response, setResponse] = useState("");

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
      .then((data) => {
        setResponse(data.output);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="python-editor-container">
      <button className="btn btn-success mt-4" onClick={handleSubmit}>
        Ejecutar código Python
      </button>
      <div className="console">
        {response ? <pre>{response}</pre> : <span>Consola</span>}
      </div>
      <CodeMirror
        value={frontendCode}
        height="450px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
    </div>
  );
};

export default PythonEditor;
