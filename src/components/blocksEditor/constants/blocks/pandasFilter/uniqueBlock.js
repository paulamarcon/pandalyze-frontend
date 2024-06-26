import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initUniqueBlock = () => {
  Blockly.Blocks["unique"] = {
    init: function () {
      this.appendDummyInput().appendField("columna =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".unique()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(10);
      this.setHelpUrl("");
    },
  };

  pythonGenerator["unique"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var uniqueCode = `${blockInput}.unique()`;

    return [uniqueCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
