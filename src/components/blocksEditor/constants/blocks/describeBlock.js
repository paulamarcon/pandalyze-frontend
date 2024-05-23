import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initDescribeBlock = () => {
  Blockly.Blocks["describe"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".describe()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(10);
      this.setHelpUrl("");
    },
  };

  pythonGenerator["describe"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var describeCode = `${blockInput}.describe()`;

    return [describeCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
