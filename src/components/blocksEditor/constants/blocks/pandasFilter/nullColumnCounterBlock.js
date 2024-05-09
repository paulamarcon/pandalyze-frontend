import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initNullSumBlock = () => {
  Blockly.Blocks["nullSum"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".isnull().sum()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#37CB9E");
      this.setTooltip(
        "Muestra la cantidad de elementos nulos que tiene cada columna de un DataFrame."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["nullSum"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var nullSumCode = `${blockInput}.isnull().sum()`;

    return [nullSumCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
