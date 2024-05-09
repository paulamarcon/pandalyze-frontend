import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initDescribeBlock = () => {
  Blockly.Blocks["describe"] = {
    init: function () {
      this.appendValueInput("VALUE").setCheck(null);
      this.appendDummyInput().appendField(".describe()");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour("#2E2B2B");
      this.setTooltip(
        "Muestra estadísticas descriptivas de las columnas numéricas de un DataFrame."
      );
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
