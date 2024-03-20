import { useState } from "react";
import "./App.css";
import Blockly from "blockly";
import BlocksEditor from "./components/blocksEditor/BlocksEditor";
import PythonEditor from "./components/pythonEditor/PythonEditor";
import { pythonGenerator } from "blockly/python";

function App() {
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");
  const [useFront, setUseFront] = useState(false);

  const updateCode = (event) => {
    //TODO ojo con esta linea
    const workspace = Blockly.getMainWorkspace();

    setUseFront(true);
    const frontendCode = pythonGenerator.workspaceToCode(workspace);
    setFrontendCode(frontendCode);

    setUseFront(false);
    // dudosa la linea 94. la 90 y 97 primero imprimen bien, pero cuando apreto el boton imprimen lo mismo (lo del front)
    const backendCode = pythonGenerator.workspaceToCode(workspace);
    setBackendCode(backendCode);
  };

  return (
    <div className="App">
      {/*TODO <div style={{ display: "flex", width: "100%", marginTop: "20px" }}> */}
      <BlocksEditor useFront={useFront} updateCode={updateCode} />
      <PythonEditor frontendCode={frontendCode} backendCode={backendCode} />
    </div>
  );
}

export default App;
