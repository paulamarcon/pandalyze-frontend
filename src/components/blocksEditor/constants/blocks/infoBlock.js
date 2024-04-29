import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initInfoBlock = () => {
  Blockly.Blocks["info"] = {
    init: function () {
      this.appendValueInput("VALUE") // Agrega la entrada de valor interna
        .setCheck(null); // Permite cualquier tipo de bloque
      this.appendDummyInput().appendField(".info()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(30);
      this.setTooltip("Obtiene información del DataFrame.");
    },
  };

  pythonGenerator["info"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var infoCode = `${blockInput}.info()`;
    return [infoCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
