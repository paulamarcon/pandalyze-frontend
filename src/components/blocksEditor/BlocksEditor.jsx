import React, { useEffect, useRef, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly, { Workspace } from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants/toolbox";
import BlocksService from "./services/BlocksService";

// TODO: agregar un theme para los estilos, en lo posible el modernTheme porque es el mas lindo
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

  useEffect(() => {
    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      // theme: "custom",
    });

    //console.log("items", workspace.getToolbox().getToolboxItems()[0]);
    //console.log("func", workspace.getToolbox().getToolboxItems()[0].getDiv());
    BlocksService.initBlocks(useFrontRef, workspace);

    workspace.registerButtonCallback(
      "createVariableCallbackKey",
      BlocksService.onCreateVariableClick.bind(BlocksService)
    );

    workspace.registerToolboxCategoryCallback(
      "VariablesCategory",
      BlocksService.onRefreshFlyout.bind(BlocksService)
    );

    workspace.addChangeListener(onBlocksChange);
  }, []);

  const updateCategoryCallback = (workspace) => {
    console.log("asd");
    return [];
  };

  const onBlocksChange = (event) => {
    //TODO ojo con esta linea
    //const workspace = Blockly.getMainWorkspace();

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

    BlocksService.refreshWorkspace();
  };

  return (
    <div style={{ width: "50%" }}>
      <CsvUploader updateDropdownOptions={updateDropdownOptions} />
      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </div>
  );
};

export default BlocksEditor;
