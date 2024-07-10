import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initIndexBlock = () => {
  Blockly.Blocks["index"] = {
    init: function () {
      this.appendValueInput("argument").setCheck(null);
      this.appendDummyInput().appendField(".index");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#CD853F");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["index"] = function (block) {
    var argument = pythonGenerator.valueToCode(
      block,
      "argument",
      pythonGenerator.ORDER_NONE
    );
    var lineCode = `${argument}.index`;

    return [lineCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
