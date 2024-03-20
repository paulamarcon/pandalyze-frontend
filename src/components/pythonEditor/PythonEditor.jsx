import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

const PythonEditor = ({ frontendCode, backendCode }) => {
  const [response, setResponse] = useState("");

  //Pegada al back para correr el codigo
  const handleSubmit = () => {
    //TODO: usar backendCode para la pegada al back
    const pythonCode = `
import pandas as pd
import plotly.express as px

# Crear un DataFrame de ejemplo
data = {
    'x': [1, 2, 3, 4, 5],
    'y': [2, 3, 5, 7, 11]
}
df = pd.DataFrame(data)

# Crear un gráfico de dispersión con Plotly Express
fig = px.scatter(df, x='x', y='y', title='Gráfico de dispersión')

# Mostrar el gráfico
fig.show()
print('hola')
    `;
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
    <>
      <button onClick={handleSubmit}>Run Python Code</button>
      <pre>{response}</pre>
      <CodeMirror
        value={frontendCode}
        height="200px"
        theme="light"
        readOnly={true}
        extensions={[python({ jsx: true })]}
      />
    </>
  );
};

export default PythonEditor;
