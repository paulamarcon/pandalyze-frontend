import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initInfoBlock = () => {
  Blockly.Blocks["info"] = {
    init: function () {
      this.appendDummyInput().appendField("info()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(30);
      this.setTooltip("Obtiene información del DataFrame.");
    },
  };

  pythonGenerator["info"] = function (block) {
    var infoCode = "info()";
    return [infoCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
