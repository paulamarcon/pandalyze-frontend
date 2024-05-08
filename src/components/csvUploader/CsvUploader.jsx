import React, { useState } from "react";

const CsvUploader = ({
  updateDropdownOptions,
  setShowSuccessCsvUploadAlert,
  setShowInitialInstructionsAlert,
}) => {
  const [csvFile, setCsvFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para manejar la carga del archivo CSV en el front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Por favor, seleccione un archivo CSV.");
      setCsvFile(null);
    }
  };

  // Función para enviar el archivo CSV al back y guardarlo en la BD
  const handleSave = () => {
    if (csvFile) {
      const formData = new FormData();
      formData.append("csv", csvFile);

      fetch("http://127.0.0.1:5000/uploadCsv", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((jsonData) => {
          updateCsvOptions(jsonData);
          setShowSuccessCsvUploadAlert(true);
          setShowInitialInstructionsAlert(false);
          setTimeout(() => {
            setShowSuccessCsvUploadAlert(false);
          }, 10000);
        })
        .catch((error) => {
          console.log("Error:", error);
          alert("Error al conectarse al servidor.");
        });
    } else {
      alert("Por favor, seleccione un archivo CSV antes de guardar.");
    }
  };

  const updateCsvOptions = (jsonData) => {
    const newOptions = [[jsonData.fileName, `${jsonData.csvId}`]];

    updateDropdownOptions(newOptions);
  };

  return (
    <div>
      <strong>Subir CSV</strong>
      <div style={{ marginBottom: "10px" }}>
        {/* <input type="file" accept=".csv" onChange={handleFileChange} /> */}
        {/* TODO: si no gusta cómo quedó, seguir usando el input comentado de la linea de arriba */}
        <label htmlFor="files" className="btn btn-primary">
          Seleccionar CSV
        </label>
        <input
          id="files"
          accept=".csv"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <span id="selectedFileName">
          {selectedFile ? selectedFile.name : "Sin archivos seleccionados"}
        </span>
        <button className="btn btn-primary" onClick={handleSave}>
          Guardar CSV
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;
