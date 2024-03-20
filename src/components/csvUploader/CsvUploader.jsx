import React, { useState } from "react";

const CsvUploader = ({ updateDropdownOptions }) => {
  const [csvFile, setCsvFile] = useState(null);

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
          //TODO: convertir response en una matriz
          updateDropdownOptions(response);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Error al conectarse al servidor.");
        });
    } else {
      alert("Por favor, seleccione un archivo CSV antes de guardar.");
    }
  };

  const updateCsvOptions = () => {
    // TODO dejar de hardcodearlo y llamarlo en la respuesta de la pegada al back
    const newOptions = [["Profesores", "2"]];

    updateDropdownOptions(newOptions);
  };

  return (
    <div>
      <h1>Subir CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={updateCsvOptions}>Actualizar los dropdowns</button>
    </div>
  );
};

export default CsvUploader;
