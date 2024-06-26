import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initColumnBlock = () => {
  Blockly.Blocks["column"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".columns");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(10);
      this.setHelpUrl("");
    },
  };

  pythonGenerator["column"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var columnCode = `${blockInput}.columns`;

    return [columnCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
