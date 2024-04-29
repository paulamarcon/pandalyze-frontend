import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPropertyBlock = () => {
  Blockly.Blocks["property"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".");
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("", this.validateInput), // Default value es ""
        "argument"
      );
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(280);
      this.setTooltip("Permite acceder a las propiedades de una variable.");
      this.setHelpUrl("");
    },
  };

  pythonGenerator["property"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var argumentInput = block.getFieldValue("argument");
    var propertyCode = `${blockInput}.${argumentInput}`;

    return [propertyCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
