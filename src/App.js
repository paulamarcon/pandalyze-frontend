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

    console.log("front ", frontendCode);
    console.log("back ", backendCode);
  };

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <BlocksEditor updateCode={updateCode} />
        <PythonEditor frontendCode={frontendCode} backendCode={backendCode} />
      </div>
    </div>
  );
}

export default App;
