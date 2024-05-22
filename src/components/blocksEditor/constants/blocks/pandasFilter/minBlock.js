import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMinBlock = () => {
  Blockly.Blocks["min"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".min()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#5D4839");
      this.setTooltip("Obtiene el valor mínimo de una columna del DataFrame.");
    },
  };

  pythonGenerator["min"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var minCode = `${blockInput}.min()`;

    return [minCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
