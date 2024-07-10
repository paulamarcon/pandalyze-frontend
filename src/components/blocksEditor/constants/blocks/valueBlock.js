import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initValuesBlock = () => {
  Blockly.Blocks["values"] = {
    init: function () {
      this.appendValueInput("argument").setCheck(null);
      this.appendDummyInput().appendField(".values");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#CD853F");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["values"] = function (block) {
    var argument = pythonGenerator.valueToCode(
      block,
      "argument",
      pythonGenerator.ORDER_NONE
    );
    var lineCode = `${argument}.values`;

    return [lineCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
