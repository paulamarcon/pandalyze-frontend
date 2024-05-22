import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initDataTypeBlock = () => {
  Blockly.Blocks["dtypes"] = {
    init: function () {
      this.appendDummyInput().appendField("data_frame =");
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".dtypes");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#D19C77");
      this.setTooltip(
        "Muestra el tipo de dato de cada columna de un DataFrame."
      );
      this.setHelpUrl("");
    },
  };

  pythonGenerator["dtypes"] = function (block) {
    var blockInput = pythonGenerator.valueToCode(
      block,
      "VALUE",
      pythonGenerator.ORDER_NONE
    );
    var dtypesCode = `${blockInput}.dtypes`;

    return [dtypesCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
