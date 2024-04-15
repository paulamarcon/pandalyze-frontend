import Blockly from "blockly";
import { initHeadBlock } from "../constants/blocks/headBlock";
import { initInfoBlock } from "../constants/blocks/infoBlock";
import { initMeanBlock } from "../constants/blocks/meanBlock";
import { initPrintBlock } from "../constants/blocks/printBlock";
import { initReadCsvBlock } from "../constants/blocks/readCsvBlock";
import { initVariablesBlocks } from "../constants/blocks/variables";

const BlocksService = {
  variables: [],

  initBlocks(useFrontRef) {
    initPrintBlock();
    initReadCsvBlock(useFrontRef);
    initHeadBlock();
    initInfoBlock();
    initMeanBlock();
    initVariablesBlocks();
  },

  onCreateVariableClick(button) {
    const variableName = prompt("Nombra tu variable:");
    if (variableName !== null && variableName.trim() !== "") {
      this.variables.push(variableName);

      // Actualizar las opciones de los bloques get y set
      Blockly.Blocks["variables_get"].generateOptions = function () {
        return BlocksService.variables.map((variable, index) => [
          variable,
          index.toString(),
        ]);
      };

      Blockly.Blocks["variables_set"].generateOptions = function () {
        return BlocksService.variables.map((variable, index) => [
          variable,
          index.toString(),
        ]);
      };

      this.refreshWorkspace();
    }
  },

  refreshWorkspace() {
    const workspace = Blockly.getMainWorkspace();
    const blocksXML = Blockly.Xml.workspaceToDom(workspace);
    workspace.clear();
    Blockly.Xml.domToWorkspace(blocksXML, workspace);
  },
};

export default BlocksService;
