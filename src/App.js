import { useState } from "react";
import "./App.css";
import BlocksEditor from "./components/blocksEditor/BlocksEditor";
import PythonEditor from "./components/pythonEditor/PythonEditor";

function App() {
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");

  const updateCode = (frontendCode, backendCode) => {
    setFrontendCode(frontendCode);
    setBackendCode(backendCode);

    console.log("front code ", frontendCode);
    console.log("back code ", backendCode);
  };

  return (
    <div className="App">
      {/*TODO <div style={{ display: "flex", width: "100%", marginTop: "20px" }}> */}
      <BlocksEditor updateCode={updateCode} />
      <PythonEditor frontendCode={frontendCode} backendCode={backendCode} />
    </div>
  );
}

export default App;
