import { useState } from "react";
import "./App.css";
import BlocksEditor from "./components/blocksEditor/BlocksEditor";
import PythonEditor from "./components/pythonEditor/PythonEditor";
import WelcomeModal from "./components/welcomeModal/WelcomeModal";
import OutputConsole from "./components/outputConsole/OutputConsole";

function App() {
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");
  const [backendResponse, setBackendResponse] = useState({});
  const [showSuccessCsvUploadAlert, setShowSuccessCsvUploadAlert] =
    useState(false);
  const [showInitialInstructionsAlert, setShowInitialInstructionsAlert] =
    useState(true);

  const updateCode = (frontendCode, backendCode) => {
    setFrontendCode(frontendCode);
    setBackendCode(backendCode);
  };

  const handleCloseCSVAlert = () => {
    setShowSuccessCsvUploadAlert(false);
  };
  const handleCloseInitialAlert = () => {
    setShowInitialInstructionsAlert(false);
  };

  return (
    <div className="app-container">
      {false && (
        <WelcomeModal handleCloseInitialAlert={handleCloseInitialAlert} />
      )}
      {/* {showInitialInstructionsAlert && (
        <div className="alert alert-secondary" role="alert">
          ¡Bienvenidos! En la sección de la izquierda verán los bloques
          disponibles. Arrástrelos para ver su traducción al lenguaje Python y
          luego presione 'Ejecutar código Python' para ver resultados en
          consola.
          <button
            type="button"
            className="btn-close button-close-alert"
            aria-label="Close"
            onClick={handleCloseInitialAlert}
          ></button>
        </div>
      )} */}
      {/* {showSuccessCsvUploadAlert && (
        <div className="alert alert-success" role="alert">
          ¡El archivo CSV se cargó correctamente! Ahora arrastre el bloque
          'read_csv' de la sección Pandas para continuar.
          <button
            type="button"
            className="btn-close button-close-alert"
            aria-label="Close"
            onClick={handleCloseCSVAlert}
          ></button>
        </div>
      )} */}
      <p className="app-entire-title">
        <span className="title">Pandalyze: </span>
        <span className="subtitle">
          aprender Ciencia de Datos con programación en bloques
        </span>
      </p>
      <div className="editors-flex-container">
        <BlocksEditor
          updateCode={updateCode}
          setShowSuccessCsvUploadAlert={setShowSuccessCsvUploadAlert}
          setShowInitialInstructionsAlert={setShowInitialInstructionsAlert}
        />
        <PythonEditor
          frontendCode={frontendCode}
          backendCode={backendCode}
          setBackendResponse={setBackendResponse}
        />
      </div>
      <OutputConsole backendResponse={backendResponse}></OutputConsole>
    </div>
  );
}

export default App;
