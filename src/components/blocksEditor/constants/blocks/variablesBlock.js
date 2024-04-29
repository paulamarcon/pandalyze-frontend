import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initVariablesBlocks = () => {
  Blockly.Blocks["variables_get"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("get")
        .appendField(
          new Blockly.FieldDropdown(this.generateOptions),
          "variableGetterKey"
        );
      this.setColour(280);
      this.setOutput(true, null); // Permite que este bloque pueda ser conectado a otro bloque
    },

    generateOptions: function () {
      return [[]];
    },
  };

  Blockly.Blocks["variables_set"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("set")
        .appendField(
          new Blockly.FieldDropdown(this.generateOptions),
          "variableSetterKey"
        )
        .appendField("to");
      this.setColour(280);
      this.appendValueInput("VALUE").setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    },

    generateOptions: function () {
      return [[]];
    },
  };

  pythonGenerator.forBlock["variables_get"] = function (block, generator) {
    var variableName = block.getField("variableGetterKey").getText();
    return [variableName, pythonGenerator.ORDER_ATOMIC];
  };

  pythonGenerator.forBlock["variables_set"] = function (block, generator) {
    var variableName = block.getField("variableSetterKey").getText();
    var value =
      generator.valueToCode(block, "VALUE", pythonGenerator.ORDER_NONE) ||
      "None";
    return variableName + " = " + value;
  };
};
