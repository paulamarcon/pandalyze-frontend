import React, { useEffect, useRef, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants/toolbox";
import BlocksService from "./services/BlocksService";

// Blockly.Themes.Custom = Blockly.Theme.defineTheme("custom", {
//   base: Blockly.Themes.Classic,
//   fontStyle: {
//     family: "Arial",
//     size: 12,
//   },
//   componentStyles: {
//     workspaceBackgroundColour: "white",
//     toolboxBackgroundColour: "#E6E4E4",
//     toolboxForegroundColour: "black",
//     flyoutBackgroundColour: "#303030",
//     flyoutForegroundColour: "#ccc",
//     flyoutOpacity: 0.8,
//     scrollbarColour: "#797979",
//     scrollbarOpacity: 0.4,
//   },
// });

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
      // theme: "custom",
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
