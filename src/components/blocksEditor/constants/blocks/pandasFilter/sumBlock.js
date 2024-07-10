import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initSumBlock = () => {
  Blockly.Blocks["sum"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".sum()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#800000");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["sum"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var sumCode = `${blockInput}.sum()`;

    return [sumCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
