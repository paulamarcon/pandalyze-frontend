import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initShapeBlock = () => {
  Blockly.Blocks["shape"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".shape");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#D19C77");
      this.setTooltip(
        "Muestra las dimensiones que tiene un DataFrame. Filas x Columnas."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["shape"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var shapeCode = `${blockInput}.shape`;

    return [shapeCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
