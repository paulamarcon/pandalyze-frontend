import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initHeadBlock = () => {
  Blockly.Blocks["head"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".head(");
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("", this.validateInput), // Default value es ""
        "argument"
      );
      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(10);
      this.setHelpUrl("");
    },

    validateInput: function (newValue) {
      // Acepta el valor si es un número natural mayor que 0
      if (/^\d+$/.test(newValue) && parseInt(newValue) > 0) {
        return newValue;
      } else {
        return "";
      }
    },
  };

  pythonGenerator["head"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var argumentInput = block.getFieldValue("argument");
    var headCode = `${blockInput}.head(${argumentInput})`;

    return [headCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
