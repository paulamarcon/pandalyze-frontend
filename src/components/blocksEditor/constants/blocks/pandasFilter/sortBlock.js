import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initSortBlock = () => {
  Blockly.Blocks["sort"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("leftValue").setCheck(null);
      this.appendDummyInput().appendField(".sort_values(columna = [");
      this.appendValueInput("rightValue").setCheck(null);
      this.appendDummyInput().appendField("])");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#5D4839");
    },
  };

  pythonGenerator["sort"] = function (block) {
    var leftValue = pythonGenerator.valueToCode(
      block,
      "leftValue",
      pythonGenerator.ORDER_NONE
    );
    var rightValue = pythonGenerator.valueToCode(
      block,
      "rightValue",
      pythonGenerator.ORDER_NONE
    );
    var sortCode = `${leftValue}.sort_values(by=[${rightValue}])`;

    return [sortCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
