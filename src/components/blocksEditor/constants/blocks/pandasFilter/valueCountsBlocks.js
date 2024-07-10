import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initValueCountsBlock = () => {
  Blockly.Blocks["valueCounts"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".value_counts()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#800000");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["valueCounts"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var valueCountsCode = `${blockInput}.value_counts()`;

    return [valueCountsCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
