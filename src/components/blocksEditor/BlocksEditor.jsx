import React, { useEffect, useRef, useState } from "react";
import CsvUploader from "../csvUploader/CsvUploader";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { toolbox } from "./constants/toolbox";
import BlocksService from "./services/BlocksService";
import "./styles.css";

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

const BlocksEditor = ({
  updateCode,
  setShowSuccessCsvUploadAlert,
  setShowInitialInstructionsAlert,
}) => {
  const [csvResponse, setCsvResponse] = useState([["Alumnos", "1"]]);
  var workspace;
  const useFrontRef = useRef(true);

  useEffect(() => {
    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      // theme: "custom",
    });

    BlocksService.initBlocks(useFrontRef);

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

    BlocksService.refreshWorkspace();
  };

  return (
    <div className="blocks-editor-container">
      <CsvUploader
        updateDropdownOptions={updateDropdownOptions}
        setShowSuccessCsvUploadAlert={setShowSuccessCsvUploadAlert}
        setShowInitialInstructionsAlert={setShowInitialInstructionsAlert}
      />
      <div id="blocklyDiv" style={{ flex: 1, height: "680px" }}></div>
    </div>
  );
};

export default BlocksEditor;
