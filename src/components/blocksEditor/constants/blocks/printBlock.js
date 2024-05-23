import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initPrintBlock = () => {
  Blockly.Blocks["print_with_argument"] = {
    init: function () {
      this.appendDummyInput().appendField("print(");
      this.appendValueInput("ARGUMENT").setCheck(null); // Acepta cualquier tipo de bloque como argumento
      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setHelpUrl("");
    },
  };

  pythonGenerator.forBlock["print_with_argument"] = function (block) {
    var value_argument = pythonGenerator.valueToCode(
      block,
      "ARGUMENT",
      pythonGenerator.ORDER_NONE
    );
    // Generar código para la función print() con el argumento proporcionado
    var code = "print(" + value_argument + ")\n";
    return code;
  };
};
