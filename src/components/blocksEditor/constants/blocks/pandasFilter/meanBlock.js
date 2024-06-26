import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMeanBlock = () => {
  Blockly.Blocks["mean"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".mean()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#800000");
    },
  };

  pythonGenerator["mean"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var meanCode = `${blockInput}.mean()`;

    return [meanCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
