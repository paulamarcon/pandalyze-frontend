import Blockly from "blockly";
import { initHeadBlock } from "../constants/blocks/headBlock";
import { initInfoBlock } from "../constants/blocks/infoBlock";
import { initPrintBlock } from "../constants/blocks/printBlock";
import { initReadCsvBlock } from "../constants/blocks/readCsvBlock";
import { initVariablesBlocks } from "../constants/blocks/variablesBlock";
import { toolbox } from "../constants/toolbox";
import { initLineBlock } from "../constants/blocks/plotly/lineBlock";
import { initPropertyBlock } from "../constants/blocks/propertyBlock";
import { initBarBlock } from "../constants/blocks/plotly/barBlock";
import { initScatterBlock } from "../constants/blocks/plotly/scatterBlock";
import { initMeanBlock } from "../constants/blocks/pandasFilter/meanBlock";
import { initMaxBlock } from "../constants/blocks/pandasFilter/maxBlock";
import { initMinBlock } from "../constants/blocks/pandasFilter/minBlock";
import { initCountBlock } from "../constants/blocks/pandasFilter/countBlock";
import { initCustomComparisonBlock } from "../constants/blocks/comparisonBlock";

const BlocksService = {
  //TODO: Ojo aca, servicio con estado puede bardear si es uno solo para varios usuarios?
  variables: [],
  csvsData: [],

  initBlocks(useFrontRef) {
    initPrintBlock();
    initReadCsvBlock(useFrontRef);
    initHeadBlock();
    initInfoBlock();
    initVariablesBlocks();
    initPropertyBlock(this.csvsData, this.variables);
    initLineBlock();
    initBarBlock();
    initScatterBlock();
    initMeanBlock();
    initMaxBlock();
    initMinBlock();
    initCountBlock();
    initCustomComparisonBlock();
  },

  // Se dispara cuando el usuario guarda un Csv
  onCsvUpload(csvData) {
    this.csvsData.push(csvData);

    const readCsvBlockDropdownOptions = this.csvsData.map((csvData) => [
      csvData.filename,
      `${csvData.id}`,
    ]);

    Blockly.Blocks["read_csv"].generateOptions = function () {
      return readCsvBlockDropdownOptions;
    };

    this.refreshWorkspace();
  },

  onRefreshFlyout() {
    if (this.variables.length === 0) {
      return [
        {
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
      ];
    } else {
      return [
        {
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
        {
          kind: "block",
          type: "variables_get",
        },
        {
          kind: "block",
          type: "variables_set",
        },
        {
          kind: "block",
          type: "property",
        },
      ];
    }
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

      if (this.variables.length === 1) {
        // Actualizar la flyout en el workspace*/
        const flyout = Blockly.getMainWorkspace().getFlyout();
        flyout.hide();
        flyout.show(toolbox);
      }

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
