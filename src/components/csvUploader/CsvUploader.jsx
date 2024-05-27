import React, { useEffect, useState } from "react";
import Blockly from "blockly";
import "./CsvUploaderStyles.css";
import BlocksService from "../blocksEditor/services/BlocksService";
import defaultCsv from "./default.csv";
import ErrorAlert from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import WarningAlert from "../alerts/warningAlert/WarningAlert";

const CsvUploader = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileNames, setCsvFileNames] = useState([]);
  const [errorAlertText, setErrorAlertText] = useState("");
  const [successAlertText, setSuccessAlertText] = useState("");
  const [warningAlertText, setWarningAlertText] = useState("");

  useEffect(() => {
    const loadDefaultCsv = async () => {
      try {
        const response = await fetch(defaultCsv); //TODO por q verga hago un fetch?
        const csvContent = await response.text();
        const csvBlob = new Blob([csvContent], { type: "text/csv" });
        const csvFile = new File([csvBlob], "Lagos.csv");

        handleSave(csvFile);
      } catch (error) {
        setErrorAlertText(
          "Hubo un error al intentar cargar el CSV, inténtelo de nuevo."
        );
        setTimeout(() => {
          setErrorAlertText("");
        }, 3000);
        setSuccessAlertText("");
        setWarningAlertText("");
      }
    };

    // Llamar a la función para cargar el archivo CSV predeterminado
    loadDefaultCsv();
  }, []);

  // Función para manejar la carga del archivo CSV en el front
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      setWarningAlertText("Por favor, seleccione un archivo CSV.");
      setTimeout(() => {
        setWarningAlertText("");
      }, 3000);
      setSuccessAlertText("");
      setErrorAlertText("");
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
    let file;
    if (csvFile) {
      if (csvFileNames.includes(csvFile?.name)) {
        setErrorAlertText("Ya existe un CSV con ese nombre.");
        setTimeout(() => {
          setErrorAlertText("");
        }, 3000);
        setCsvFile(null);
        setSuccessAlertText("");
        setWarningAlertText("");
        return;
      }
      file = csvFile;
    } else {
      file = defaultCsvFile;
    }
    setCsvFileNames((prevCsvFileNames) => [...prevCsvFileNames, file?.name]);

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
          if (file !== defaultCsvFile) {
            setSuccessAlertText("CSV cargado correctamente.");
            setTimeout(() => {
              setSuccessAlertText("");
            }, 3000);
            setErrorAlertText("");
            setWarningAlertText("");
          }
        })
        .catch((error) => {
          setErrorAlertText(
            "Hubo un error al intentar conectarse al servidor."
          );
          setTimeout(() => {
            setErrorAlertText("");
          }, 3000);
          setSuccessAlertText("");
          setWarningAlertText("");
        });
    } else {
      setWarningAlertText(
        "Por favor, seleccione un archivo CSV antes de guardar."
      );
      setTimeout(() => {
        setWarningAlertText("");
      }, 3000);
      setSuccessAlertText("");
      setErrorAlertText("");
    }
  };

  const updateCsvOptions = (jsonData) => {
    BlocksService.onCsvUpload({
      id: jsonData.csvId,
      filename: jsonData?.fileName,
      columnsNames: jsonData?.columnsNames,
    });
  };

  return (
    <div>
      {/* <button onClick={exportWorkspaceToJson}>Exportar Workspace a JSON</button> */}
      <div style={{ marginBottom: "16px" }}>
        {/* <input type="file" accept=".csv" onChange={handleFileChange} /> */}
        {/* TODO: si no gusta cómo quedó, seguir usando el input comentado de la linea de arriba */}
        <label htmlFor="files" className="btn btn-primary">
          Cargar CSV
        </label>
        <input
          id="files"
          accept=".csv"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <span className="margin-right margin-left">{csvFile?.name}</span>
        {csvFile && (
          <button className="btn btn-success margin-right" onClick={handleSave}>
            Guardar CSV
          </button>
        )}
      </div>
      {errorAlertText && errorAlertText !== "" && (
        <ErrorAlert errorAlertText={errorAlertText} />
      )}
      {successAlertText && successAlertText !== "" && (
        <SuccessAlert successAlertText={successAlertText} />
      )}
      {warningAlertText && warningAlertText !== "" && (
        <WarningAlert warningAlertText={warningAlertText} />
      )}
    </div>
  );
};

export default CsvUploader;
