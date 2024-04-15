import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMeanBlock = () => {
  Blockly.Blocks["mean"] = {
    init: function () {
      this.appendDummyInput().appendField("mean(");
      this.appendDummyInput()
        .appendField(
          new Blockly.FieldTextInput("", this.validateInput),
          "COLUMN_NAME"
        )
        .appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(0);
      this.setTooltip("Calcula promedios de filas o columnas del DataFrame.");
    },
  };

  pythonGenerator["mean"] = function (block) {
    var columnName = block.getFieldValue("COLUMN_NAME");
    var meanCode = columnName ? `mean(${columnName})` : "mean()";
    return [meanCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
