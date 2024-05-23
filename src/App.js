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
  const [showInitialInstructionsAlert, setShowInitialInstructionsAlert] =
    useState(true);

  const updateCode = (frontendCode, backendCode) => {
    setFrontendCode(frontendCode);
    setBackendCode(backendCode);
  };

  const handleCloseInitialAlert = () => {
    setShowInitialInstructionsAlert(false);
  };

  return (
    <div className="app-container">
      {showInitialInstructionsAlert && (
        <WelcomeModal handleCloseInitialAlert={handleCloseInitialAlert} />
      )}
      <p className="app-entire-title">
        <span className="title">Pandalyze: </span>
        <span className="subtitle">
          aprender Ciencia de Datos con programación en bloques
        </span>
      </p>
      <div className="editors-flex-container">
        <BlocksEditor updateCode={updateCode} />
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
