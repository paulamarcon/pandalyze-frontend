import React, { useState } from "react";
import BlocksService from "../blocksEditor/services/BlocksService";

const CsvUploader = () => {
  const [csvFile, setCsvFile] = useState(null);

  // Función para manejar la carga del archivo CSV en el front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Por favor, seleccione un archivo CSV.");
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
    BlocksService.onCsvUpload({
      id: jsonData.csvId,
      filename: jsonData.fileName,
      columnsNames: jsonData.columnsNames,
    });
  };

  return (
    <div>
      <strong>Subir CSV</strong>
      <div style={{ marginBottom: "10px" }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {/* TODO: hacer que funcione lo de abajo pero mostrando el texto del archivo seleccionado como hace el input de arriba */}
        {/* <label htmlFor="files" className="btn btn-primary">
          Seleccionar CSV
        </label>
        <input
          id="files"
          accept=".csv"
          type="file"
          onChange={handleFileChange}
        /> */}
        <button className="btn btn-primary" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;
