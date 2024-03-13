import React, { useState } from "react";

const CsvUploader = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [response, setResponse] = useState("");

  // Función para manejar la carga del archivo CSV
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Por favor, seleccione un archivo CSV.");
    }
  };

  // Función para enviar el archivo CSV al endpoint
  const handleSave = () => {
    if (csvFile) {
      const formData = new FormData();
      formData.append("csv", csvFile);

      fetch("http://127.0.0.1:5000/uploadCsv", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Error al conectarse al servidor.");
        });
    } else {
      alert("Por favor, seleccione un archivo CSV antes de guardar.");
    }
  };

  const handleSubmit = () => {
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
        console.log("data", data);
        setResponse(data.output);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Subir CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleSubmit}>Run Python Code</button>
      <pre>{response}</pre>
    </div>
  );
};

export default CsvUploader;
