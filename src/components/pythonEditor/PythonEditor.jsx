import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

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
    <div style={{ width: "50%" }}>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Ejecutar código Python
      </button>
      <div
        style={{
          border: "1px solid #ced4da",
          width: "100%",
          height: "30%",
          marginBottom: "10px",
          marginTop: "34px",
        }}
      >
        {response ? <pre>{response}</pre> : <span>Consola</span>}
      </div>
      <CodeMirror
        value={frontendCode}
        height="200px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
    </div>
  );
};

export default PythonEditor;
