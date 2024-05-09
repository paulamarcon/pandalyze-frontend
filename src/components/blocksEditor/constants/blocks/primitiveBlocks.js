import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPrimitiveBlocks = () => {
  // Bloque para representar un número
  Blockly.Blocks["primitive_number"] = {
    init: function () {
      this.appendDummyInput().appendField(new Blockly.FieldNumber(0), "NUMBER");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Este bloque representa un número.");
      this.setHelpUrl("");
    },
  };

  // Bloque para representar un texto
  Blockly.Blocks["primitive_text"] = {
    init: function () {
      this.appendDummyInput()
        .appendField('"')
        .appendField(new Blockly.FieldTextInput(""), "TEXT")
        .appendField('"');
      this.setOutput(true, "String");
      this.setColour(160);
      this.setTooltip("Este bloque representa un texto.");
      this.setHelpUrl("");
    },
  };

  // Bloque para representar un booleano
  Blockly.Blocks["primitive_boolean"] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ["True", "TRUE"],
          ["False", "FALSE"],
        ]),
        "BOOLEAN"
      );
      this.setOutput(true, "Boolean");
      this.setColour(120);
      this.setTooltip("Este bloque representa un booleano.");
      this.setHelpUrl("");
    },
  };

  // Generador de código para el bloque "primitive_number"
  pythonGenerator.forBlock["primitive_number"] = function (block) {
    const numberValue = block.getFieldValue("NUMBER");
    return [numberValue, pythonGenerator.ORDER_ATOMIC];
  };

  // Generador de código para el bloque "primitive_text"
  pythonGenerator.forBlock["primitive_text"] = function (block) {
    const textValue = block.getFieldValue("TEXT");
    return ['"' + textValue + '"', pythonGenerator.ORDER_ATOMIC];
  };

  // Generador de código para el bloque "primitive_boolean"
  pythonGenerator.forBlock["primitive_boolean"] = function (block) {
    const booleanValue = block.getField("BOOLEAN").getText();
    return [booleanValue, pythonGenerator.ORDER_ATOMIC];
  };
};
