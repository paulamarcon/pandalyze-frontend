import React, { useEffect, useState } from "react";
import BlocksService from "../blocksEditor/services/BlocksService";
import "./CsvUploaderStyles.css";
import defaultCsv from "./default.csv";
import Blockly from "blockly";

const CsvUploader = ({
  setShowSuccessCsvUploadAlert,
  setShowInitialInstructionsAlert,
}) => {
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    const loadDefaultCsv = async () => {
      try {
        const response = await fetch(defaultCsv);
        const csvContent = await response.text();
        const csvBlob = new Blob([csvContent], { type: "text/csv" });
        const csvFile = new File([csvBlob], "Alumnos.csv");

        console.log("Cargando default");
        handleSave(csvFile);
      } catch (error) {
        console.error("Error al cargar el archivo CSV:", error);
        alert("Error al cargar el archivo CSV.");
      }
    };

    // Llamar a la función para cargar el archivo CSV predeterminado
    loadDefaultCsv();
  });

  // Función para manejar la carga del archivo CSV en el front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      alert("Por favor, seleccione un archivo CSV.");
      setCsvFile(null);
    }
  };

  const exportWorkspaceToJson = () => {
    const state = Blockly.serialization.workspaces.save(
      Blockly.getMainWorkspace()
    );
    const jsonString = JSON.stringify(state);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Función para enviar el archivo CSV al back y guardarlo en la BD
  const handleSave = (defaultCsvFile) => {
    const file = csvFile ? csvFile : defaultCsvFile;

    if (file) {
      const formData = new FormData();
      formData.append("csv", file);

      fetch("http://127.0.0.1:5000/uploadCsv", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((jsonData) => {
          updateCsvOptions(jsonData);
          setCsvFile(null);
          setShowSuccessCsvUploadAlert(true);
          // setShowInitialInstructionsAlert(false);
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
    BlocksService.onCsvUpload({
      id: jsonData.csvId,
      filename: jsonData.fileName,
      columnsNames: jsonData.columnsNames,
    });
  };

  return (
    <div>
      <button onClick={exportWorkspaceToJson}>Exportar Workspace a JSON</button>
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
        <span className="file-name-separation">{csvFile?.name}</span>
        {csvFile && (
          <button className="btn btn-secondary" onClick={handleSave}>
            Guardar CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default CsvUploader;
