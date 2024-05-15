import React, { useEffect, useRef } from "react";
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
  var workspace;
  const useFrontRef = useRef(true);

  useEffect(() => {
    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      zoom: {
        controls: true,
      },
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

    workspace.addChangeListener(function (event) {
      onBlocksChange(event);

      // Agregar la lógica adicional para el evento de clic en el bloque
      if (event.type === "click" && event.targetType === "block") {
        var clickedBlockId = event.blockId; // ID del bloque que se ha hecho clic
        console.log("Se hizo clic en un bloque con ID: " + clickedBlockId);
        var clickedBlock = workspace.getBlockById(clickedBlockId);
        console.log("clickedBlock", clickedBlock);
      }
    });
  }, []);

  const onBlocksChange = (event) => {
    //TODO ojo con esta linea
    const workspace = Blockly.getMainWorkspace();

    useFrontRef.current = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);

    useFrontRef.current = false;
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    /*Puede servir?
    if (
      event.type === Blockly.Events.BLOCK_CHANGE &&
      event.name === "csvOptions"
    ) {
      BlocksService.changeCsvColumnsDropdown(event.newValue);
    }*/

    updateCode(frontendCode, backendCode);
  };

  return (
    <div className="blocks-editor-container">
      <CsvUploader
        setShowSuccessCsvUploadAlert={setShowSuccessCsvUploadAlert}
        setShowInitialInstructionsAlert={setShowInitialInstructionsAlert}
      />
      <div id="blocklyDiv" style={{ flex: 1, height: "400px" }}></div>
    </div>
  );
};

export default BlocksEditor;
