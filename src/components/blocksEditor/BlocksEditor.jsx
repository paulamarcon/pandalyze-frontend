import React, { useEffect, useRef, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants/toolbox";
import BlocksService from "./services/BlocksService";

const BlocksEditor = ({ updateCode }) => {
  const [csvResponse, setCsvResponse] = useState([["Alumnos", "1"]]);
  var workspace;
  const useFrontRef = useRef(true);

  const onCreateVariableClick = (button) => {
    // Blockly.Variables.createVariableButtonHandler(
    //   button.getTargetWorkspace(),
    //   null
    //   //tipo de dato
    // );
  };

  useEffect(() => {
    BlocksService.initBlocks(useFrontRef);

    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
    });

    workspace.registerButtonCallback(
      "createVariableCallbackKey",
      onCreateVariableClick
    );

    workspace.addChangeListener(onBlocksChange);
  }, []);

  const onBlocksChange = (event) => {
    //TODO ojo con esta linea
    const workspace = Blockly.getMainWorkspace();

    useFrontRef.current = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);

    useFrontRef.current = false;
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    updateCode(frontendCode, backendCode);
  };

  const updateDropdownOptions = (newOptions) => {
    const updatedCsvResponse = [...csvResponse, ...newOptions];

    setCsvResponse(updatedCsvResponse);

    Blockly.Blocks["read_csv"].generateOptions = function () {
      return updatedCsvResponse;
    };

    // Actualizar los bloques en el workspace
    workspace = Blockly.getMainWorkspace();
    const blocksXML = Blockly.Xml.workspaceToDom(workspace);
    workspace.clear();
    Blockly.Xml.domToWorkspace(blocksXML, workspace);
  };

  return (
    <div style={{ width: "50%" }}>
      <CsvUploader updateDropdownOptions={updateDropdownOptions} />

      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </div>
  );
};

export default BlocksEditor;
