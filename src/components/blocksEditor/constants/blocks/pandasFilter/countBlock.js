import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initCountBlock = () => {
  Blockly.Blocks["count"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".count()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#800000");
    },
  };

  pythonGenerator["count"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var countCode = `${blockInput}.count()`;

    return [countCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
