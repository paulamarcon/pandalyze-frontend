import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMaxBlock = () => {
  Blockly.Blocks["max"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".max()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(470);
      this.setTooltip("Obtiene el valor máximo de una columna del DataFrame.");
    },
  };

  pythonGenerator["max"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var maxCode = `${blockInput}.max()`;

    return [maxCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
