import React, { useEffect, useRef, useState } from "react";
import Blockly from "blockly";
import "./styles.css";
import { pythonGenerator } from "blockly/python";
import CsvUploader from "../csvUploader/CsvUploader";
import BlockInfoModal from "../blockInfoModal/BlockInfoModal";
import BlocksService from "./services/BlocksService";
import { toolbox } from "./constants/toolbox";
import { blocksInfo } from "./constants/blocksInfo";
import defaultBlocks from "./constants/blocks/defaultBlocks.json";

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
  const [openBlockInfoModal, setOpenBlockInfoModal] = useState(false);
  const [block, setBlock] = useState(null);
  const mouseTrackerRef = useRef({ x: null, y: null });
  const [mouseClickPosition, setMouseClickPosition] = useState({
    x: null,
    y: null,
  });

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    mouseTrackerRef.current = { x: mouseX, y: mouseY };
  };

  useEffect(() => {
    workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      zoom: {
        controls: true,
      },
      // theme: "custom",
    });

    //TODO: falta hacer el remove del event en algun lado por ahí
    document.addEventListener("mousemove", handleMouseMove);

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
      if (event.type === "click" && event.targetType === "block") {
        var clickedBlockId = event.blockId; // Recupero el ID del bloque sobre el que se hizo clic
        var clickedBlock = workspace.getBlockById(clickedBlockId); // Recupero más información sobre el bloque que se clickeó
        // A partir del type del bloque obtengo la información a mostrar en el modal
        const block = blocksInfo.find(
          (block) => block.blockType === clickedBlock.type
        );
        if (block) {
          setOpenBlockInfoModal((prev) => !prev);
          setBlock(block);
          // Seteo la posición del mouse para saber donde abrir el modal
          setMouseClickPosition({
            x: mouseTrackerRef.current.x,
            y: mouseTrackerRef.current.y,
          });
        }
      } else if (event.targetType !== "block") {
        setOpenBlockInfoModal(false);
      }
    });

    Blockly.serialization.workspaces.load(defaultBlocks, workspace);
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
      <div id="blocklyDiv" style={{ height: "400px" }}></div>
      {openBlockInfoModal && (
        <BlockInfoModal {...block} mouseClickPosition={mouseClickPosition} />
      )}
    </div>
  );
};

export default BlocksEditor;
